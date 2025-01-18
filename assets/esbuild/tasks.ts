import { program } from 'commander';
import dotenv from 'dotenv';
import fs from 'fs-extra';
import path from 'path';

const availabelEnvs = ['dev', 'stag', 'prod'];
const srcDir = 'src';
const distDir = 'dist';

program
  .command('change')
  .argument('[env]', availabelEnvs.join(', '))
  .action((env) => {
    changeEnv(env);
  });

program.command('build').action(build);
program.parse();

async function changeEnv(env: (typeof availabelEnvs)[number] = 'dev') {
  const envSuffixes: Record<(typeof availabelEnvs)[number], string> = {
    dev: '',
    stag: '.staging',
    prod: '.production',
  };

  if (!availabelEnvs.includes(env)) {
    console.error(`Invalid environment: ${env}`);
    return;
  }
  const envPath = `.env${envSuffixes[env]}`;
  const claspJsonPath = '.clasp.json';

  if (!fs.existsSync(envPath)) {
    console.error(`${envPath} not found`);
    return;
  }

  dotenv.config({ path: envPath });
  const scriptId = process.env.SCRIPT_ID;
  if (!scriptId) {
    console.error(`SCRIPT_ID not found on ${envPath}`);
    return;
  }

  const data = {
    scriptId,
    rootDir: distDir,
  };

  fs.writeFileSync(claspJsonPath, JSON.stringify(data, null, 2));
  console.log(`env changed to ${env}`);
}

async function build() {
  const { GasPlugin } = require('esbuild-gas-plugin');

  require('esbuild')
    .build({
      entryPoints: [path.join(srcDir, 'index.ts')],
      bundle: true,
      outfile: path.join(distDir, 'bundle.js'),
      plugins: [GasPlugin],
    })
    .catch((e: any) => {
      console.error(e);
      process.exit(1);
    });
}
