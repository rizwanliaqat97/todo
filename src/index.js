import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { BrowserRouter as Router } from "react-router-dom";
import AppRouter from "./router";
import reportWebVitals from "./reportWebVitals";
import { AppContextWrapper } from "./appContext";
import ErrorBoundary from "./utils/ErrorBoundary";

ReactDOM.render(
  <React.StrictMode>
    <ErrorBoundary>
      <Suspense fallback={<div style={{ marginTop: "5rem" }}>Loading...</div>}>
        <AppContextWrapper>
          <Router>
            <AppRouter />
          </Router>
        </AppContextWrapper>
      </Suspense>
    </ErrorBoundary>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
