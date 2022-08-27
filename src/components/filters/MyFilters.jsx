import React from "react";
import cn from "classnames/bind";
import styles from "./MyFilters.module.scss";
import { MyInput } from "../UI/input/MyInput";
import { MyDropDown } from "../UI/dropdown/MyDropDown";
import MyRange from "../UI/range/MyRange";
const cx = cn.bind(styles);

export const MyFilters = ({ theme, authors, locations, filter, setFilter }) => {
  return (
    <div className={cx("filter_wrapper")}>
      <MyInput
        theme={theme}
        value={filter.query}
        onChange={(e) => setFilter({ ...filter, query: e.target.value })}
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
      <MyRange theme={theme} filter={filter} setFilter={setFilter} />
    </div>
  );
};
