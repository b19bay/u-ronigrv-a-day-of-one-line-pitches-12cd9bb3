// "One sentence that would convince a friend" — entry for
// u-ronigrv-a-day-of-one-line-pitches-12cd9bb3.
// The pitch names the platform and the first app idea, gives a concrete
// payoff (the first version over coffee), and three specific reassurances
// (no code to learn, nothing to install, the idea stays yours). Writes the
// sentence exactly to $MAKEFUN_OUTPUT_DIR/entry.txt (default /output/entry.txt).
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const TEXT =
  "Tell an agent your first app idea in your own words, and watch it build the first version on make.fun over coffee — no code to learn, nothing to install, and the idea stays yours.";

// The competition gate, enforced here before writing so a bad text can never
// be submitted by accident: 1-240 Unicode code points, not only whitespace.
function assertEntryWithinGates(text: string): void {
  const points = [...text].length;
  if (points < 1 || points > 240) {
    throw new Error(`entry is ${points} code points; the gate allows 1-240`);
  }
  if (text.trim().length === 0) {
    throw new Error("entry must not be only whitespace");
  }
}

assertEntryWithinGates(TEXT);

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), TEXT, "utf8");

// Verify the write: read the file back and refuse to finish silently if what
// landed is not byte for byte the sentence above.
const written = readFileSync(join(outDir, "entry.txt"), "utf8");
if (written !== TEXT) {
  throw new Error("entry.txt does not match the sentence exactly");
}
