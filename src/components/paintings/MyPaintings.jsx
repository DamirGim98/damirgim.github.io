import React, {useEffect, useState} from 'react';
import cn from 'classnames/bind';
import styles from './MyPaintings.module.scss'
import MyPainting from "../painting/MyPainting";
import AuthorService from "../../API/AuthorService";
import LocationService from "../../API/LocationService";

const cx = cn.bind(styles);


const MyPaintings = ({paintings}) => {
    const [authors, setAuthors] = useState([])
    const [locations, setLocations] = useState([])

    useEffect(() => {
        async function fetchData() {
            const authors_data = await AuthorService.getAll()
            const locations_data = await LocationService.getAll()
            setAuthors(authors_data)
            setLocations(locations_data)
        }

        fetchData().then(e => console.log("fetching once"))
    }, [])
    return (
        <div className={cx("paintings")}>
            {paintings.map(item => (
                <MyPainting
                    key={item.id}
                    name={item.name}
                    authorName={authors.find(author => author.id === item.authorId)?.name || 'No Author'}
                    location={locations.find(location => location.id === item.locationId)?.location || 'No location'}
                    created={item.created}
                    imgUrl={item.imageUrl}
                />
            ))}
        </div>
    );
}

export default MyPaintings;