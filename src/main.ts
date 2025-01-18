#!/usr/bin/env node

import inquirer from 'inquirer';
import { copyFiles } from './features/assets/utils';
import { createClaspProject } from './features/clasp/utils';
import { initCwd } from './features/exec/utils';
import { installPackages } from './features/packageManager/utils';
import { program } from 'commander';
import { options } from './features/common/options';

async function main() {
  await initCwd(options.dir);
  const res = await inquirer.prompt([
    {
      type: 'select',
      name: 'assets',
      message: 'Which do you want to use?',
      choices: [
        { name: 'basic', value: 'basic' },
        { name: 'esbuild bundle', value: 'esbuild' },
      ],
    },
  ]);
  copyFiles(res.assets);
  await installPackages();
  createClaspProject();
  console.log('Done!');
}

main();
