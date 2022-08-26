import React, { useEffect, useState } from "react";
import axios from "axios";
import "./style/resetStyle.css";
import "./style/App.module.scss";
import MyHeader from "./components/header/MyHeader";
import MyPaintings from "./components/paintings/MyPaintings";
import useDebounce from "./hooks/use-debounce";
import MyWrapper from "./components/wrapper/MyWrapper";
import MyPagination from "./components/pagination/MyPagination";
import DataService from "./API/DataService";
import NormalizeField from "./helpers/NormalizeField";
import MyFilters from "./components/filters/MyFilters";

const BASE_URL = "https://test-front.framework.team/paintings?";

function App() {
  const [theme, setTheme] = useState("light");

  const [paintings, setPaintings] = useState([]);

  const [pageQty, setPageQty] = useState(0);

  const [page, setPage] = useState(1);

  const [filter, setFilter] = useState({
    query: "",
    limit: 12,
    dateStart: "",
    dateEnd: "",
    authorId: "",
    locationId: "",
  });

  const [network, setNetwork] = useState(true);
  const debouncedFilter = useDebounce(filter, 500);

  const toggleTheme = () => {
    setTheme((curr) => (curr === "light" ? "dark" : "light"));
  };

  const [authors, setAuthors] = useState([]);
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    DataService.getAll("authors")
      .then((data) => setAuthors(data))
      .catch((_) => setNetwork(false));
    DataService.getAll("locations")
      .then((data) => setLocations(NormalizeField(data)))
      .catch((_) => setNetwork(false));
  }, []);

  useEffect(() => {
    axios
      .get(BASE_URL, {
        params: {
          q: debouncedFilter.query,
          _page: page,
          _limit: debouncedFilter.limit,
          authorId:
            debouncedFilter.authorId === "" ? null : debouncedFilter.authorId,
          created_gte:
            debouncedFilter.dateStart === "" ? null : debouncedFilter.dateStart,
          created_lte:
            debouncedFilter.dateEnd === "" ? null : debouncedFilter.dateEnd,
          locationId:
            debouncedFilter.locationId === ""
              ? null
              : debouncedFilter.locationId,
        },
      })
      .then(({ data, headers }) => {
        setPaintings(data);
        setPageQty(Math.ceil(headers["x-total-count"] / debouncedFilter.limit));
        if (
          Math.ceil(headers["x-total-count"] / debouncedFilter.limit) < page
        ) {
          setPage(1);
        }
      })
      .catch((_) => setNetwork(false));
  }, [page, debouncedFilter]);

  return (
    <div className="App">
      <MyWrapper theme={theme}>
        <MyHeader theme={theme} toggleTheme={toggleTheme} />
        {!network && (
          <h1 style={{ color: "grey" }}>Network error, try later</h1>
        )}
        {network && (
          <MyFilters
            theme={theme}
            authors={authors}
            locations={locations}
            filter={filter}
            setFilter={setFilter}
          />
        )}
        {network && (
          <MyPaintings
            paintings={paintings}
            authors={authors}
            locations={locations}
            theme={theme}
          />
        )}
        {pageQty > 1 && network && (
          <MyPagination
            theme={theme}
            page={page}
            setPage={setPage}
            pageQty={pageQty}
          />
        )}
      </MyWrapper>
    </div>
  );
}

export default App;
