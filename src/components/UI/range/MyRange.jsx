import React, { useState } from "react";
import ArrowDropDownRoundedIcon from "@mui/icons-material/ArrowDropDownRounded";
import ArrowDropUpRoundedIcon from "@mui/icons-material/ArrowDropUpRounded";
import cn from "classnames/bind";
import styles from "../dropdown/MyDropDown.module.scss";
import CloseIcon from "@mui/icons-material/Close";
import MyInput from "../input/MyInput";

const cx = cn.bind(styles);

const MyRange = ({ filter, setFilter, theme }) => {
  const [isActive, setIsActive] = useState(false);
  return (
    <div
      className={cx(
        "dropdown",
        { dropdown_dark: theme === "dark" },
        { dropdown_down_range: isActive }
      )}
    >
      <div className={cx("dropdown_btn")}>
        <div className={cx("dropdown_text")}>Created</div>
        <div className={cx("dropdown_buttons")}>
          {(filter.dateEnd || filter.dateStart) !== "" ? (
            <CloseIcon
              className={cx("dropdown_buttons_close")}
              onClick={(event) => {
                setFilter({ ...filter, dateStart: "", dateEnd: "" });
                setIsActive(!isActive);
                event.stopPropagation();
              }}
            />
          ) : null}
          {isActive ? (
            <ArrowDropDownRoundedIcon onClick={() => setIsActive(!isActive)} />
          ) : (
            <ArrowDropUpRoundedIcon onClick={() => setIsActive(!isActive)} />
          )}
        </div>
      </div>
      <div className={cx("dropdown_content", "dropdown_content_range")}>
        <MyInput
          value={filter.dateStart}
          onChange={(e) => setFilter({ ...filter, dateStart: e.target.value })}
          placeholder={"from"}
          theme={theme}
          className={cx("selector")}
        />
        <div className={cx("divider", { divider_dark: theme === "dark" })} />
        <MyInput
          value={filter.dateEnd}
          onChange={(e) => setFilter({ ...filter, dateEnd: e.target.value })}
          placeholder={"before"}
          className={cx("selector")}
          theme={theme}
        />
      </div>
    </div>
  );
};

export default MyRange;
