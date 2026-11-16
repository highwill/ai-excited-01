import { copyFileSync, mkdirSync, statSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

// ai-excited-01: place the entry image where the grader reads it.
// The image is the entry; this program only copies it to /output/entry.png.
// The copy is byte-exact by construction, and the size check below proves the
// run wrote the whole image — both grade runs must write the same bytes.
const here = dirname(fileURLToPath(import.meta.url));
const outDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
const src = join(here, "entry.png");
const dst = join(outDir, "entry.png");
mkdirSync(outDir, { recursive: true });
copyFileSync(src, dst);
if (statSync(dst).size !== statSync(src).size) {
  throw new Error("entry.png copy is incomplete");
}
