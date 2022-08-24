import React, {useEffect, useState} from "react";
import axios from 'axios'
import cn from "classnames/bind";
import './style/resetStyle.css'
import styles from './style/App.module.scss'
import MyHeader from "./components/header/MyHeader";
import MyInput from "./components/UI/input/MyInput";
import MyPaintings from "./components/paintings/MyPaintings";

const cx = cn.bind(styles);

function App() {
    const [theme, setTheme] = useState("light")
    const [paintings, setPaintings] = useState([])

    const [filter, setFilter] = useState({
        page: 1,
        query: "",
        dateStart: "",
        dateEnd: "",
        authorId: "",
        locationId: ""
    })

    const toggleTheme = () => {
        setTheme((curr) => curr === "light" ? "dark" : "light")
    }

    useEffect(() => {
        fetchPaintings()
    })

    async function fetchPaintings() {
        try {
            const response = await axios.get('https://test-front.framework.team/paintings', {
                params: {
                    _page: 1,
                    _limit: 12,
                    q: filter.query,
                    authorId: null,
                    created_gte: null,
                    created_lte: null,
                    locationId: null,
                }
            })
            setPaintings(response.data)
        } catch (e) {
            alert('Что-то пошло не так...')
        }
    }

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
