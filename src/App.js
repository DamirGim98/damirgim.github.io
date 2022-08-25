import React, {useEffect, useState} from "react";
import axios from 'axios'
import cn from "classnames/bind";
import './style/resetStyle.css'
import styles from './style/App.module.scss'
import MyHeader from "./components/header/MyHeader";
import MyInput from "./components/UI/input/MyInput";
import MyPaintings from "./components/paintings/MyPaintings";
import useDebounce from "./hooks/use-debounce";
const cx = cn.bind(styles);

const BASE_URL = 'https://test-front.framework.team/paintings?'

function App() {
    const [theme, setTheme] = useState("light")

    const [paintings, setPaintings] = useState([])

    const [pageQty, setPageQty] = useState(0)

    const [page, setPage] = useState(1)

    const [query, setQuery] = useState("")

    const [filter, setFilter] = useState({
        limit: 12,
        dateStart: "",
        dateEnd: "",
        authorId: "",
        locationId: ""
    })

    const debouncedSearch = useDebounce(query, 500)

    const toggleTheme = () => {
        setTheme((curr) => curr === "light" ? "dark" : "light")
    }

    useEffect(() => {
        axios.get(BASE_URL, {
            params: {
                q: debouncedSearch,
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
                if (Math.ceil(headers['x-total-count']/filter.limit) < page) {
                    setPage(1)
                }
            }
        )
    }, [filter, page, debouncedSearch])

    return (<div className="App">
        <div className={cx("wrapper", {"wrapper__dark": theme === "dark"})}>
            <div className={cx("wrapper__container")}>
                <MyHeader theme={theme} toggleTheme={toggleTheme}/>
                <MyInput
                    theme={theme}
                    value={query}
                    onChange={e => setQuery(e.target.value)}
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
