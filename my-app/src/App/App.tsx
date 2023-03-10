import React from "react";

import Header from "@components/Header";
import { useQueryParamsStoreInit } from "@store/RootStore/hooks/useQueryParamsStoreInit";
import { Routes, Route, Navigate } from "react-router-dom";

import styles from "./App.module.scss";
import CartPage from "./pages/CartPage";
import ProductPage from "./pages/ProductPage";
import ProductsListPage from "./pages/ProductsListPage";

const App = () => {
  useQueryParamsStoreInit();
  return (
    <div className={styles.App}>
      <Header />
      <Routes>
        <Route path="/" element={<ProductsListPage />} />
        <Route path="/product">
          <Route path=":id" element={<ProductPage />} />
        </Route>
        <Route path="/cart" element={<CartPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
};

export default App;
