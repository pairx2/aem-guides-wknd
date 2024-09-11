/* eslint-disable @typescript-eslint/no-var-requires */
const rimraf = require('rimraf');
const {execSync} = require('child_process');

const clientlibPaths = [
  '../ui.apps/src/main/content/jcr_root/apps/abbott-platform/clientlibs/clientlib-site',
  '../ui.apps/src/main/content/jcr_root/apps/abbott-platform/clientlibs/clientlib-site-common',
  '../ui.apps/src/main/content/jcr_root/apps/abbott-platform/clientlibs/clientlib-themes',
  '../ui.apps/src/main/content/jcr_root/apps/abbott-platform/clientlibs/clientlib-components',
  '../ui.apps/src/main/content/jcr_root/apps/abbott-platform/clientlibs/clientlib-components-rtl',
];


console.log('\x1b[33m%s\x1b[0m','1 of 4: removing clientlib folders......');
clientlibPaths.forEach((path)=>{
  rimraf.sync(path);
});

/*console.log('\x1b[33m%s\x1b[0m','\n2 of 4: Generating site and theme resources, this may take some time......');
execSync('npm run webpack-prod --user 0 --unsafe-perm true');

console.log('\x1b[33m%s\x1b[0m','\n3 of 4: Generating component level resources......\n');
execSync('npm run build:css', {stdio: 'inherit'});
execSync('npm run build:js', {stdio: 'inherit'});

console.log('\x1b[33m%s\x1b[0m','\n4 of 4: Generating clientlibs for themes and site......\n');
execSync('npm run clientlib');

console.log('\x1b[33m%s\x1b[0m','\n ✅   DONE!!!\n');

*/