import React from 'react';

import cn from 'classnames/bind';
import styles from './MyPaintings.module.scss'
import MyPainting from "../painting/MyPainting";
const cx = cn.bind(styles);



const MyPaintings = ({paintings}) => {
    return (
        <div className={cx("paintings")}>
            {paintings.map( item => (
                <MyPainting key={item.id} painting={item}/>
            ))}
        </div>
    );
}

export default MyPaintings;