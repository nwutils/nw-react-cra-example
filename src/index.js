import React from 'react';

import App from './App';
import './index.css';

const root = document.getElementById('root');

if (root !== null) {
  createRoot(root).render(<App />);
}
