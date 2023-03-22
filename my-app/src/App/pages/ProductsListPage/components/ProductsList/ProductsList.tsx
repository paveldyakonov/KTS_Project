import React, { useCallback, useEffect, useRef } from "react";

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
import CardSkeleton from "@components/Skeletons/CardSkeleton";
import SmallCardSkeleton from "@components/Skeletons/SmallCardSkeleton";

const ProductsList: React.FC = (): any => {
  const navigate = useNavigate();
  const targetRef = useRef<HTMLDivElement | null>(null);

  const [searchParams, setSearchParams] = useSearchParams();
  const skeletonArr: undefined[] = [...new Array(6)];

  const productsListStore = useLocalStore(() => new ProductsListStore());

   useEffect(() => {
    if (searchParams.has("offset")) {
      productsListStore.getProductsListWithOffset();
      setTimeout(() => {
          targetRef.current?.scrollIntoView({ block: "start", behavior: "smooth" });
        }, 2000);
    } else {
      productsListStore.getProductsList("reset");
    }
    
  }, [productsListStore, searchParams.get("categoryId"), searchParams.get("search")]);

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
          Total Products
        </div>
      </div>
      <div>
        {productsListStore.meta !== Meta.error && (
          <div>
            <InfiniteScroll
              dataLength={productsListStore.cardsList.length}
              next={useCallback(() => {
                if (productsListStore.offset > 0) {
                  searchParams.set("offset", productsListStore.offset.toString());
                  setSearchParams(searchParams);
                }
              
                productsListStore.getProductsListMore();
              }, [searchParams, productsListStore])}
              hasMore={productsListStore.hasMore}
              loader={
                <div className={styles.loader}>
                  <Loader size={LoaderSize.l} />
                </div>
              }
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
              <div ref={targetRef}>
              </div>
          </div>
        )}
        {productsListStore.meta === Meta.loading && window.innerWidth > 500 && (
          <div className={styles["products-list"]}>
            {skeletonArr.map((_, index) => <CardSkeleton key={index} />)}
          </div>
        )}
        {productsListStore.meta === Meta.loading && window.innerWidth <= 500 && (
          <div className={styles["products-list"]}>
            {skeletonArr.map((_, index) => <SmallCardSkeleton key={index} />)}
          </div>
        )}
        {productsListStore.meta === Meta.error && <div>ERROR</div>}
      </div>
    </div>
  );
};

export default observer(ProductsList);
