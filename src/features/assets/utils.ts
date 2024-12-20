import { constants, copyFileSync, mkdirSync } from 'fs-extra';
import path from 'path/posix';

const assets = ['package.json', 'tsconfig.json', 'src/main.ts'];
export function copyFiles() {
    console.log('Copying assets...');
    mkdirSync('src', { recursive: true });
    assets.forEach((asset) => {
        const source = path.join(__dirname, '../../../', 'assets', asset);
        const destination = path.join(process.cwd(), asset);
        copyFileSync(source, destination);
    });
}
