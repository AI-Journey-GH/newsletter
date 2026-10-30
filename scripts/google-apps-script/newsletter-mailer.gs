/**
 * AI Journey newsletter mailer (Google Apps Script)
 *
 * Lives inside the Google Sheet that collects subscribers from the Google Form.
 * Once a day it reads the website's feed (/rss.xml). When there is a new issue,
 * it emails it to every subscriber who has not received it yet, and writes each
 * send to a "Sent log" tab so nobody gets the same issue twice.
 *
 * Setup (one time): see "Weekly email" in the README. In short:
 *   1. Paste this file into the Sheet: Extensions > Apps Script.
 *   2. Set CONFIG.SITE_URL below to the live site address.
 *   3. Run setUpDailyTrigger once and allow the permissions.
 *   4. Optional: deploy as a web app and paste its URL into CONFIG.UNSUBSCRIBE_URL.
 *
 * Useful functions to run by hand from the editor:
 *   sendTestEmail     sends the latest issue to you only (nothing is logged)
 *   sendLatestIssue   sends the latest issue to everyone who has not had it yet
 */

const CONFIG = {
  // The live website, without a slash at the end, for example 'https://ai-journey.vercel.app'
  SITE_URL: 'https://YOUR-SITE.vercel.app',
  // Name shown as the sender
  FROM_NAME: 'AI Journey',
  // Optional: where replies go. Leave empty to use the Google account running the script.
  REPLY_TO: '',
  // Optional: the web app URL from Deploy > New deployment (see README). Leave empty until then.
  UNSUBSCRIBE_URL: '',
  // Hour of the day (0 to 23, in the script's time zone) for the daily check
  SEND_HOUR: 9,
};

const SENT_SHEET = 'Sent log';
const UNSUBSCRIBED_SHEET = 'Unsubscribed';
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/* ------------------------------------------------------------------ */
/* Main jobs                                                           */
/* ------------------------------------------------------------------ */

/** Emails the latest issue to every subscriber who has not received it. Runs daily. */
function sendLatestIssue() {
  checkConfig_();
  rememberSpreadsheet_();
  const issue = fetchLatestIssue_();
  if (!issue) {
    console.log('The feed has no issues yet.');
    return;
  }

  const unsubscribed = readColumnSet_(sheet_(UNSUBSCRIBED_SHEET, ['Email', 'Unsubscribed at']), 1);
  const alreadySent = readSentFor_(issue.id);
  const pending = getSubscribers_().filter((email) => !unsubscribed.has(email) && !alreadySent.has(email));

  if (pending.length === 0) {
    console.log(`Nothing to send: everyone already has "${issue.title}".`);
    return;
  }

  const quota = MailApp.getRemainingDailyQuota();
  const batch = pending.slice(0, quota);
  const log = sheet_(SENT_SHEET, ['Issue', 'Email', 'Sent at']);
  const rows = [];
  try {
    batch.forEach((email) => {
      sendIssueTo_(issue, email);
      rows.push([issue.id, email, new Date()]);
    });
  } finally {
    // Record whatever was sent, even if something failed halfway
    if (rows.length) log.getRange(log.getLastRow() + 1, 1, rows.length, 3).setValues(rows);
  }

  console.log(`Sent "${issue.title}" to ${rows.length} subscriber(s).`);
  if (pending.length > batch.length) {
    console.log(`Daily email limit reached. ${pending.length - batch.length} left for tomorrow's run.`);
  }
}

/** Sends the latest issue to you only, to check how it looks. Nothing is logged. */
function sendTestEmail() {
  checkConfig_();
  rememberSpreadsheet_();
  const issue = fetchLatestIssue_();
  if (!issue) throw new Error('The feed has no issues yet.');
  const me = Session.getEffectiveUser().getEmail();
  sendIssueTo_(issue, me);
  console.log(`Test email sent to ${me}.`);
}

/** Run once: checks for a new issue every day at CONFIG.SEND_HOUR. */
function setUpDailyTrigger() {
  checkConfig_();
  rememberSpreadsheet_();
  ScriptApp.getProjectTriggers()
    .filter((t) => t.getHandlerFunction() === 'sendLatestIssue')
    .forEach((t) => ScriptApp.deleteTrigger(t));
  ScriptApp.newTrigger('sendLatestIssue').timeBased().everyDays(1).atHour(CONFIG.SEND_HOUR).create();
  sheet_(SENT_SHEET, ['Issue', 'Email', 'Sent at']);
  sheet_(UNSUBSCRIBED_SHEET, ['Email', 'Unsubscribed at']);
  console.log(`Done. The script will check for new issues every day around ${CONFIG.SEND_HOUR}:00.`);
}

/** Unsubscribe page. Used when this script is deployed as a web app. */
function doGet(e) {
  const email = String((e && e.parameter.e) || '').trim().toLowerCase();
  const token = String((e && e.parameter.t) || '');
  let message;
  if (!EMAIL_PATTERN.test(email) || token !== unsubscribeToken_(email)) {
    message = 'This unsubscribe link is not valid. Reply to any of our emails and we will remove you by hand.';
  } else {
    const sheet = sheet_(UNSUBSCRIBED_SHEET, ['Email', 'Unsubscribed at']);
    if (!readColumnSet_(sheet, 1).has(email)) sheet.appendRow([email, new Date()]);
    message = `You are unsubscribed. ${escapeHtml_(email)} will not get any more AI Journey emails.`;
  }
  return HtmlService.createHtmlOutput(
    `<div style="font-family:Arial,Helvetica,sans-serif;max-width:480px;margin:15vh auto;padding:0 20px;color:#15202e;">
       <p style="font-family:Georgia,'Times New Roman',serif;font-size:28px;color:#0b1a2b;margin:0 0 12px;">AI Journey</p>
       <p style="font-size:17px;line-height:1.6;">${message}</p>
     </div>`,
  )
    .setTitle('AI Journey')
    .addMetaTag('viewport', 'width=device-width, initial-scale=1');
}

/* ------------------------------------------------------------------ */
/* Feed                                                                */
/* ------------------------------------------------------------------ */

/** Reads the newest issue from the site's feed. */
function fetchLatestIssue_() {
  const res = UrlFetchApp.fetch(`${CONFIG.SITE_URL}/rss.xml`, { muteHttpExceptions: true });
  if (res.getResponseCode() !== 200) {
    throw new Error(`Could not load ${CONFIG.SITE_URL}/rss.xml (HTTP ${res.getResponseCode()}). Is SITE_URL right?`);
  }
  const channel = XmlService.parse(res.getContentText()).getRootElement().getChild('channel');
  const item = channel.getChildren('item')[0];
  if (!item) return null;

  const contentNs = XmlService.getNamespace('content', 'http://purl.org/rss/1.0/modules/content/');
  // Use the path from the feed with our own SITE_URL, so links work even if the site's
  // address setting is missing on the host.
  const path = item.getChildText('link').replace(/^https?:\/\/[^/]+/, '');
  const fullTitle = item.getChildText('title');
  const match = fullTitle.match(/^Issue #(\d+):\s*(.*)$/);
  return {
    id: path,
    url: CONFIG.SITE_URL + path,
    fullTitle,
    number: match ? match[1] : '',
    title: match ? match[2] : fullTitle,
    subtitle: item.getChildText('description') || '',
    bulletsHtml: item.getChildText('encoded', contentNs) || '',
  };
}

/* ------------------------------------------------------------------ */
/* Email                                                               */
/* ------------------------------------------------------------------ */

function sendIssueTo_(issue, email) {
  const unsubscribe = unsubscribeLink_(email);
  const options = {
    to: email,
    subject: issue.fullTitle,
    name: CONFIG.FROM_NAME,
    htmlBody: emailHtml_(issue, unsubscribe),
    body: emailText_(issue, unsubscribe),
  };
  if (CONFIG.REPLY_TO) options.replyTo = CONFIG.REPLY_TO;
  MailApp.sendEmail(options);
}

function emailHtml_(issue, unsubscribe) {
  const sans = 'Arial,Helvetica,sans-serif';
  const serif = "Georgia,'Times New Roman',serif";
  const bullets = issue.bulletsHtml
    .replace(/<ul>/g, '<ul style="margin:12px 0 0;padding-left:20px;">')
    .replace(/<li>/g, `<li style="margin:0 0 10px;font-family:${sans};font-size:15px;line-height:1.55;color:#dce5ec;">`)
    .replace(/<strong>/g, '<strong style="color:#ffffff;">');

  return `
<div style="background:#f4f7fb;padding:24px 12px;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0"
         style="max-width:600px;margin:0 auto;background:#ffffff;border:1px solid #e4eaf1;border-radius:16px;overflow:hidden;">
    <tr>
      <td style="background:#0b1a2b;padding:20px 28px;">
        <div style="font-family:${serif};font-size:24px;color:#ffffff;">AI Journey</div>
        <div style="font-family:${sans};font-size:11px;letter-spacing:1.5px;text-transform:uppercase;color:#9fb1c3;margin-top:2px;">The weekly AI newsletter</div>
      </td>
    </tr>
    <tr>
      <td style="padding:32px 28px 8px;">
        ${issue.number ? `<div style="font-family:${sans};font-size:12px;font-weight:bold;letter-spacing:1.5px;text-transform:uppercase;color:#536a82;">Issue ${issue.number}</div>` : ''}
        <h1 style="font-family:${serif};font-weight:normal;font-size:32px;line-height:1.15;color:#0b1a2b;margin:8px 0 12px;">${escapeHtml_(issue.title)}</h1>
        <p style="font-family:${sans};font-size:16px;line-height:1.55;color:#536a82;margin:0;">${escapeHtml_(issue.subtitle)}</p>
      </td>
    </tr>
    ${
      bullets
        ? `<tr>
      <td style="padding:20px 28px 8px;">
        <div style="background:#102237;border-radius:14px;padding:22px 24px 12px;">
          <div style="font-family:${sans};font-size:11px;font-weight:bold;letter-spacing:1.5px;text-transform:uppercase;color:#7fcad6;">This week in 30 seconds</div>
          ${bullets}
        </div>
      </td>
    </tr>`
        : ''
    }
    <tr>
      <td align="center" style="padding:24px 28px 36px;">
        <a href="${issue.url}"
           style="display:inline-block;background:#0b1a2b;color:#ffffff;font-family:${sans};font-size:15px;font-weight:bold;text-decoration:none;padding:14px 28px;border-radius:999px;">Read this week’s issue</a>
      </td>
    </tr>
    <tr>
      <td style="padding:18px 28px;border-top:1px solid #e4eaf1;font-family:${sans};font-size:12px;line-height:1.6;color:#536a82;">
        You are getting this because you subscribed on the AI Journey website.
        <a href="${unsubscribe}" style="color:#536a82;">Unsubscribe</a>
      </td>
    </tr>
  </table>
</div>`;
}

function emailText_(issue, unsubscribe) {
  const bullets = issue.bulletsHtml
    .replace(/<\/li>/g, '\n')
    .replace(/<li>/g, '- ')
    .replace(/<[^>]+>/g, '')
    .trim();
  return [
    'AI Journey: the weekly AI newsletter',
    '',
    issue.fullTitle,
    issue.subtitle,
    '',
    bullets ? `This week in 30 seconds\n${bullets}\n` : '',
    `Read this week's issue: ${issue.url}`,
    '',
    `Unsubscribe: ${unsubscribe}`,
  ].join('\n');
}

/* ------------------------------------------------------------------ */
/* Subscribers and logs                                                */
/* ------------------------------------------------------------------ */

/** Every unique, valid email from the form responses tab. */
function getSubscribers_() {
  const sheet = responsesSheet_();
  const values = sheet.getDataRange().getValues();
  const col = values[0].findIndex((h) => /e-?mail/i.test(String(h)));
  const seen = new Set();
  values.slice(1).forEach((row) => {
    const email = String(row[col] || '').trim().toLowerCase();
    if (EMAIL_PATTERN.test(email)) seen.add(email);
  });
  return [...seen];
}

/** The tab where the Google Form writes its answers (the one with an "Email" column). */
function responsesSheet_() {
  const found = spreadsheet_()
    .getSheets()
    .filter((s) => ![SENT_SHEET, UNSUBSCRIBED_SHEET].includes(s.getName()))
    .find((s) => s.getLastColumn() > 0 && s.getRange(1, 1, 1, s.getLastColumn()).getValues()[0].some((h) => /e-?mail/i.test(String(h))));
  if (!found) throw new Error('No tab with an "Email" column. Is the form linked to this spreadsheet?');
  return found;
}

function readSentFor_(issueId) {
  const sheet = sheet_(SENT_SHEET, ['Issue', 'Email', 'Sent at']);
  const set = new Set();
  if (sheet.getLastRow() < 2) return set;
  sheet
    .getRange(2, 1, sheet.getLastRow() - 1, 2)
    .getValues()
    .forEach(([issue, email]) => {
      if (issue === issueId) set.add(String(email).toLowerCase());
    });
  return set;
}

function readColumnSet_(sheet, column) {
  const set = new Set();
  if (sheet.getLastRow() < 2) return set;
  sheet
    .getRange(2, column, sheet.getLastRow() - 1, 1)
    .getValues()
    .forEach(([v]) => set.add(String(v).trim().toLowerCase()));
  return set;
}

/** Gets a tab by name, creating it with a header row if needed. */
function sheet_(name, header) {
  const ss = spreadsheet_();
  let sheet = ss.getSheetByName(name);
  if (!sheet) {
    sheet = ss.insertSheet(name);
    sheet.appendRow(header);
    sheet.setFrozenRows(1);
  }
  return sheet;
}

/* ------------------------------------------------------------------ */
/* Helpers                                                             */
/* ------------------------------------------------------------------ */

function spreadsheet_() {
  const active = SpreadsheetApp.getActiveSpreadsheet();
  if (active) return active;
  const id = PropertiesService.getScriptProperties().getProperty('SPREADSHEET_ID');
  if (!id) throw new Error('Run setUpDailyTrigger once from the editor first.');
  return SpreadsheetApp.openById(id);
}

/** The unsubscribe web app runs without an "active" spreadsheet, so remember its id. */
function rememberSpreadsheet_() {
  const active = SpreadsheetApp.getActiveSpreadsheet();
  if (active) PropertiesService.getScriptProperties().setProperty('SPREADSHEET_ID', active.getId());
}

function unsubscribeLink_(email) {
  if (CONFIG.UNSUBSCRIBE_URL) {
    return `${CONFIG.UNSUBSCRIBE_URL}?e=${encodeURIComponent(email)}&t=${unsubscribeToken_(email)}`;
  }
  // Until the web app is set up: a reply with "Unsubscribe" in the subject, handled by hand
  const to = CONFIG.REPLY_TO || Session.getEffectiveUser().getEmail();
  return `mailto:${to}?subject=Unsubscribe`;
}

/** A signature so nobody can unsubscribe someone else by editing the link. */
function unsubscribeToken_(email) {
  const props = PropertiesService.getScriptProperties();
  let secret = props.getProperty('UNSUBSCRIBE_SECRET');
  if (!secret) {
    secret = Utilities.getUuid();
    props.setProperty('UNSUBSCRIBE_SECRET', secret);
  }
  const sig = Utilities.computeHmacSha256Signature(email, secret);
  return Utilities.base64EncodeWebSafe(sig).replace(/=+$/, '');
}

function escapeHtml_(s) {
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function checkConfig_() {
  if (!/^https:\/\/[^/]+[^/]$/.test(CONFIG.SITE_URL) || CONFIG.SITE_URL.includes('YOUR-SITE')) {
    throw new Error('Set CONFIG.SITE_URL at the top of the script to the live site address, for example https://ai-journey.vercel.app');
  }
}
