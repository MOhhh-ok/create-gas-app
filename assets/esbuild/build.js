const { GasPlugin } = require('esbuild-gas-plugin');
const fs = require('fs-extra');

require('esbuild')
  .build({
    entryPoints: ['src/index.ts'],
    bundle: true,
    outfile: 'dist/bundle.js',
    plugins: [GasPlugin],
  })
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });

fs.copyFileSync('appsscript.json', 'dist/appsscript.json');
