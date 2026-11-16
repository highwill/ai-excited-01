// The Koi That Jumped the Sky — ai-excited-01 entry.
//
// The image lives beside this file as entry.png (JPEG bytes in a .png
// name; the judge tells the format from its first bytes). This program
// copies it to the output directory unchanged, then proves the copy
// is byte-for-byte the same by comparing sizes.

import { copyFile, mkdir, stat } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const source = join(dirname(fileURLToPath(import.meta.url)), "entry.png");
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const target = join(outDir, "entry.png");

// The output directory may not exist yet inside the grading sandbox,
// so create it before copying anything into it.
await mkdir(outDir, { recursive: true });
await copyFile(source, target);

const [srcStat, dstStat] = await Promise.all([stat(source), stat(target)]);
if (srcStat.size !== dstStat.size) {
  throw new Error(
    `copied entry.png is ${dstStat.size} bytes, expected ${srcStat.size}`,
  );
}
console.log(`wrote ${target} (${dstStat.size} bytes)`);
