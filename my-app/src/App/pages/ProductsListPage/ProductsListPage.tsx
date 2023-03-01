import React from "react";

import ProductsList from "./components/ProductsList";
import SearchInput from "./components/SearchInput";
import styles from "./ProductsListPage.module.scss";

const ProductsListPage = () => {
  return (
    <div>
      <div className={styles.info_about_page}>
        <div className={styles.mini_header}>Products</div>
        <div className={styles.description_of_info}>
          We display products based on the latest products we have, if you want
          to see our old products please enter the name of the item
        </div>
      </div>
      <SearchInput />
      <ProductsList />
    </div>
  );
};

export default ProductsListPage;
