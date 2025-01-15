import { constants, copyFileSync, copySync, mkdirSync } from 'fs-extra';
import path from 'path/posix';

type AssetsDir = 'basic' | 'vite';

export function copyFiles(dir: AssetsDir = 'basic') {
  console.log('Copying assets...');

  const srcDir = path.join(__dirname, '..', '..', '..', 'assets', dir);
  const distDir = path.join(process.cwd());
  console.log('copying', { srcDir, distDir });
  copySync(srcDir, distDir);
}
