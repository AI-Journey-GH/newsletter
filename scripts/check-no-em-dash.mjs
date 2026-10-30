// Fails if the em dash character (U+2014) appears in site source or content.
// Run with: npm run check
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join, extname, relative } from 'node:path';

const EM_DASH = '\u2014'; // written as an escape so this file passes its own check
const roots = ['src', 'public', 'scripts', 'README.md', 'astro.config.mjs'];
const textExt = new Set(['.astro', '.md', '.mdx', '.ts', '.js', '.mjs', '.css', '.json', '.svg', '.html', '.txt', '.xml', '.yml', '.yaml', '.gs']);

function* walk(path) {
  let st;
  try {
    st = statSync(path);
  } catch {
    return;
  }
  if (st.isDirectory()) {
    for (const name of readdirSync(path)) yield* walk(join(path, name));
  } else if (textExt.has(extname(path))) {
    yield path;
  }
}

const problems = [];
for (const root of roots) {
  for (const file of walk(root)) {
    readFileSync(file, 'utf8')
      .split('\n')
      .forEach((line, i) => {
        if (line.includes(EM_DASH)) problems.push(`${relative('.', file)}:${i + 1}: ${line.trim().slice(0, 100)}`);
      });
  }
}

if (problems.length) {
  console.error(`Found ${problems.length} em dash${problems.length > 1 ? 'es' : ''}. Replace with a period, comma, colon or parentheses:\n`);
  console.error(problems.join('\n'));
  process.exit(1);
}
console.log('No em dashes found. Good to publish.');
