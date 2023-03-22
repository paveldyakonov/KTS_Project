import { observer } from "mobx-react-lite";
import React, { useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import SmallCategoryCardSkeleton from "@components/Skeletons/SmallCategoryCardSkeleton";
import CategoryCardSkeleton from "@components/Skeletons/CategoryCardSkeleton";
import { CategoryItemModel } from "@store/models/CategoryList";
import CategoriesPageStore from "@store/CategoriesPageStore";
import { useLocalStore } from "@utils/useLocalStore";
import { Meta } from "@utils/meta";

import styles from "./CategoriesPage.module.scss";
import CategoryCard from "./components/CategoryCard";

const CategoriesPage: React.FC = (): any => {
  const navigate = useNavigate();
  const categoriesStore = useLocalStore(() => new CategoriesPageStore());
  const skeletonArr: undefined[] = [...new Array(6)];

  useEffect(() => {
    categoriesStore.getCategoryList();
  }, [categoriesStore]);

  const clickEventHandler = useCallback(
    (event: React.MouseEvent) => {
      navigate(`/?categoryId=${event.currentTarget.id}`);
    }, [navigate]);

  return (
    <div className={styles["categories-page"]}>
      <div className={styles.title}>All Categories</div>
      <div>
        {categoriesStore.meta !== Meta.error && (
          <div className={styles["categories-list"]}>
            {categoriesStore.categoryList.map((card: CategoryItemModel) => (
              <CategoryCard 
                key={`${card.id}${card.name}`} 
                image={card.image} 
                name={card.name} 
                id={`${card.id}${card.name}`}
                onClick={clickEventHandler} 
              />
            ))}
          </div>
        )}
        {categoriesStore.meta === Meta.loading && window.innerWidth > 500 && (
          <div className={styles["categories-list"]}>
            {skeletonArr.map((_, index) => <CategoryCardSkeleton key={index}/>)}
          </div>
        )}
        {categoriesStore.meta === Meta.loading && window.innerWidth <= 500 && (
          <div className={styles["categories-list"]}>
            {skeletonArr.map((_, index) => <SmallCategoryCardSkeleton key={index}/>)}
          </div>
        )}
        {categoriesStore.meta === Meta.error && <div>ERROR</div>}
      </div>
    </div>
  )
};

export default observer(CategoriesPage);
