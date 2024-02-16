import './App.css';

import ReactIcon from "./react.png";
import NwIcon from "./nwjs.png";

function useNW() {
  if (typeof window.nw !== "undefined") {
    return window.nw;
  } else {
    return undefined;
  }
}

function App() {

  const nw = useNW();

  return (
    <div className='app'>

      <div className='icons'>
        <img height={150} src={ReactIcon} />
        <img height={150} src={NwIcon} />
      </div>

      <br />

      <span className='title'>
        NW.js React Example
      </span>

      <br />

      <span className='content'>
        You are running NW.js ({nw?.process?.versions['nw']}), Node ({nw?.process?.versions['node']}), Chromium ({nw?.process?.versions['chromium']}) and React 18
      </span>

    </div>
  );
}

export default App;
