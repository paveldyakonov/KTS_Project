import React from "react";

import styles from "./Card.module.scss";

export type CardProps = {
  /** URL изображения */
  image: string;
  category: string;
  /** Заголовок карточки */
  title: React.ReactNode;
  /** Подзаголовок карточки */
  subtitle: React.ReactNode;
  /** Содержимое карточки (футер/боковая часть), может быть пустым */
  content?: React.ReactNode;
  /** Клик на карточку */
  onClick?: React.MouseEventHandler;
  id: string;
};

export const Card: React.FC<CardProps> = ({
  image,
  category,
  title,
  subtitle,
  content,
  onClick,
  id,
}): any => {
  return (
    <div className={styles.card} onClick={onClick} id={id}>
      <img src={image} alt={"" + title} />
      <div className={styles.text_card}>
        <div className={styles.category}>{category}</div>
        <div className={styles.text_card_content}>
          <div className={styles.text_card_content_title}>
            <div className={styles.title}>{title}</div>
            <div className={styles.subtitle}>{subtitle}</div>
          </div>
          <div className={styles.content}>{"$" + content}</div>
        </div>
      </div>
    </div>
  );
};

export default Card;
