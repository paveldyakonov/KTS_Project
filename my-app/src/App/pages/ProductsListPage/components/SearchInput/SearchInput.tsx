import React, { useCallback } from "react";

import Button from "@components/Button";
import searchGlass from "@images/search-normal.svg";
import InputStore from "@store/InputStore";
import { CategoryItemModel } from "@store/models/CategoryList";
import { useLocalStore } from "@utils/useLocalStore";
import { observer } from "mobx-react-lite";
import { useSearchParams } from "react-router-dom";

import styles from "./SearchInput.module.scss";
import Filter from "../Filter";
import FilterStore from "@store/FilterStore";

const SearchInput: React.FC = (): any => {
  const inputStore = useLocalStore(() => new InputStore());
  const filterStore = useLocalStore(() => new FilterStore());
  const [searchParams, setSearchParams] = useSearchParams();

  const onHandleChange = useCallback(() => {
    let category: string | null = "";
    if (searchParams.has("categoryId")) {
      category = searchParams.get("categoryId");
      if (category !== null)
        setSearchParams({ search: inputStore.text, categoryId: category });
    } else {
      setSearchParams({ search: inputStore.text });
    }
  }, [inputStore.text, searchParams, setSearchParams]);

  return (
    <div className={styles["search-input"]}>
      <div className={styles["search-input__search"]}>
        <img src={searchGlass} alt="search-glass" />
        <input
          className={styles.input}
          value={inputStore.text}
          type="text"
          placeholder="Search property"
          onChange={useCallback((e: any) => inputStore.setText(e.target.value), [inputStore])}
        ></input>
        <Button onClick={onHandleChange}>Find Now</Button>
      </div>
      <div>
        <Filter
          value={filterStore.categoryId.slice(1)}
          onChange={useCallback((res: CategoryItemModel) => {
            if (searchParams.has("search")) {
              const search: string | null = searchParams.get("search");
              if (search !== null) {
                if (res.name === "Deselect") {
                  setSearchParams({
                    search: search,
                    categoryId: "",
                  })
                } else {
                  setSearchParams({
                    search: search,
                    categoryId: `${res.id}${res.name}`,
                  })
                }
              };
            } else {
              if (res.name === "Deselect") {
                setSearchParams({ categoryId: "" });
              } else {
                setSearchParams({ categoryId: `${res.id}${res.name}` });
              }
            }
          }, [searchParams, filterStore])}
        />
      </div>
    </div>
  );
};

export default observer(SearchInput);
