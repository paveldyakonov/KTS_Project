import React, { useCallback, useEffect } from "react";

import Card from "@components/Card";
import { ProductItemModel } from "@store/models/ProductsList";
import RelatedProductsStore from "@store/RelatedProductsStore";
import { Meta } from "@utils/meta";
import { useLocalStore } from "@utils/useLocalStore";
import { observer } from "mobx-react-lite";
import { useNavigate } from "react-router-dom";

import styles from "./RelatedProducts.module.scss";
import CardSkeleton from "@components/Skeletons/CardSkeleton";
import SmallCardSkeleton from "@components/Skeletons/SmallCardSkeleton";

export type RelatedProductsProps = {
  categoryId: string;
};

const RelatedProducts: React.FC<RelatedProductsProps> = ({ categoryId }): any => {
  const navigate = useNavigate();
  const relatedProductsStore = useLocalStore(() => new RelatedProductsStore());
  const skeletonArr: undefined[] = [...new Array(3)];


  useEffect(() => {
    if (categoryId) relatedProductsStore.getProductsList(categoryId);
  }, [categoryId, relatedProductsStore]);

  const clickEventHandler = useCallback(
    (event: React.MouseEvent) => {
      navigate(`/product/${event.currentTarget.id}`);
    },
    [navigate]
  );

  return (
    <div>
      <div className={styles.title}>Related Items</div>
      {relatedProductsStore.meta !== Meta.error && (
        <div className={styles["products-list"]}>
          {relatedProductsStore.cardsList.map((card: ProductItemModel) => (
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
        </div>
      )}
      {relatedProductsStore.meta === Meta.loading && window.innerWidth > 500 && (
        <div className={styles["products-list"]}>
            {skeletonArr.map((_, index) => <CardSkeleton key={index} />)}
        </div>
      )}
      {relatedProductsStore.meta === Meta.loading && window.innerWidth <= 500 && (
        <div className={styles["products-list"]}>
            {skeletonArr.map((_, index) => <SmallCardSkeleton key={index} />)}
        </div>
      )}
      {relatedProductsStore.meta === Meta.error && <div>ERROR</div>}
    </div>
  );
};

export default observer(RelatedProducts);
