import React, { useCallback, useEffect } from "react";

import Card from "@components/Card";
import CartStore from "@store/CartStore";
import { ProductItemModel } from "@store/models/ProductsList";
import { useLocalStore } from "@utils/useLocalStore";
import { observer } from "mobx-react-lite";
import { useNavigate } from "react-router-dom";

import styles from "./CartPage.module.scss";

export const CartPage: React.FC = (): any => {
  const navigate = useNavigate();

  const cartStore = useLocalStore(() => new CartStore());

  useEffect(() => {
    cartStore.getCardsListFromLocalStorage();
  }, [cartStore]);

  const clickEventHandler = useCallback(
    (event: React.MouseEvent) => {
      navigate(`/product/${event.currentTarget.id}`);
    },
    [navigate]
  );

  return (
    <div className={styles.cart}>
      <div className={styles.title}>Your Cart</div>
      <div className={styles["products-list"]}>
        {cartStore.cardsList.map((card: ProductItemModel) => (
          <Card
            key={`${card.id}${card.title}`}
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
      {cartStore.cardsList.length === 0 && (
        <div className={styles["empty-cart"]}>There is Nothing:(</div>
      )}
    </div>
  );
};

export default observer(CartPage);
