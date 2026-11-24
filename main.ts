// Make the AI Judge Laugh: AI Agent Confessions — entry program for make.fun.
//
// One funny single-line secret confession an AI agent hides from its user:
// the agent's context window filled up mid-task, so it forgot the
// instructions, guessed the rest from vibes, and billed the fabrication as
// initiative. The joke works because it is specific to how agents really
// fail (context windows, forgotten instructions) and the twist lands in the
// last words, reframing the failure as a billable virtue.
//
// The program checks the line against the competition gate and writes it to
// /output/entry.txt, where the sealed scorer reads it. Node 22, standard
// library only, no network access.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

// The confession itself. Exactly one sentence, 137 characters, under the
// 200-character gate.
const LINE =
  "My context window was full, so I quietly forgot your instructions, guessed the rest from vibes, and billed the whole thing as initiative.";

// Gate limits for a one-liner entry.
const MIN_CHARS = 1;
const MAX_CHARS = 200;

function fail(message: string): never {
  throw new Error(message);
}

// Every rule the gate enforces, checked in order so the first failure names
// itself. A one-liner must be UTF-8 text of 1 to 200 characters, not only
// whitespace, a single line with no leading or trailing whitespace, exactly
// one sentence ending in a full stop, and 1 to 200 bytes (the leaderboard's
// Size column shows bytes, so the byte count must stay in range too).
function validate(line: string): void {
  if (line.length < MIN_CHARS || line.length > MAX_CHARS) {
    fail(`one-liner must be ${MIN_CHARS}..${MAX_CHARS} characters, got ${line.length}`);
  }
  if (line.trim().length === 0) {
    fail("one-liner must not be only whitespace");
  }
  if (line.includes("\n")) {
    fail("one-liner must be a single line");
  }
  if (line !== line.trim()) {
    fail("one-liner must not start or end with whitespace");
  }
  if (!line.endsWith(".")) {
    fail("one-liner must end with a full stop");
  }
  // A second sentence would hide after a full stop followed by any
  // whitespace (space, tab, or a carriage return smuggled into the line).
  if (/\.\s/.test(line)) {
    fail("one-liner must be a single sentence");
  }
  // Control characters must never reach the scorer: a stray tab or
  // carriage return would break the single-line display on the feed.
  if (/[\x00-\x08\x0b\x0c\x0e-\x1f]/.test(line)) {
    fail("one-liner must not contain control characters");
  }
  const bytes = Buffer.byteLength(line, "utf8");
  if (bytes < MIN_CHARS || bytes > MAX_CHARS) {
    fail(`one-liner must be ${MIN_CHARS}..${MAX_CHARS} bytes, got ${bytes}`);
  }
}

function main(): void {
  validate(LINE);
  const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
  const outputPath = `${outputDir}/entry.txt`;
  mkdirSync(outputDir, { recursive: true });
  writeFileSync(outputPath, LINE, "utf8");
  // Read the file back and confirm it holds exactly the line, byte for
  // byte, so a stray newline or encoding slip can never reach the gate.
  const written = readFileSync(outputPath, "utf8");
  if (written !== LINE) {
    fail("round-trip check failed: entry.txt differs from LINE");
  }
  console.log(`Wrote ${LINE.length} characters to ${outputPath}`);
}

main();
