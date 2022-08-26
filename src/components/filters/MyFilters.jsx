import React from "react";
import cn from "classnames/bind";
import styles from "./MyFilters.module.scss";
import MyInput from "../UI/input/MyInput";
import MyDropDown from "../UI/dropdown/MyDropDown";
const cx = cn.bind(styles);

const MyFilters = ({
  theme,
  query,
  authors,
  locations,
  filter,
  setFilter,
  setQuery,
}) => {
  return (
    <div className={cx("filter_wrapper")}>
      <MyInput
        theme={theme}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Name"
      />
      <MyDropDown
        theme={theme}
        items={authors}
        filter={filter}
        setFilter={setFilter}
        searchName={"Author"}
      />
      <MyDropDown
        theme={theme}
        items={locations}
        filter={filter}
        setFilter={setFilter}
        searchName={"Locations"}
      />
    </div>
  );
};

export default MyFilters;
