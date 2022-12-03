import React from "react";
import ReactDOM from "react-dom/client";
import '../dist/styles/tailwind.css'
import App from "./components/App.jsx"
import Login from './components/Login/Login.jsx'

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <React.StrictMode>
    {/* <Login /> */}
    <App />
  </React.StrictMode>
);