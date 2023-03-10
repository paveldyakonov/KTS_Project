import React, { useCallback, useEffect, useMemo, useRef } from "react";

import Button from "@components/Button";
import { ButtonSize } from "@components/Button/Button";
import Carousel from "@components/Carousel";
import Loader, { LoaderSize } from "@components/Loader/Loader";
import CartStore from "@store/CartStore";
import { ProductItemModel } from "@store/models/ProductsList";
import ProductPageStore from "@store/ProductPageStore";
import { Meta } from "@utils/meta";
import { useLocalStore } from "@utils/useLocalStore";
import { observer } from "mobx-react-lite";
import { useParams } from "react-router-dom";

import RelatedProducts from "./components/RelatedProducts";
import styles from "./ProductPage.module.scss";

const InfoProductCard: React.FC = () => {
  let { id } = useParams();
  const product = useLocalStore(() => new ProductPageStore());
  const cartStore = useLocalStore(() => new CartStore());

  useEffect(() => {
    product.getProductInfo(id);
    cartStore.getCardsListFromLocalStorage();
    window.scrollTo(0, 0);
  }, [cartStore, id, product]);

  let items = useRef<React.ReactNode[]>([]);
  useMemo(() => {
    items.current = product.card.images.map((img) => (
      <img key={img} src={img} alt="" />
    ));
  }, [product.card.images]);

  const clickEventHandler = useCallback(() => {
    const cardForCart: ProductItemModel = {
      id: product.card.id,
      title: product.card.title,
      price: product.card.price,
      description: product.card.description.slice(0, 95),
      image: product.card.images[0],
      category: product.card.category,
    };
    cartStore.setCartListInLocalStorage(cardForCart);
  }, [product, cartStore]);

  return (
    <div>
      <div id={product.card.id} className={styles.card}>
        {product.meta === Meta.loading && (
          <div className={styles.loader}>
            <Loader size={LoaderSize.l} />
          </div>
        )}
        {product.meta !== Meta.error && (
          <Carousel carouselItems={items.current} />
        )}
        {product.meta !== Meta.error && (
          <div className={styles["card__info-about-card"]}>
            <div className={styles["info-about-card__title"]}>
              {product.card.title}
            </div>
            <div className={styles["info-about-card__subtitle"]}>
              {product.card.description}
            </div>
            <div className={styles["info-about-card__price"]}>
              ${product.card.price}
            </div>
            <div className={styles.buttons}>
              <Button size={ButtonSize.b}>Buy Now</Button>
              {!cartStore.cardsListCollection.order.includes(
                product.card.id
              ) && (
                <Button
                  size={ButtonSize.b}
                  color="white"
                  onClick={clickEventHandler}
                >
                  Add to Cart
                </Button>
              )}
              {cartStore.cardsListCollection.order.includes(
                product.card.id
              ) && (
                <Button
                  size={ButtonSize.b}
                  color="white"
                  onClick={() => {
                    cartStore.deleteCardFromCartInLocalStorage(product.card.id);
                  }}
                >
                  Delete from Cart
                </Button>
              )}
            </div>
          </div>
        )}
      </div>
      {product.meta === Meta.error && <div>ERROR</div>}
      <RelatedProducts categoryId={product.card.categoryId} />
    </div>
  );
};

export default observer(InfoProductCard);
