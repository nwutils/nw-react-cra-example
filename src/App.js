import { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  const [cryptoString, setCryptoString ] = useState(null);
  useEffect(() => {
    function handleMessage (event) {
      if (event.data.type !== 'result') {
        console.log(`Invalid response: ${event.data}`);
        return;
      }
      setCryptoString(event.data.result);
    }
    window.addEventListener('message', handleMessage, { once: true });
    window.opener.postMessage({ type: 'cryptojs', inputString: 'testing' }, '*');
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <p>
          Encrypted Text: {cryptoString}
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
