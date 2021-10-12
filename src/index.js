import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { BrowserRouter as Router } from "react-router-dom";
import AppRouter from "./router";
import Navbar from "./components/layouts/Navbar";
import reportWebVitals from "./reportWebVitals";
import { AppContextWrapper } from "./appContext";
import { QueryClient, QueryClientProvider } from "react-query";
import ErrorBoundary from "./utils/ErrorBoundary";

const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: false, refetchOnWindowFocus: false } },
});

ReactDOM.render(
  <React.StrictMode>
    <ErrorBoundary>
      <Suspense fallback={<div style={{ marginTop: "5rem" }}>Loading...</div>}>
        <QueryClientProvider client={queryClient}>
          <AppContextWrapper>
            <Router>
              <Navbar ap="good" />
              <AppRouter />
            </Router>
          </AppContextWrapper>
        </QueryClientProvider>
      </Suspense>
    </ErrorBoundary>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
