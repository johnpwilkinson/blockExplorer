import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import Container from "react-bootstrap/Container";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Account from "./Components/Account";
import {
  AlchemyContext,
  EnsContext,
} from "../src/Components/Alc";
import { Alchemy, Network } from "alchemy-sdk";
import Txn from "./Components/Txn";
import Block from "./Components/Block";
import { resolveENS } from "./utils/helpers";
import BlockTxns from "./Components/BlockTxns";
import MasterBar from "./Components/MasterBar";
import MasterHeader from "./Components/MasterHeader";

const settings = {
  apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
  network: Network.ETH_MAINNET,
};

const alchemy = new Alchemy(settings);

ReactDOM.render(
  <React.StrictMode>
    <EnsContext.Provider value={resolveENS}>
      <AlchemyContext.Provider value={alchemy}>
        <Container fluid>
          <MasterBar />
          <MasterHeader />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<App />} />
              <Route path="/address/:addy" element={<Account />} />
              <Route path="/txn/:txn" element={<Txn />} />
              <Route path="/block/:block/" element={<Block />} />
              <Route path="/block/:block/txns/" element={<BlockTxns />} />
            </Routes>
          </BrowserRouter>
        </Container>
      </AlchemyContext.Provider>
    </EnsContext.Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
