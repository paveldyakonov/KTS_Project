import React from "react";

import Header from "@components/Header";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import styles from "./App.module.scss";
import ProductPage from "./pages/ProductPage";
import ProductsListPage from "./pages/ProductsListPage";

function App() {
  return (
    <BrowserRouter>
      <div className={styles.App}>
        <Header />
        <Routes>
          <Route path="/" element={<ProductsListPage />} />
          <Route path="/product">
            <Route path=":id" element={<ProductPage />} />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
