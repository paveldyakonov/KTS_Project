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

const SearchInput: React.FC = () => {
  const inputStore = useLocalStore(() => new InputStore());
  const [searchParams, setSearchParams] = useSearchParams();

  const onHandleChange = useCallback(() => {
    let category: string | null = "";
    if (searchParams.has("categoryId")) {
      category = searchParams.get("categoryId");
      if (category)
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
          onChange={(e) => inputStore.setText(e.target.value)}
        ></input>
        <Button onClick={onHandleChange}>Find Now</Button>
      </div>
      <div>
        <Filter
          value={inputStore.categoryId.slice(1)}
          onChange={(res: CategoryItemModel) => {
            let search: string | null = "";
            if (searchParams.has("search")) {
              search = searchParams.get("search");
              if (search)
                setSearchParams({
                  search: search,
                  categoryId: `${res.id}${res.name}`,
                });
            } else {
              setSearchParams({ categoryId: `${res.id}${res.name}` });
            }
          }}
        />
      </div>
    </div>
  );
};

export default observer(SearchInput);
