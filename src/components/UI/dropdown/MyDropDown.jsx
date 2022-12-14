import React, { useState } from "react";
import ArrowDropDownRoundedIcon from "@mui/icons-material/ArrowDropDownRounded";
import ArrowDropUpRoundedIcon from "@mui/icons-material/ArrowDropUpRounded";
import CloseIcon from "@mui/icons-material/Close";
import cn from "classnames/bind";
import styles from "./MyDropDown.module.scss";
import { useClickOutside } from "../../../hooks/use-outside";

const cx = cn.bind(styles);

export const MyDropDown = ({ theme, filter, setFilter, items, searchName }) => {
  const [isActive, setIsActive] = useState(false);
  const [selected, setSelected] = useState(searchName);
  let dropdown = useClickOutside(() => {
    setIsActive(false);
  });
  return (
    <div
      ref={dropdown}
      className={cx(
        "dropdown",
        { dropdown_dark: theme === "dark" },
        { dropdown_down: isActive }
      )}
    >
      <div
        onClick={() => setIsActive(!isActive)}
        className={cx("dropdown_btn")}
      >
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
          {isActive ? <ArrowDropDownRoundedIcon /> : <ArrowDropUpRoundedIcon />}
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
            <div>{item.name}</div>
          </div>
        ))}
      </div>
    </div>
  );
};
