import React, {useState} from 'react';
import cn from 'classnames/bind';
import styles from './MyPainting.module.scss'

const cx = cn.bind(styles);

const MyPainting = ({painting}) => {
    const [imgLoaded, setImgLoaded] = useState(false)
    return (
        <div className={cx("painting")}>
            <img
                onLoad={() => setImgLoaded(true)}
                className={cx('painting__image', {'painting__image_loaded': imgLoaded})}
                src={`https://test-front.framework.team${painting.imageUrl}`}
                alt={painting.name}
            />

            <div className={cx('painting__description')}>
                <div className={cx('painting__name')}>{painting.name}</div>
                <div className={cx('painting__info')}>
                    <div>
                        <span>Author: </span>
                        {painting.authorId}
                    </div>
                    <div>
                        <span>Created: </span>
                        {painting.created}
                    </div>
                    <div>
                        <span>Location: </span>
                        {painting.locationId}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MyPainting;