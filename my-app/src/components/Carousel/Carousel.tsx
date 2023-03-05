import React, { useEffect, useState } from "react";

import "./Carousel.scss";

export type CarouselProps = {
  carouselItems: React.ReactNode[];
};

const Carousel: React.FC<CarouselProps> = ({ carouselItems, ...props }) => {
  const [active, setActive] = useState(0);
  let scrollInterval: NodeJS.Timeout | any = null;

  useEffect(() => {
    scrollInterval = setInterval(() => {
      setActive((active + 1) % carouselItems.length);
    }, 3000);

    return () => clearInterval(scrollInterval);
  });

  return (
    <div>
      {carouselItems.map((item: any, index) => {
        const activeClass = active === index ? "visible" : "";
        return React.cloneElement(item, {
          ...props,
          className: `carousel-item${activeClass}`,
          key: `carousel-item${item.key}`,
        });
      })}
    </div>
  );
};

export default React.memo(Carousel);
