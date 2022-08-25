import React, {useEffect, useState} from "react";
import axios from 'axios'
import './style/resetStyle.css'
import './style/App.module.scss'
import MyHeader from "./components/header/MyHeader";
import MyInput from "./components/UI/input/MyInput";
import MyPaintings from "./components/paintings/MyPaintings";
import useDebounce from "./hooks/use-debounce";
import MyWrapper from "./components/wrapper/MyWrapper";
import MyPagination from "./components/pagination/MyPagination";
import MyDropDown from "./components/dropdown/MyDropDown";
import AuthorService from "./API/AuthorService";
import LocationService from "./API/LocationService";


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
                setPageQty(Math.ceil(headers['x-total-count'] / filter.limit))
                if (Math.ceil(headers['x-total-count'] / filter.limit) < page) {
                    setPage(1)
                }
            }
        )
    }, [filter, page, debouncedSearch])

    return (<div className="App">
        <MyWrapper
            theme={theme}
        >
            <MyHeader theme={theme} toggleTheme={toggleTheme}/>
            <div style={{display: "flex"}}>
                <MyInput
                    theme={theme}
                    value={query}
                    onChange={e => setQuery(e.target.value)}
                    placeholder="Name"
                />
                <MyDropDown
                    theme={theme}
                    items={authors}
                    filter={filter}
                    setFilter={setFilter}
                    searchName={"Author"}
                />
            </div>
            <MyPaintings
                paintings={paintings}
                authors={authors}
                locations={locations}
            />
            <MyPagination
                theme={theme}
                page={page}
                setPage={setPage}
                pageQty={pageQty}
            />
        </MyWrapper>
    </div>);
}
export default App;
