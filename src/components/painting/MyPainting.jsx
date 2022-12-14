import React, { useState } from "react";
import cn from "classnames/bind";
import styles from "./MyPainting.module.scss";

const cx = cn.bind(styles);

export const MyPainting = ({ imgUrl, name, authorName, created, location }) => {
  const [imgLoaded, setImgLoaded] = useState(false);
  return (
    <div className={cx("painting")}>
      <img
        loading="lazy"
        onLoad={() => setImgLoaded(true)}
        className={cx("painting__image", { painting__image_loaded: imgLoaded })}
        src={`https://test-front.framework.team${imgUrl}`}
        alt={name}
      />
      {!imgLoaded && (
        <div className={cx("lds-ring")}>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      )}
      <div className={cx("painting__description")}>
        <div className={cx("painting__name")}>{name}</div>
        <div className={cx("painting__info")}>
          <div>
            <span>Author: </span>
            {authorName}
          </div>
          <div>
            <span>Created: </span>
            {created}
          </div>
          <div>
            <span>Location: </span>
            {location}
          </div>
        </div>
      </div>
    </div>
  );
};
