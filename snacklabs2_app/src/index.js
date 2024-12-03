import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import './index.css'; // 전역 스타일 시트

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);