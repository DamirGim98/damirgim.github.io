import React, { useState } from "react";
import ArrowDropDownRoundedIcon from "@mui/icons-material/ArrowDropDownRounded";
import ArrowDropUpRoundedIcon from "@mui/icons-material/ArrowDropUpRounded";
import cn from "classnames/bind";
import styles from "./MyRange.module.scss";
import CloseIcon from "@mui/icons-material/Close";
import { MyInput } from "../input/MyInput";
import { useClickOutside } from "../../../hooks/use-outside";

const cx = cn.bind(styles);

const MyRange = ({ filter, setFilter, theme }) => {
  const [isActive, setIsActive] = useState(false);
  let range = useClickOutside(() => {
    setIsActive(false);
  });
  return (
    <div
      ref={range}
      className={cx(
        "range",
        { range_dark: theme === "dark" },
        { range_down: isActive }
      )}
    >
      <div onClick={() => setIsActive(!isActive)} className={cx("range_menu")}>
        <div className={cx("range_text")}>Created</div>
        <div className={cx("range_buttons")}>
          {(filter.dateEnd || filter.dateStart) !== "" ? (
            <CloseIcon
              className={cx("range_close")}
              onClick={(event) => {
                setFilter({ ...filter, dateStart: "", dateEnd: "" });
                event.stopPropagation();
              }}
            />
          ) : null}
          {isActive ? <ArrowDropDownRoundedIcon /> : <ArrowDropUpRoundedIcon />}
        </div>
      </div>
      <div className={cx("range_content")}>
        <MyInput
          value={filter.dateStart}
          onChange={(e) => setFilter({ ...filter, dateStart: e.target.value })}
          placeholder={"from"}
          theme={theme}
          className={cx("range_content_selector")}
        />
        <div
          className={cx("range_content_divider", {
            range_content_divider_dark: theme === "dark",
          })}
        />
        <MyInput
          value={filter.dateEnd}
          onChange={(e) => setFilter({ ...filter, dateEnd: e.target.value })}
          placeholder={"before"}
          className={cx("range_content_selector")}
          theme={theme}
        />
      </div>
    </div>
  );
};

export default MyRange;
