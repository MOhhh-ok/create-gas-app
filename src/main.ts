#!/usr/bin/env node

import inquirer from 'inquirer';
import { copyFiles } from './features/assets/utils';
import { createClaspProject } from './features/clasp/utils';
import { initCwd } from './features/exec/utils';
import { installPackages } from './features/packageManager/utils';

async function main() {
  await initCwd();
  const res = await inquirer.prompt([
    {
      type: 'select',
      name: 'assets',
      message: 'Which do you want to use?',
      choices: [
        { name: 'basic', value: 'basic' },
        { name: 'vite bundle', value: 'vite' },
      ],
    },
  ]);
  copyFiles(res.assets);
  await installPackages();
  createClaspProject();
  console.log('Done!');
}

main();
