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
    const [page] = useState(1)
    const [searchQuery, setSearchQuery] = useState("")
    const [dateStart, setDateStart] = useState("")
    const [dateEnd, setDateEnd] = useState("")
    const toggleTheme = () => {
        setTheme((curr) => curr === "light" ? "dark" : "light")
    }
    useEffect(() => {
        fetchPaintings()
    })
    const  fetchPaintings= () =>  {
        try {
            setTimeout( async () => {
                const response = await axios.get('https://test-front.framework.team/paintings', {
                    params: {
                        _page: page,
                        _limit: 12,
                        q:  searchQuery,
                        authorId: null,
                        created_gte: dateStart,
                        created_lte: dateEnd,
                        locationId: null,

                    }
                })
                setPaintings(response.data)
            }, 1000)
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
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
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
