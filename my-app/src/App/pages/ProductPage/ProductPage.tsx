import React, { useEffect } from "react";

import Button from "@components/Button";
import { ButtonSize } from "@components/Button/Button";
import Carousel from "@components/Carousel";
import ProductPageStore from "@store/ProductPageStore";
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

  let items = [];
  if (product.card.image1) {
    items.push(<img key="img1" src={product.card.image1} alt="" />);
  }
  if (product.card.image2) {
    items.push(<img key="img2" src={product.card.image2} alt="" />);
  }
  if (product.card.image3) {
    items.push(<img key="img3" src={product.card.image3} alt="" />);
  }

  return (
    <div>
      <div id={product.card.id} className={styles.card}>
        <Carousel carouselItems={items} />
        <div className={styles["card__info-about-card"]}>
          <div className={styles["card__info-about-card__title"]}>
            {product.card.title}
          </div>
          <div className={styles["card__info-about-card__subtitle"]}>
            {product.card.description}
          </div>
          <div className={styles["card__info-about-card__price"]}>
            ${product.card.price}
          </div>
          <div className={styles.buttons}>
            <Button size={ButtonSize.b}>Buy Now</Button>
            <Button size={ButtonSize.b} color="white">
              Add to Cart
            </Button>
          </div>
        </div>
      </div>
      <RelatedProducts categoryId={product.card.categoryId} />
    </div>
  );
};

export default React.memo(observer(InfoProductCard));
