import React from "react";

import Button from "@components/Button";
import filterSvg from "@images/filter.svg";
import searchGlass from "@images/search-normal.svg";

import styles from "./SearchInput.module.scss";

const SearchInput = () => {
  return (
    <div className={styles.search_input}>
      <div className={styles.search}>
        <img src={searchGlass} alt="search-glass" />
        <input type="text" placeholder="Search property"></input>
        <Button>Find Now</Button>
      </div>
      <div>
        <button className={styles.button_filter}>
          <img src={filterSvg} alt="filter-svg" />
          Filter
        </button>
      </div>
    </div>
  );
};

export default SearchInput;
