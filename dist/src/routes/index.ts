import fs from 'fs';
import { join } from 'path';

export async function get() {

  // Update post catalog
  const cwd = process.cwd();

  console.log("Indexing post files...");
  const out = join(cwd, '/static/postCatalog.json');
  const postsDir = join(cwd, '/static/posts/');
  const dirContents = fs.readdirSync(postsDir);
  const catalog: Record<string, string[]> = {};
  for(const path of dirContents) {
    let category = '';
    let files = [path];
    const subDir = join(postsDir, path);
    if(fs.statSync(subDir).isDirectory()) {
      category = path;
      files = fs.readdirSync(subDir).filter(filename => !fs.statSync(join(subDir, filename)).isDirectory());
    }
    files = files.filter(filename => filename.slice(-3) === ".md").map(filename => filename.slice(0, -3));
    if(files.length > 0) {
      if(!catalog[category]) {
        catalog[category] = [];
      }
      catalog[category].push(...files);
    }
  }
  console.log("Done Indexing!");

  console.log("Writing to catalog...");
  fs.writeFileSync(out, JSON.stringify(catalog));
  console.log(`Wrote to: ${out}`);
 
  return {
    status: 200
  };
}