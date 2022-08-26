import React from "react";
import cn from "classnames/bind";

import styles from "./MyInput.module.scss";

const cx = cn.bind(styles);

const MyInput = (props) => {
  return (
    <input
      className={cx("input", { input__dark: props.theme === "dark" })}
      {...props}
    />
  );
};

export default MyInput;
