import React, {useState} from 'react';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import cn from 'classnames/bind';
import styles from './MyDropDown.module.scss'

const cx = cn.bind(styles);


const MyDropDown = ({theme, filter, setFilter}) => {
    const [isActive, setIsActive] = useState(false)
    return (
        <div className={cx("dropdown", {"dropdown_dark": theme === "dark"}, {"dropdown_down": isActive})}>
            <div
                onClick={e => setIsActive(!isActive)}
                className={cx("dropdown_btn")}
            >
                Author
                {isActive ? <ArrowDropDownIcon/> : <ArrowDropUpIcon/>}
            </div>
            <div className={cx("dropdown_content")}>
                <div className={cx("dropdown_item")}>
                    Aivazovsky
                </div>
            </div>
        </div>
    );
}

export default MyDropDown;