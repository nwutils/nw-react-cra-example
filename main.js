'use strict';
const url = require('node:url');
const CryptoJS = require("crypto-js");

// Build application URIs
const baseUri = url.pathToFileURL(__dirname).toString();
const interfaceUri = process.env.NWJS_START_URL
  ? process.env.NWJS_START_URL.trim()
  : `${baseUri}/build/`;
const startUri = `${interfaceUri}/index.html`;

// Listen for messages
function handleMessage (event) {
  const messageData = (typeof event.data === 'object') ? event.data : {};
  if (!messageData.type) return;
  switch (messageData.type) {
    case 'cryptojs': {
      const encryptedMFASecretHex = CryptoJS.AES.encrypt(
        messageData.inputString,
        'abcd1234567890'
      ).toString();
      console.log(`cryptojs result from the string "${messageData.inputString}": ${encryptedMFASecretHex}`);
      event.source.postMessage({ type: 'result', result: encryptedMFASecretHex }, '*');
      break;
    }
    default:
      console.log(`Unknown event type: ${messageData.type}`);
  }
}
window.addEventListener('message', handleMessage, false);

// Open main window
nw.Window.open(startUri);
