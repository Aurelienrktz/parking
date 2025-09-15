import React from 'react';
import ReactDOM  from 'react-dom/client';
import "./index.css"
import {App} from "./App.jsx";
const div=document.getElementById('root');
const reactRoot=ReactDOM.createRoot(div);

reactRoot.render(<App/>);