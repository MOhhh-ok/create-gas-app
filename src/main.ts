#!/usr/bin/env node

import { copyFiles } from './features/assets/utils';
import { createClaspProject } from './features/clasp/utils';
import { initCwd } from './features/exec/utils';
import { installPackages } from './features/packageManager/utils';

async function main() {
    // await initCwd('1', { force: true });
    await initCwd();
    copyFiles();
    await installPackages();
    createClaspProject();
    console.log('Done!');
}

main();
