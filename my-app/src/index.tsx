import React from "react";

import "./config/configureMobX";
import ReactDOM from "react-dom/client";
import "regenerator-runtime";
import * as Router from "react-router-dom";
import "./index.scss";

import App from "./App";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
    <Router.HashRouter>
      <App />
    </Router.HashRouter>
);

if (module.hot) {
  module.hot.accept();
}

