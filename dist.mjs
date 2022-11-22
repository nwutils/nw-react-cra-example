import { copyFile, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { nwbuild } from 'nw-builder';

const packageManifest = JSON.parse(await readFile('./package.json'));
const appBaseDir = path.resolve('./dist/app/');

const defaultBuildCfg = {
  manifestProps: [
    'name',
    'version',
    'main',
  ],
  osTypes: [
    'windows',
    'linux',
  ],
  nwVersion: '0.70.1',
};

// Copy main.js to dist/app/ directory for packaging
// NOTE: The predist script should run webpack (or something similar) after `npm run build`, to bundle main.js and any Node.js dependencies into a single file.
// NOTE: If this isn't done, the following will need to be modified to copy all necessary files/dependencies to the dist/app/ directory.
console.log(`Copying Node-context script to ${appBaseDir}`);
try {
  await copyFile('main.js', path.resolve(appBaseDir, 'main.js'));
} catch (error) {
  console.error('Unable to copy Node-context script to app directory:', error);
}

// Create production package.json
console.log('Generating application manifest (package.json)...');
const manifestProps = packageManifest.build?.manifestProps || defaultBuildCfg.manifestProps;
const prodManifest = {};
for (const propName of manifestProps) {
  prodManifest[propName] = packageManifest[propName];
}
try {
  await writeFile(path.resolve(appBaseDir, 'package.json'), JSON.stringify(prodManifest, null, 4));
} catch (error) {
  console.error('Unable to generate application manifest:', error);
}

// Build package for each OS type
const appOsTypes = packageManifest.build?.osTypes || defaultBuildCfg.osTypes;
const appName = packageManifest.build?.appName || packageManifest.name;
const appVersion = packageManifest.version || '1.0.0';
for (const osType of appOsTypes) {
  console.log(`Building package for ${osType}...`);
  const platform = osType === 'windows' ? 'win' : osType;
  const nwVersion = packageManifest.devDependencies.nw.split('-')[0] || defaultBuildCfg.nwVersion;
  const outDir = path.resolve(`./dist/${appName}-${appVersion}-${osType}/`);
  const nwBuildArgs = {
    srcDir: appBaseDir,
    version: nwVersion,
    flavour: 'normal',
    platform: platform,
    arch: 'x64',
    outDir,
    run: false,
    zip: true
  };
  try {
    await nwbuild(nwBuildArgs);
  } catch (error) {
    console.error(`Error building package for ${osType}`);
  }
  console.log(`Finished building package for ${osType}`);
}
