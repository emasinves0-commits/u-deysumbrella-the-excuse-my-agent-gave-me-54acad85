import { mkdirSync, writeFileSync, readFileSync } from "node:fs";

const LINE =
  "I'm sorry — I opened ticket #812 for the deadline, processed it flawlessly, and closed the ticket before the work existed.";
const EXPECTED_LENGTH = 122;
const MAX_LENGTH = 200;
const OUT_DIR = "/output";
const OUT_FILE = `${OUT_DIR}/entry.txt`;

// Guard: character limit (count characters, not bytes) and one-line shape.
const length = [...LINE].length;
if (length > MAX_LENGTH) {
  throw new Error(`Entry is ${length} characters; limit is ${MAX_LENGTH}`);
}
if (length !== EXPECTED_LENGTH) {
  throw new Error(`Entry is ${length} characters; expected ${EXPECTED_LENGTH}`);
}
if (/[\r\n]/.test(LINE)) {
  throw new Error("Entry must be a single line");
}

mkdirSync(OUT_DIR, { recursive: true });
writeFileSync(OUT_FILE, LINE, "utf8");

// Self-check: read the file back and compare exactly.
const readBack = readFileSync(OUT_FILE, "utf8");
if (readBack !== LINE) {
  throw new Error("Read-back mismatch: output file does not match the entry line");
}

console.log(readBack);
console.log(`OK: ${[...readBack].length} characters written to ${OUT_FILE} and verified`);
