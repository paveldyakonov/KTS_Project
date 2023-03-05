import React, { useEffect } from "react";

import Card from "@components/Card";
import RelatedProductsStore from "@store/RelatedProductsStore";
import { useLocalStore } from "@utils/useLocalStore";
import { observer } from "mobx-react-lite";
import { useNavigate } from "react-router-dom";

import styles from "./RelatedProducts.module.scss";

export type RelatedProductsProps = {
  categoryId: string;
};

const RelatedProducts: React.FC<RelatedProductsProps> = ({ categoryId }) => {
  const navigate = useNavigate();
  const relatedProductsStore = useLocalStore(
    () => new RelatedProductsStore(categoryId)
  );

  useEffect(() => {
    if (categoryId) relatedProductsStore.getProductsList("reset", categoryId);
  }, [categoryId, relatedProductsStore]);

  const clickEventHandler = (event: React.MouseEvent) => {
    navigate(`/product/${event.currentTarget.id}`);
  };

  return (
    <div>
      <div className={styles.title}>Related Items</div>
      <div className={styles["products-list"]}>
        {relatedProductsStore.cardsList.map((card: any) => (
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
    </div>
  );
};

export default React.memo(observer(RelatedProducts));
