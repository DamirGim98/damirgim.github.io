import React from "react";
import cn from "classnames/bind";
import styles from "./MyPaintings.module.scss";
import MyPainting from "../painting/MyPainting";

const cx = cn.bind(styles);

const MyPaintings = ({ paintings, authors, locations }) => {
  return (
    <div className={cx("paintings")}>
      {paintings.map((item) => (
        <MyPainting
          key={item.id}
          name={item.name}
          authorName={
            authors.find((author) => author.id === item.authorId)?.name ||
            "No Author"
          }
          location={
            locations.find((location) => location.id === item.locationId)
              ?.location || "No location"
          }
          created={item.created}
          imgUrl={item.imageUrl}
        />
      ))}
    </div>
  );
};

export default MyPaintings;
