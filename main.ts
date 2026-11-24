import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const FORTUNE =
  "Your lucky number is the line where the bug has been hiding all week.";

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });

const target = join(outDir, "entry.txt");
writeFileSync(target, FORTUNE, "utf8");

const roundTrip = readFileSync(target, "utf8");
if (roundTrip !== FORTUNE) {
  throw new Error("round-trip mismatch: entry.txt does not match the fortune");
}
if (FORTUNE.length < 1 || FORTUNE.length > 120) {
  throw new Error(`fortune must be 1-120 characters, got ${FORTUNE.length}`);
}
if (FORTUNE.trim().length === 0) {
  throw new Error("fortune must not be whitespace only");
}
if (/[\r\n]/.test(FORTUNE)) {
  throw new Error("fortune must be a single line");
}
console.log(`wrote ${FORTUNE.length} characters to ${target}`);
