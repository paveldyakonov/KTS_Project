import React, { useEffect } from "react";

import MultiDropdown from "@components/MultiDropdown";
import FilterStore from "@store/FilterStore";
import { CategoryItemModel } from "@store/models/CategoryList";
import { useLocalStore } from "@utils/useLocalStore";
import { observer } from "mobx-react-lite";

export type FilterProps = {
  value: string;
  onChange: (value: CategoryItemModel) => void;
  disabled?: boolean;
};

export const Filter: React.FC<FilterProps> = ({ ...props }): any => {
  const filterStore = useLocalStore(() => new FilterStore());

  useEffect(() => {
    filterStore.getCategoryList();
  }, [filterStore]);

  return (
    <MultiDropdown
      value={props.value}
      onChange={props.onChange}
      categories={filterStore.categoryList}
      isOpen={filterStore.isOpen}
      setIsOpen={filterStore.setIsOpen}
    />
  );
};

export default observer(Filter);
