import fs from "fs";
import { globby } from "globby"; // npm install globby

// Get all .md or .mdx files in the docs directory
const files = await globby(["docs/**/*.md", "docs/**/*.mdx"]);

const sourceRegex = /(<source\s+[^>]*src=")([^"]+)(")/g;

for (const file of files) {
  let content = fs.readFileSync(file, "utf8");
  let changed = false;

  content = content.replace(sourceRegex, (match, prefix, src, suffix) => {
    // Only process .mp4 files (optional, remove if you want all types)
    if (!src.endsWith(".mp4")) return match;

    // Replace ALL underscores with dashes in the whole path
    const newSrc = src.replace(/_/g, "-");
    if (newSrc !== src) {
      changed = true;
      return `${prefix}${newSrc}${suffix}`;
    }
    return match;
  });

  if (changed) {
    fs.writeFileSync(file, content, "utf8");
    console.log("Fixed:", file);
  }
}
