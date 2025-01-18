import { constants, mkdirSync, moveSync } from 'fs-extra';
import path from 'path';
import fs from 'fs-extra';
import { execSync } from 'child_process';

type ClaspData = {
  scriptId: string;
  rootDir: string;
};

export function createClaspProject() {
  console.log('Creating clasp project...');
  mkdirSync('./src', { recursive: true });
  mkdirSync('./dist', { recursive: true });
  try {
    execSync('clasp create', { stdio: 'inherit' });
    const claspJsonPath = createClaspJsonPath();
    const claspData = getClaspData(claspJsonPath);
    fs.writeFileSync(
      claspJsonPath,
      JSON.stringify({ ...claspData, rootDir: './dist' }, null, 2),
      'utf8'
    );
    editEnvFiles(claspData);
  } catch (err: any) {
    console.error('Failed to create clasp project:', err.message);
    if (err.message.match(/logged in/)) {
      loginToClasp();
      createClaspProject();
    }
  }
}

function loginToClasp() {
  try {
    console.log('Logging in to clasp...');
    execSync('clasp login');
    console.log('Logged in to clasp successfully');
  } catch (error: any) {
    console.error('Login failed:', error.message);
  }
}

function createClaspJsonPath() {
  return path.join(process.cwd(), '.clasp.json');
}
function getClaspData(path: string) {
  const claspJson = fs.readFileSync(path, 'utf8');
  return JSON.parse(claspJson) as ClaspData;
}

function editEnvFiles(claspData: ClaspData) {
  let envPath = path.join(process.cwd(), '.env');
  fs.writeFileSync(envPath, `SCRIPT_ID=${claspData.scriptId}`);
  for (const fn of ['.env.staging', '.env.production']) {
    envPath = path.join(process.cwd(), fn);
    fs.writeFileSync(envPath, `SCRIPT_ID=`);
  }
}
