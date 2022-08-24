import React, {useEffect, useState} from "react";
import axios from 'axios'
import cn from "classnames/bind";
import './style/resetStyle.css'
import styles from './style/App.module.scss'
import MyHeader from "./components/header/MyHeader";
import MyInput from "./components/UI/input/MyInput";
import MyPaintings from "./components/paintings/MyPaintings";
const cx = cn.bind(styles);

const BASE_URL = 'https://test-front.framework.team/paintings?'

function App() {
    const [theme, setTheme] = useState("light")

    const [paintings, setPaintings] = useState([])

    const [pageQty, setPageQty] = useState(0)

    const [page, setPage] = useState(1)

    const [filter, setFilter] = useState({
        limit: 12,
        query: "",
        dateStart: null,
        dateEnd: "",
        authorId: "",
        locationId: ""
    })

    const toggleTheme = () => {
        setTheme((curr) => curr === "light" ? "dark" : "light")
    }

    useEffect(() => {
        axios.get(BASE_URL, {
            params: {
                q: filter.query,
                _page: page,
                _limit: filter.limit,
                authorId: filter.authorId === "" ? null : filter.authorId,
                created_gte: filter.dateStart === "" ? null : filter.dateStart,
                created_lte: filter.dateEnd === "" ? null : filter.dateEnd,
                locationId: filter.locationId === "" ? null : filter.locationId,
            }
        }).then(
            ({data, headers}) => {
                setPaintings(data)
                setPageQty(Math.ceil(headers['x-total-count']/filter.limit))
                console.log(pageQty)
                if (Math.ceil(headers['x-total-count']/filter.limit) < page) {
                    setPage(1)
                }
            }
        )
    }, [filter, page])

    return (<div className="App" id={theme}>
        <div className={cx("wrapper", {"wrapper__dark": theme === "dark"})}>
            <div className={cx("wrapper__container")}>
                <MyHeader theme={theme} toggleTheme={toggleTheme}/>
                <MyInput
                    theme={theme}
                    value={filter.query}
                    onChange={e => setFilter({...filter, query: e.target.value})}
                    placeholder="Name"
                />
                <MyPaintings
                    paintings={paintings}
                />
            </div>
        </div>
    </div>);
}
export default App;
