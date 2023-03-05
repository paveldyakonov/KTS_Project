import React, { useEffect } from "react";

import { API_ENDPOINT } from "@config/api";
import filterSvg from "@images/filter.svg";
import "./MultiDropdown.scss";
import axios from "axios";

export type Option = {
  key: string;
  value: string;
};

export type MultiDropdownProps = {
  value: string;
  onChange: (value: Option[]) => void;
  disabled?: boolean;
};

const DropdownItem: React.FC<Option> = ({ ...props }): any => {
  let dropClass = "dropdown-item";
  return (
    <div {...props} className={dropClass} key={props.key}>
      {props.value}
    </div>
  );
};

export const MultiDropdown: React.FC<MultiDropdownProps> = ({
  ...props
}): any => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [categories, setCategories]: any = React.useState([
    { key: " Deselect", value: "Deselect" },
  ]);

  useEffect(() => {
    const fetch = async () => {
      const result = await axios({
        method: "get",
        url: `${API_ENDPOINT.CATEGORY_ALL_PRODUCTS}`,
      });

      setCategories(
        categories.concat(
          result.data.map((category: any) => ({
            key: `${category.id}${category.name}`,
            value: category.name,
          }))
        )
      );
    };
    if (props.value) fetch();
  }, []);

  const handleClickOnDropdown = (e: React.MouseEvent) => {
    setIsOpen(!isOpen);
  };

  const clickOnDropdownItem = (e: any) => {
    if (!(e.target as Element).classList.contains("dropdown-item")) {
      return;
    }

    let res: any = {};
    for (let option of categories) {
      if (option.value === (e.target as Element).getAttribute("value")) {
        res = JSON.parse(JSON.stringify(option));
        break;
      }
    }

    if ((e.target as Element).classList.contains("selected")) {
      (e.target as Element).classList.remove("selected");
    } else {
      (e.target as Element).classList.add("selected");
    }

    props.onChange(res);
    setIsOpen(!isOpen);
  };

  return (
    <div className="multi-dropdown">
      <button className="button-filter" onClick={handleClickOnDropdown}>
        <img src={filterSvg} alt="filter" />
        {props.value}
      </button>
      {isOpen && !props.disabled && (
        <div className="options" onClick={clickOnDropdownItem}>
          {categories.map((category: any) => (
            <DropdownItem key={category.key} value={category.value} />
          ))}
        </div>
      )}
    </div>
  );
};
