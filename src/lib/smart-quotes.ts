/** Turn straight quotes into typographic quotes: "a" -> “a”, it's -> it’s. */
export function smart(s: string): string {
  return s
    .replace(/(^|[\s([{])"/g, '$1“')
    .replace(/"/g, '”')
    .replace(/(^|[\s([{])'/g, '$1‘')
    .replace(/'/g, '’');
}
