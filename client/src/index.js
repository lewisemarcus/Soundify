import React from "react";
import "antd/dist/antd.min.css";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import client from "./ApolloClient";
import { ApolloProvider } from "@apollo/react-hooks";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/authContext";
import { SearchBarProvider } from "./context/searchBarContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <AuthProvider>
    <ApolloProvider client={client}>
      <BrowserRouter>
        <SearchBarProvider>
          <App />
        </SearchBarProvider>
      </BrowserRouter>
    </ApolloProvider>
  </AuthProvider>
);
