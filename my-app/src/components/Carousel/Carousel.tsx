import React, { useEffect, useRef, useState } from "react";

import styles from "./Carousel.module.scss";

export type CarouselProps = {
  carouselItems: React.ReactNode[];
};

const Carousel: React.FC<CarouselProps> = ({ carouselItems, ...props }) => {
  const [active, setActive] = useState(0);
  let scrollInterval = useRef<NodeJS.Timeout | any>(null);

  useEffect(() => {
    scrollInterval.current = setInterval(() => {
      setActive((active + 1) % carouselItems.length);
    }, 3000);

    return () => clearInterval(scrollInterval.current);
  });

  return (
    <div>
      {carouselItems.map((item: any, index) => {
        const activeClass = active === index ? styles.visible : "";
        return React.cloneElement(item, {
          ...props,
          className: `${styles["carousel-item"]}${activeClass}`,
          key: `carousel-item${item.key}`,
        });
      })}
    </div>
  );
};

export default React.memo(Carousel);
