import React, { useEffect } from "react";

import Card from "@components/Card";
import ProductsListStore from "@store/ProductsListStore";
import { useLocalStore } from "@utils/useLocalStore";
import { observer } from "mobx-react-lite";
import InfiniteScroll from "react-infinite-scroll-component";
import { useNavigate } from "react-router-dom";

import styles from "./ProductsList.module.scss";

const ProductsList: React.FC = () => {
  const navigate = useNavigate();

  const productsListStore = useLocalStore(() => new ProductsListStore());

  useEffect(() => {
    productsListStore.getProductsList("reset");
  }, [productsListStore]);

  const clickEventHandler = (event: React.MouseEvent) => {
    navigate(`/product/${event.currentTarget.id}`);
  };

  return (
    <div>
      <div className={styles["label-and-products-length"]}>
        <div className={styles["label-and-products-length__label"]}>
          Total Product
        </div>
        <div className={styles["label-and-products-length__products-length"]}>
          {productsListStore.cardsList.length}
        </div>
      </div>
      <div>
        <InfiniteScroll
          dataLength={productsListStore.cardsList.length}
          next={productsListStore.getProductsListMore}
          hasMore={productsListStore.hasMore}
          loader={<p>Loading...</p>}
          endMessage={<p>That's all products</p>}
          className={styles["products-list"]}
        >
          {productsListStore.cardsList.map((card: any) => (
            <Card
              key={card.id}
              image={card.image}
              category={card.category}
              title={card.title}
              subtitle={card.description}
              content={card.price}
              onClick={clickEventHandler}
              id={card.id}
            />
          ))}
        </InfiniteScroll>
      </div>
    </div>
  );
};

export default React.memo(observer(ProductsList));
