#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import { exit } from 'process';
import { createInterface } from 'readline';
import { fileURLToPath } from 'url';

const readline = createInterface({
  input: process.stdin,
  output: process.stdout
});

function mkdir(dir) {
  try {
    fs.mkdirSync(dir, { recursive: true });
  } catch (e) {
    if (e.code === 'EEXIST') return;
    throw e;
  }
}

function copyRec(from, to, replacements) {
  if(fs.statSync(from).isDirectory()) {
    for(const file of fs.readdirSync(from)) {
      copyRec(path.join(from, file), path.join(to, file), replacements);
    }
  } else {
    const dirname = path.dirname(to);
    const filename = path.basename(to);
    mkdir(dirname);
    if(replacements && replacements.has(filename)) {
      const rules = replacements.get(filename);
      let data = fs.readFileSync(from, {encoding: 'utf-8'});
      for(const rule of rules) {
        data = data.replace(rule.regex, rule.value);
      }
      fs.writeFileSync(to, data, { encoding: 'utf-8' });
    } else {
      fs.copyFileSync(from, to);
    }
  }
}

function dist() {
	return fileURLToPath(new URL(`./dist`, import.meta.url).href);
}

readline.question(`What is the title of your blog? `, title => {

  const cwd = process.argv[2] || '.';

  if(fs.existsSync(cwd) && fs.readdirSync(cwd).length > 0) {
    console.log("Target directory is not empty. Please try again with an empty directory.");
    exit(1);
  }

  console.log(`Copying project files to: ${cwd}`);

  // Make working dir
  mkdir(cwd);

  // Copy files from dist and replace placeholder values
  copyRec(dist(), cwd, new Map([
    ["config.ts", [{ regex: /\%blogName\%/, value: title || "Dev Blog" }]]
  ]));

  console.log("Done!\n\nNext steps:\n\n1) run `npm install` in the project directory\n2) start the development server with `npm start`");

  readline.close();
});