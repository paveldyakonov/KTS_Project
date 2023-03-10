import React from "react";

import filterSvg from "@images/filter.svg";
import { CategoryItemModel } from "@store/models/CategoryList";

import styles from "./MultiDropdown.module.scss";

export type Option = {
  key: string;
  value: string;
};

export type MultiDropdownProps = {
  value: string;
  onChange: (value: CategoryItemModel) => void;
  disabled?: boolean;
  categories: CategoryItemModel[];
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
};

const DropdownItem: React.FC<Option> = ({ ...props }): any => {
  let dropClass = styles["dropdown-item"];
  return (
    <div {...props} className={dropClass} key={props.key}>
      {props.value}
    </div>
  );
};

export const MultiDropdown: React.FC<MultiDropdownProps> = ({
  ...props
}): any => {
  const handleClickOnDropdown = (e: React.MouseEvent) => {
    props.setIsOpen(!props.isOpen);
  };

  const clickOnDropdownItem = (e: React.MouseEvent) => {
    let res: CategoryItemModel = {
      id: "",
      name: "",
      image: "",
    };

    for (const option of props.categories) {
      if (option.name === (e.target as Element).getAttribute("value")) {
        res = JSON.parse(JSON.stringify(option));
        break;
      }
    }

    props.onChange(res);
    props.setIsOpen(!props.isOpen);
  };

  return (
    <div className={styles["multi-dropdown"]}>
      <button
        className={styles["button-filter"]}
        onClick={handleClickOnDropdown}
      >
        <img src={filterSvg} alt="filter" />
        {props.value}
      </button>
      {props.isOpen && !props.disabled && (
        <div className={styles["options"]} onClick={clickOnDropdownItem}>
          {props.categories.map((category: CategoryItemModel) => (
            <DropdownItem key={category.id} value={category.name} />
          ))}
        </div>
      )}
    </div>
  );
};

export default React.memo(MultiDropdown);
