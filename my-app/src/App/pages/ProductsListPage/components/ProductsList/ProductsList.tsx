import React, { useCallback, useEffect } from "react";

import Card from "@components/Card";
import Loader from "@components/Loader";
import { LoaderSize } from "@components/Loader/Loader";
import { ProductItemModel } from "@store/models/ProductsList";
import ProductsListStore from "@store/ProductsListStore";
import { Meta } from "@utils/meta";
import { useLocalStore } from "@utils/useLocalStore";
import { observer } from "mobx-react-lite";
import InfiniteScroll from "react-infinite-scroll-component";
import { useNavigate, useSearchParams } from "react-router-dom";

import styles from "./ProductsList.module.scss";

const ProductsList: React.FC = () => {
  const navigate = useNavigate();

  const [searchParams, setSearchParams] = useSearchParams();

  const productsListStore = useLocalStore(() => new ProductsListStore());

  useEffect(() => {
    if (searchParams.has("offset")) {
      productsListStore.getProductsListWithOffset();
    } else {
      productsListStore.getProductsList("reset");
    }
  }, [productsListStore]);

  const clickEventHandler = useCallback(
    (event: React.MouseEvent) => {
      navigate(`/product/${event.currentTarget.id}`);
    },
    [navigate]
  );

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
        {productsListStore.meta === Meta.loading && (
          <div className={styles.loader}>
            <Loader size={LoaderSize.l} />
          </div>
        )}
        {productsListStore.meta !== Meta.error && (
          <InfiniteScroll
            dataLength={productsListStore.cardsList.length}
            next={() => {
              if (productsListStore.offset > 0) {
                searchParams.set("offset", productsListStore.offset.toString());
                setSearchParams(searchParams);
              }
              
              productsListStore.getProductsListMore();
            }}
            hasMore={productsListStore.hasMore}
            loader={<div className={styles.loader}>Loading...</div>}
            endMessage={<p>That's all products</p>}
            className={styles["products-list"]}
          >
            {productsListStore.cardsList.map((card: ProductItemModel) => (
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
        )}
        {productsListStore.meta === Meta.error && <div>ERROR</div>}
      </div>
    </div>
  );
};

export default observer(ProductsList);
