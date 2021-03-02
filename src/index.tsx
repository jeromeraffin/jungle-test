import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import Store from "./core/store/Store";
import { GlobalStyle, WuiProvider } from "@welcome-ui/core";
import theme from "./styles/theme";

ReactDOM.render(
  <React.StrictMode>
    <Store>
      <WuiProvider theme={theme} useReset>
        <GlobalStyle />
        <App />
      </WuiProvider>
    </Store>
  </React.StrictMode>,
  document.getElementById("root")
);
