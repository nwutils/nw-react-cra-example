'use strict';
const url = require('node:url');

const baseUri = url.pathToFileURL(__dirname).toString();

const interfaceUri = process.env.NWJS_START_URL
  ? process.env.NWJS_START_URL.trim()
  : `${baseUri}/build/`;

const startUri = `${interfaceUri}/index.html`;

nw.Window.open(startUri);
