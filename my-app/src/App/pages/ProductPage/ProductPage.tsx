import React, { useEffect, useMemo, useRef } from "react";

import Button from "@components/Button";
import { ButtonSize } from "@components/Button/Button";
import Carousel from "@components/Carousel";
import Loader, { LoaderSize } from "@components/Loader/Loader";
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

  useEffect(() => {
    product.getProductInfo(id);
    window.scrollTo(0, 0);
  }, [id, product]);

  let items = useRef<React.ReactNode[]>([]);
  useMemo(() => {
    items.current = product.card.images.map((img) => (
      <img key={img} src={img} alt="" />
    ));
  }, [product.card.images]);

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
              <Button size={ButtonSize.b} color="white">
                Add to Cart
              </Button>
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
