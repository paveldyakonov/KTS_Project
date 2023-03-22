import React from "react";

import styles from "./CategoryCard.module.scss";

export type CategoryCardProps = {
  image: string;
  name: string;
  id: string;
  onClick: React.MouseEventHandler;
};

const CategoryCard: React.FC<CategoryCardProps> = ({ image, name, id, onClick }): any => {
  return (
    <div className={styles.card} id={id} onClick={onClick}>
      <img src={image} alt={name} className={styles["card__image"]}/>
      <div className={styles["card__name"]}>
        <div className={styles["name"]}>{name}</div>
      </div>
    </div>
  );
};

export default React.memo(CategoryCard);
