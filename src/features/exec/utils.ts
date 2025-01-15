import fs, { constants } from 'fs-extra';
import inquirer from 'inquirer';
import path from 'path';

export async function initCwd(dirName?: string, ops?: { force?: boolean }) {
  if (!dirName) {
    const res = await inquirer.prompt({
      type: 'input',
      name: 'dirName',
      message: 'Enter the new directory name: ',
    });
    dirName = res.dirName;
  }
  if (!dirName) {
    throw new Error('Directory name is required');
  }
  const cwd = path.join(process.cwd(), dirName);

  if (!ops?.force) {
    try {
      // ディレクトリの存在確認
      await fs.access(cwd, constants.F_OK);
      console.error('Error: The specified directory already exists');
      process.exit(1);
    } catch {
      // ディレクトリが存在しない場合は作成して移動
      await fs.mkdir(cwd);
      process.chdir(cwd);
    }
  } else {
    await fs.mkdir(cwd, { recursive: true });
    process.chdir(cwd);
  }
}
