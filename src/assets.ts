import { constants, copyFileSync, copySync, mkdirSync } from 'fs-extra';
import path from 'path/posix';

type AssetsDir = 'basic' | 'esbuild';

export function copyFiles(dir: AssetsDir = 'basic') {
  doCopy('common');
  doCopy(dir);
}

async function doCopy(dir: string) {
  const srcDir = path.join(__dirname, '..', 'assets', dir);
  const distDir = path.join(process.cwd());
  console.log('copy assets', dir);
  copySync(srcDir, distDir);
}
