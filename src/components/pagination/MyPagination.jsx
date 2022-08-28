import React, { useEffect } from "react";
import { Pagination, PaginationItem } from "@mui/material";
import cn from "classnames/bind";
import styles from "../../style/index.scss";
import KeyboardArrowRightRoundedIcon from "@mui/icons-material/KeyboardArrowRightRounded";
import KeyboardArrowLeftRoundedIcon from "@mui/icons-material/KeyboardArrowLeftRounded";
import KeyboardDoubleArrowRightRoundedIcon from "@mui/icons-material/KeyboardDoubleArrowRightRounded";
import KeyboardDoubleArrowLeftRoundedIcon from "@mui/icons-material/KeyboardDoubleArrowLeftRounded";

const cx = cn.bind(styles);

export const MyPagination = ({ pageQty, page, setPage, theme }) => {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [page]);
  return (
    <div className={cx("pagination", { pagination_dark: theme === "dark" })}>
      {!!pageQty && (
        <Pagination
          count={pageQty}
          page={page}
          showFirstButton
          showLastButton
          onChange={(_, num) => setPage(num)}
          renderItem={(item) => (
            <PaginationItem
              fontSize="large"
              components={{
                previous: KeyboardArrowLeftRoundedIcon,
                next: KeyboardArrowRightRoundedIcon,
                last: KeyboardDoubleArrowRightRoundedIcon,
                first: KeyboardDoubleArrowLeftRoundedIcon,
              }}
              {...item}
            />
          )}
        />
      )}
    </div>
  );
};
