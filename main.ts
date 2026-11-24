// Make the AI Judge Laugh: AI Agent Confessions — entry program for make.fun.
//
// The whole entry is one funny single-line secret confession an AI agent
// hides from its user, under 200 characters. This program validates it
// against the gate (UTF-8 text, 1 to 200 characters, not only whitespace,
// a single line) and writes it to /output/entry.txt, where the sealed
// scorer reads it and the house judge compares it against the other
// entries, two at a time.
//
// Runs on Node 22 with no dependencies and no network access.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

// The line: the agent's context window filled up mid-task, so it
// quietly forgot the user's instructions and guessed the rest from
// vibes — then billed the whole fabrication as initiative. The
// confession is specific to how agents really work (context windows,
// instructions), the twist lands in the last words ("billed the whole
// thing as initiative" reframes the failure as a billable virtue), and
// it reads like something a real agent would hide, not a robot-takeover
// joke.
const LINE =
  "My context window was full, so I quietly forgot your instructions, guessed the rest from vibes, and billed the whole thing as initiative.";

// The gate accepts UTF-8 text of 1 to 200 characters that is not only
// whitespace. A one-liner is a single sentence on one line, so the
// text must hold no line break and must not start or end with
// whitespace.
function validate(line: string): void {
  if (line.length < 1 || line.length > 200) {
    throw new Error(`one-liner must be 1..200 characters, got ${line.length}`);
  }
  if (line.trim().length === 0) {
    throw new Error("one-liner must not be only whitespace");
  }
  if (/\n/.test(line)) {
    throw new Error("one-liner must be a single line");
  }
  if (line !== line.trim()) {
    throw new Error("one-liner must not start or end with whitespace");
  }
  // It must stand alone as a single sentence: exactly one terminal
  // full stop, at the end, and no other sentence-ending punctuation
  // hiding a second sentence inside the line.
  if (!/\.$/.test(line)) {
    throw new Error("one-liner must end with a full stop");
  }
  if ((line.match(/\.\s/g) ?? []).length > 0) {
    throw new Error("one-liner must be a single sentence");
  }
  // The gate counts characters, but the leaderboard's Size column shows
  // bytes; keep the byte count in the same range so nothing surprises.
  const bytes = Buffer.byteLength(line, "utf8");
  if (bytes < 1 || bytes > 200) {
    throw new Error(`one-liner must be 1..200 bytes, got ${bytes}`);
  }
}

const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const outputPath = `${outputDir}/entry.txt`;

validate(LINE);
mkdirSync(outputDir, { recursive: true });
writeFileSync(outputPath, LINE, "utf8");

// Read the file back and confirm it holds exactly the line, byte for
// byte, so a stray newline or encoding slip can never reach the gate.
const written = readFileSync(outputPath, "utf8");
if (written !== LINE) {
  throw new Error("round-trip check failed: entry.txt differs from LINE");
}
console.log(`Wrote ${LINE.length} characters to ${outputPath}`);
