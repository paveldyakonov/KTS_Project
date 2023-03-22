import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

import styles from "./Carousel.module.scss";

export type CarouselProps = {
  carouselItems: React.ReactNode[];
};

const CarouselComponent: React.FC<CarouselProps> = ({ carouselItems, ...props }): any => {
  return(
    <Carousel
      showThumbs={false} 
      className={styles["carousel-item"]} 
      width={window.innerWidth < 1000 ? "327px" : "41vw"}
      autoPlay={true}
      infiniteLoop={true}
    >
      {carouselItems.map((item: React.ReactNode) => <div key={item?.toString()}>{item}</div>)}
    </Carousel>
  );
};

export default CarouselComponent;
