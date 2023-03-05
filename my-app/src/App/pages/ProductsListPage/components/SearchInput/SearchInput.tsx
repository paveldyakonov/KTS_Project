import React from "react";

import Button from "@components/Button";
import { MultiDropdown } from "@components/MultiDropdown/MultiDropdown";
import searchGlass from "@images/search-normal.svg";
import InputStore from "@store/InputStore";
import { useLocalStore } from "@utils/useLocalStore";
import { observer } from "mobx-react-lite";
import { useSearchParams } from "react-router-dom";

import styles from "./SearchInput.module.scss";

const SearchInput: React.FC = () => {
  const inputStore = useLocalStore(() => new InputStore());
  const [searchParams, setSearchParams] = useSearchParams();

  const onHandleChange = () => {
    let category: any = "";
    if (searchParams.has("categoryId")) {
      category = searchParams.get("categoryId");
    }
    setSearchParams({ search: inputStore.text, categoryId: category });
  };

  return (
    <div className={styles["search-input"]}>
      <div className={styles["search-input__search"]}>
        <img src={searchGlass} alt="search-glass" />
        <input
          value={inputStore.text}
          type="text"
          placeholder="Search property"
          onChange={(e) => inputStore.setText(e.target.value)}
        ></input>
        <Button onClick={onHandleChange}>Find Now</Button>
      </div>
      <div>
        <MultiDropdown
          value={inputStore.categoryId}
          onChange={(res: any) => {
            setSearchParams({
              search: inputStore.text,
              categoryId: res.key[0],
            });
          }}
        />
      </div>
    </div>
  );
};

export default React.memo(observer(SearchInput));
