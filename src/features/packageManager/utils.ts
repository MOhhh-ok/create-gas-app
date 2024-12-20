import fs, { constants, writeFileSync } from 'fs-extra';
import { PackageManager } from './types';
import inquirer from 'inquirer';
import { execSync } from 'child_process';

const packages = ['@google/clasp', '@types/google-apps-script', 'typescript'];

export async function installPackages() {
    const packageManager = await askPackageManager();
    const packagesString = packages.join(' ');
    try {
        console.log('Installing packages...');
        let command = '';

        switch (packageManager) {
            case 'pnpm':
                command = `pnpm add -D ${packagesString}`;
                break;
            case 'yarn':
                command = `yarn add -D ${packagesString}`;
                break;
            case 'npm':
            default:
                command = `npm install -D ${packagesString}`;
                break;
        }
        // createPackageJson();
        execSync(command);
        console.log('Packages have been installed.');
    } catch (error: any) {
        console.error('Failed to install packages:', error.message);
    }
}

async function askPackageManager(): Promise<PackageManager> {
    const answers = await inquirer.prompt([
        {
            type: 'list',
            name: 'packageManager',
            message: 'Which package manager do you use?',
            choices: [
                { name: 'npm', value: 'npm' },
                { name: 'yarn', value: 'yarn' },
                { name: 'pnpm', value: 'pnpm' },
            ],
        },
    ]);
    return answers.packageManager;
}

function createPackageJson() {
    const filePath = 'package.json';
    if (!fs.existsSync(filePath)) {
        writeFileSync(filePath, JSON.stringify({}, null, 2), {
            encoding: 'utf-8',
            mode: 0o644, // 権限を明示的に設定
        });
        console.log('package.json has been created.');
    } else {
        console.log('package.json already exists. Skipping creation.');
    }
}
