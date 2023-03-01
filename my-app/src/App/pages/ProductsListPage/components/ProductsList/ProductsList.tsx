import React, { useEffect, useState } from "react";

import Card from "@components/Card";
import { API_ENDPOINT } from "@config/api";
import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";
import { useNavigate } from "react-router-dom";

import styles from "./ProductsList.module.scss";

const ProductsList = () => {
  const [hasMore, setHasMore] = useState(true);
  const [cards, setCards] = useState([]);
  const [offset, setOffset] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const fetch = async () => {
      const result = await axios({
        method: "get",
        url: API_ENDPOINT.PRODUCTS,
        params: {
          offset: offset,
          limit: 12,
        },
      });

      if (result.data.length === 0) setHasMore(false);

      setCards(
        cards.concat(
          result.data.map((row: any) => ({
            id: row.id,
            title: row.title,
            price: row.price,
            description: row.description,
            image: row.images[0],
            category: row.category.name,
          }))
        )
      );
    };
    fetch();
  }, [offset]);

  const clickEventHandler = (event: React.MouseEvent) => {
    navigate(`/product/${event.currentTarget.id}`);
  };

  return (
    <div>
      <div className={styles.label_and_products_length}>
        <div className={styles.label}>Total Product</div>
        <div className={styles.products_length}>{cards.length}</div>
      </div>
      <div>
        <InfiniteScroll
          dataLength={cards.length}
          next={() => {
            setOffset(offset + 12);
          }}
          hasMore={hasMore}
          loader={<p>Loading...</p>}
          endMessage={<p>That's all products</p>}
          className={styles.products_list}
        >
          {cards.map((card: any) => (
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
        </InfiniteScroll>
      </div>
    </div>
  );
};

export default ProductsList;
