import React from 'react';
import {Pagination, PaginationItem} from "@mui/material";
import cn from 'classnames/bind';
import styles from '../../style/index.scss'
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';

const cx = cn.bind(styles);

const MyPagination = ({pageQty, page, setPage, theme}) => {
    return (
        <div className={cx("pagination", {"pagination_dark": theme === 'dark'})}
             style={{marginTop: "44px", marginBottom: "93px"}}
        >
            {!!pageQty && (
                <Pagination
                    count={pageQty}
                    page={page}
                    showFirstButton
                    showLastButton
                    onChange={(_, num) => setPage(num)}
                    renderItem={(item) => (
                        <PaginationItem
                            components={{
                                previous: KeyboardArrowLeftIcon, next: KeyboardArrowRightIcon,
                                last: KeyboardDoubleArrowRightIcon, first: KeyboardDoubleArrowLeftIcon
                            }}
                            {...item}
                        />
                    )}
                />
            )}
        </div>
    );
}
export default MyPagination;