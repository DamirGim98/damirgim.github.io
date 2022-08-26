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

  const [query, setQuery] = useState("");

  const [filter, setFilter] = useState({
    limit: 12,
    dateStart: "",
    dateEnd: "",
    authorId: "",
    locationId: "",
  });

  const debouncedSearch = useDebounce(query, 500);

  const toggleTheme = () => {
    setTheme((curr) => (curr === "light" ? "dark" : "light"));
  };

  const [authors, setAuthors] = useState([]);
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    DataService.getAll("authors").then((data) => setAuthors(data));
    DataService.getAll("locations").then((data) =>
      setLocations(NormalizeField(data))
    );
  }, []);

  useEffect(() => {
    axios
      .get(BASE_URL, {
        params: {
          q: debouncedSearch,
          _page: page,
          _limit: filter.limit,
          authorId: filter.authorId === "" ? null : filter.authorId,
          created_gte: filter.dateStart === "" ? null : filter.dateStart,
          created_lte: filter.dateEnd === "" ? null : filter.dateEnd,
          locationId: filter.locationId === "" ? null : filter.locationId,
        },
      })
      .then(({ data, headers }) => {
        setPaintings(data);
        setPageQty(Math.ceil(headers["x-total-count"] / filter.limit));
        if (Math.ceil(headers["x-total-count"] / filter.limit) < page) {
          setPage(1);
        }
      });
  }, [filter, page, debouncedSearch]);

  return (
    <div className="App">
      <MyWrapper theme={theme}>
        <MyHeader theme={theme} toggleTheme={toggleTheme} />
        <MyFilters
          theme={theme}
          authors={authors}
          locations={locations}
          filter={filter}
          setFilter={setFilter}
          query={query}
          setQuery={setQuery}
        />
        <MyPaintings
          paintings={paintings}
          authors={authors}
          locations={locations}
        />
        {pageQty > 1 && (
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
