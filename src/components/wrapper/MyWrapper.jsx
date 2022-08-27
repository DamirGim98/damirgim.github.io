import React from "react";
import cn from "classnames/bind";
import styles from "./MyWrapper.module.scss";
const cx = cn.bind(styles);

export const MyWrapper = (props) => {
  return (
    <div className={cx("wrapper", { wrapper__dark: props.theme === "dark" })}>
      <div className={cx("wrapper__container")}>{props.children}</div>
    </div>
  );
};
