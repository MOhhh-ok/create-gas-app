import { program } from 'commander';

program.option('--dir <dir>', 'target directory name');
program.parse(process.argv);

interface Options {
  dir?: string;
}

export const options = program.opts() as Options;
