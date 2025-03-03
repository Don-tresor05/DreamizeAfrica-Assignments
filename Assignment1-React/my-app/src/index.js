import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Main from './Main';
import TaskList from './TaskList';
import App from './App';

import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Main />
    <TaskList />
   {/* <App /> */}
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
document.body.style.backgroundColor = "gray";
document.body.style.color = "white";
document.body.style.fontFamily = "Arial, sans-serif";
document.body.style.fontSize = "1.5rem";
document.body.style.padding = "20px";
document.body.style.margin = "0";
document.body.style.display = "flex";
document.body.style.justifyContent = "center";
document.body.style.alignItems = "center";
document.body.style.height = "100vh";
document.body.style.width = "100vw";
document.body.style.flexDirection = "column";
document.body.style.textAlign = "center";
document.body.style.lineHeight = "1.5";
document.body.style.overflow = "hidden";
document.body.style.textOverflow = "ellipsis";
document.body.style.whiteSpace = "nowrap";
document.body.style.overflowX = "hidden";
document.body.style.overflowY = "hidden";
document.body.style.overflowWrap = "break-word";
document.body.style.wordWrap = "break-word";
document.body.style.wordBreak = "break-word";
document.body.style.wordBreak = "break-all";
document.body.style.wordBreak = "keep-all";
document.body.style.wordBreak = "normal";
