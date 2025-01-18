#!/usr/bin/env node

import inquirer from 'inquirer';
import { copyFiles } from './assets';
import { createClaspProject, initExistingClaspProject } from './clasp';
import { initCwd } from './exec';
import { installPackages } from './packageManager/packageManager';
import { program } from 'commander';
import { options } from './options';

async function main() {
  await initCwd(options.dir);
  const res = await inquirer.prompt([
    {
      type: 'select',
      name: 'assets',
      message: 'Which do you use?',
      choices: [
        { name: 'basic', value: 'basic' },
        { name: 'esbuild bundle', value: 'esbuild' },
      ],
    },
  ]);
  copyFiles(res.assets);
  await installPackages();
  const newOrExistingRes = await inquirer.prompt([
    {
      type: 'select',
      name: 'newOrExisting',
      message: 'New or use existing clasp project?',
      choices: [
        { name: 'Create new', value: 'create' },
        { name: 'Use existing clasp project', value: 'use' },
      ],
    },
  ]);
  switch (newOrExistingRes.newOrExisting) {
    case 'create':
      await createClaspProject();
      break;
    case 'use':
      await initExistingClaspProject();
      break;
  }
  console.log('Done!');
}

main();
