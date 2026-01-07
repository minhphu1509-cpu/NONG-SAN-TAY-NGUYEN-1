
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

/**
 * World-Class Entry Point
 * Đảm bảo ứng dụng khởi tạo mượt mà và xử lý lỗi mount point.
 */
const rootElement = document.getElementById('root');

if (!rootElement) {
  const errorMsg = "Fatal Error: Could not find 'root' element to mount the React application.";
  console.error(errorMsg);
  document.body.innerHTML = `<div style="padding: 2rem; color: #7f1d1d; background: #fef2f2; font-family: sans-serif;">${errorMsg}</div>`;
  throw new Error(errorMsg);
}

try {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
} catch (error) {
  console.error("React Mounting Failed:", error);
}
