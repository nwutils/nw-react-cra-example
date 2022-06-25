# Build A Desktop Application Using NW.js and React

## Summary
This is a basic guide for building a desktop application using <a href="https://nwjs.io/">NW.js</a> and <a href="https://reactjs.org/">React</a>.
It should work in both Windows and Linux and most of it will possibly also work in macOS. This is not meant to be an end-to-end build solution, but more
as a guide to getting started with using NW.js together with React.

## Requirements
The following is expected to already be installed/configured before starting this guide.
- <a target="_blank" href="https://nodejs.org/">Node.js</a> - The latest Long-Term Support (LTS) release of Node.js should be installed and in your <span class="code">PATH</span>.
- <a target="_blank" href="https://code.visualstudio.com/">Visual Studio Code</a> - A decent JavaScript editor/IDE should be installed. Some steps in this guide may assume Visual Studio Code is being used but other options are available.

## Let's Goooo...
1. Open a terminal, navigate to a directory where you have write permission, then run the following commands:

```sh
npx create-react-app nw-react
cd nw-react
npm i concurrently wait-on react-devtools
npm i --save-exact nw@0.65.1-sdk
```

2. Open the file `nw-react/package.json` and make the following changes:
- Rename `dependencies` to `devDependencies`.
- Add the following:
```json
"main": "main.js",
"homepage": ".",
"node-remote": [
  "http://localhost:3042",
  "file://*"
],
"eslintConfig": {
    "globals": {
      "nw": true
    }
},
"scripts": {
    "dev": "concurrently \"npm start\" \"wait-on http://localhost:3042 && set NWJS_START_URL=http://localhost:3042 && nw --enable-logging=stderr .\"",
    "dev:tools": "concurrently \"react-devtools\" \"set REACT_APP_DEVTOOLS=enabled && npm start\" \"wait-on http://localhost:3042 && set NWJS_START_URL=http://localhost:3042 && nw --enable-logging=stderr .\"",
    "dev:linux": "concurrently \"npm start\" \"wait-on http://localhost:3042 && export NWJS_START_URL=http://localhost:3042; nw --enable-logging=stderr --remote-debugging-port=3043 .\"",
    "dev:linuxtools": "concurrently \"react-devtools\" \"export REACT_APP_DEVTOOLS=enabled; npm start\" \"wait-on http://localhost:3042 && export NWJS_START_URL=http://localhost:3042; nw --enable-logging=stderr .\"",
}
```

3. Add the following to `nw-react\.env` (new file):
```
PORT=3042
BROWSER=none
```

4. Add the following to `nw-react\main.js` (new file):
```js
const url = require('node:url');

const baseUri = url.pathToFileURL(__dirname).toString();

const interfaceUri = process.env.NWJS_START_URL
  ? process.env.NWJS_START_URL.trim()
  : `${baseUri}/build`;

nw.Window.open(interfaceUri);
```

5. Add the following at the top of the `<head>` block in `nw-react\public\index.html`:
```html
<script>if ('%REACT_APP_DEVTOOLS%'.trim() === 'enabled') document.write('<script src="http:\/\/localhost:8097"><\/script>')</script>
```

6. Add the following after the `import` statements at the top of `nw-react\src\index.js`:
```js
// Bring nw to React namespace
const nw = global.nw;
```

## Development
- At this point, you can run `npm run dev` (Windows) or `npm run dev:linux` (Linux). The React development "live" server will be started and NW.js will be launched, connecting to that "live" server. Any updates to your React application will automatically be reflected in the NW.js window.

- To access Chrome developer tools, right-click on the window that opens. Selecting "Inspect" will show DevTools for the current window. Selecting "Inspect background page" shows DevTools for the Node.js process running `main.js`.

- Running `npm run dev:tools` (Windows) or `npm run dev:linuxtools` (Linux) will behave the same as above, but will also start a standalone version of React DevTools which the React application will connect to.
