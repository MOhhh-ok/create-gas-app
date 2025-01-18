import { execSync } from 'child_process';
import { program } from 'commander';
import dotenv from 'dotenv';
import fs from 'fs-extra';
import path from 'path';

const availabelEnvs = ['dev', 'stag', 'prod'];
const srcDir = 'src';
const distDir = 'dist';

program
  .option('--change <env>', 'change env')
  .option('--build', 'build')
  .option('--bundle', 'bundle')
  .option('--push', 'push')
  .parse();

async function main() {
  if (program.opts().change) {
    await changeEnv(program.opts().change);
  }

  if (program.opts().build) {
    await build();
  }

  if (program.opts().bundle) {
    await bundle();
  }

  if (program.opts().push) {
    await push();
  }
}

main().catch((err: any) => {
  console.error(err.message);
  process.exit(1);
});

////////////////////////////////////////////////////////////

async function changeEnv(env: (typeof availabelEnvs)[number] = 'dev') {
  const envSuffixes: Record<(typeof availabelEnvs)[number], string> = {
    dev: '',
    stag: '.staging',
    prod: '.production',
  };

  if (!availabelEnvs.includes(env)) {
    throw new Error(`Invalid environment: ${env}`);
  }
  const envPath = `.env${envSuffixes[env]}`;
  const claspJsonPath = '.clasp.json';

  if (!fs.existsSync(envPath)) {
    throw new Error(`${envPath} not found`);
  }

  dotenv.config({ path: envPath });
  const scriptId = process.env.SCRIPT_ID;
  if (!scriptId) {
    throw new Error(`SCRIPT_ID not found on ${envPath}`);
  }

  const data = {
    scriptId,
    rootDir: distDir,
  };

  fs.writeFileSync(claspJsonPath, JSON.stringify(data, null, 2));
  console.log(`env changed to ${env}`);
}

async function bundle() {
  const { GasPlugin } = require('esbuild-gas-plugin');

  require('esbuild')
    .build({
      entryPoints: [path.join(srcDir, 'index.ts')],
      bundle: true,
      outfile: path.join(distDir, 'bundle.js'),
      plugins: [GasPlugin],
    })
    .catch((e: any) => {
      throw new Error(e);
    });

  fs.copyFileSync('appsscript.json', path.join(distDir, 'appsscript.json'));
}

async function build() {
  execSync('tsc', { stdio: 'inherit' });
}

async function push() {
  execSync('clasp push', { stdio: 'inherit' });
}
