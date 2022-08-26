import React from "react";
import cn from "classnames/bind";
import styles from "./MyPaintings.module.scss";
import MyPainting from "../painting/MyPainting";

const cx = cn.bind(styles);

const MyPaintings = ({ paintings, authors, locations, theme }) => {
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
              ?.name || "No location"
          }
          created={item.created}
          imgUrl={item.imageUrl}
        />
      ))}
      {paintings.length === 0 && (
        <h1 className={cx(`title_${theme}`)}>No such paintings</h1>
      )}
    </div>
  );
};

export default MyPaintings;
