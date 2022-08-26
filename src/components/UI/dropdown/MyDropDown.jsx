import React, { useState } from "react";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import CloseIcon from "@mui/icons-material/Close";
import cn from "classnames/bind";
import styles from "./MyDropDown.module.scss";

const cx = cn.bind(styles);

const MyDropDown = ({ theme, filter, setFilter, items, searchName }) => {
  const [isActive, setIsActive] = useState(false);
  const [selected, setSelected] = useState(searchName);
  return (
    <div
      className={cx(
        "dropdown",
        { dropdown_dark: theme === "dark" },
        { dropdown_down: isActive }
      )}
    >
      <div className={cx("dropdown_btn")}>
        <div className={cx("dropdown_text")}>{selected}</div>
        <div className={cx("dropdown_buttons")}>
          {selected !== searchName ? (
            <CloseIcon
              className={cx("dropdown_buttons_close")}
              onClick={(event) => {
                setSelected(searchName);
                if (searchName === "Author") {
                  setFilter({ ...filter, authorId: null });
                } else {
                  setFilter({ ...filter, locationId: null });
                }
                event.stopPropagation();
              }}
            />
          ) : null}
          {isActive ? (
            <ArrowDropDownIcon onClick={() => setIsActive(!isActive)} />
          ) : (
            <ArrowDropUpIcon onClick={() => setIsActive(!isActive)} />
          )}
        </div>
      </div>
      <hr />
      <div className={cx("dropdown_content")}>
        {items.map((item) => (
          <div
            key={item.id}
            onClick={(_) => {
              if (searchName === "Author") {
                setFilter({ ...filter, authorId: item.id });
              } else {
                setFilter({ ...filter, locationId: item.id });
              }
              setSelected(item.name);
              setIsActive(!isActive);
            }}
            className={cx("dropdown_item")}
          >
            {item.name}
          </div>
        ))}
      </div>
    </div>
  );
};
export default MyDropDown;
