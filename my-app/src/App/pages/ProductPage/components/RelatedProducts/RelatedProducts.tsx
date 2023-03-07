import React, { useEffect } from "react";

import Card from "@components/Card";
import Loader from "@components/Loader";
import { LoaderSize } from "@components/Loader/Loader";
import RelatedProductsStore from "@store/RelatedProductsStore";
import { Meta } from "@utils/meta";
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
      {relatedProductsStore.meta === Meta.loading && (
        <div className={styles.loader}>
          <Loader size={LoaderSize.l} />
        </div>
      )}
      {relatedProductsStore.meta !== Meta.error && (
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
      )}
      {relatedProductsStore.meta === Meta.error && <div>ERROR</div>}
    </div>
  );
};

export default observer(RelatedProducts);
