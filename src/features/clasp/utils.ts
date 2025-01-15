import { constants, mkdirSync, moveSync } from 'fs-extra';
import path from 'path';
import fs from 'fs-extra';
import { execSync } from 'child_process';

export function createClaspProject() {
  console.log('Creating clasp project...');
  mkdirSync('./src', { recursive: true });
  mkdirSync('./dist', { recursive: true });
  try {
    execSync('clasp create', { stdio: 'inherit' });
    editClaspJson();
    moveAppsscriptJson();
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

function editClaspJson() {
  console.log('Editing clasp.json...');
  const claspJsonPath = path.join(process.cwd(), '.clasp.json');
  const claspJson = fs.readFileSync(claspJsonPath, 'utf8');
  const claspData = JSON.parse(claspJson);
  claspData.rootDir = './dist';
  fs.writeFileSync(claspJsonPath, JSON.stringify(claspData, null, 2), 'utf8');
  console.log('clasp.json has been edited.');
}

function moveAppsscriptJson() {
  // const appsscriptJsonPath = path.join(process.cwd(), 'appsscript.json');
  // const destinationPath = path.join(process.cwd(), 'src', 'appsscript.json');
  // moveSync(appsscriptJsonPath, destinationPath);
  // console.log('appsscript.json has been moved.');
}
