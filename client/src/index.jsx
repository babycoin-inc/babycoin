import React from "react";
import ReactDOM from "react-dom/client";
import '../dist/styles/tailwind.css'
import Page from './components/Page.jsx'

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <React.StrictMode>
    <Page />
  </React.StrictMode>
);