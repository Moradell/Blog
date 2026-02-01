import fs from "node:fs";
import path from "node:path";

const CONTENT_DIR = path.resolve("content/posts");
const STATIC_DIR = path.resolve("static/content");

if (!fs.existsSync(CONTENT_DIR)) {
  console.log("No content/posts directory found, skipping image copy.");
  process.exit(0);
}

if (fs.existsSync(STATIC_DIR)) {
  fs.rmSync(STATIC_DIR, { recursive: true });
}

const slugs = fs.readdirSync(CONTENT_DIR);

let count = 0;

for (const slug of slugs) {
  const postDir = path.join(CONTENT_DIR, slug);
  if (!fs.statSync(postDir).isDirectory()) continue;

  const files = fs.readdirSync(postDir).filter((f) => !f.endsWith(".md"));

  if (files.length === 0) continue;

  const outDir = path.join(STATIC_DIR, slug);
  fs.mkdirSync(outDir, { recursive: true });

  for (const file of files) {
    fs.copyFileSync(path.join(postDir, file), path.join(outDir, file));
    count++;
  }
}

console.log(`Copied ${count} asset(s) to static/content/`);
