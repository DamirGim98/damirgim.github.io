import React, { useEffect, useState } from "react";
import "./style/resetStyle.css";
import "./style/App.module.scss";
import { MyHeader } from "./components/header/MyHeader";
import { MyPaintings } from "./components/paintings/MyPaintings";
import { useDebounce } from "./hooks/use-debounce";
import { MyWrapper } from "./components/wrapper/MyWrapper";
import { MyPagination } from "./components/pagination/MyPagination";
import { NormalizeField } from "./helpers/NormalizeField";
import { MyFilters } from "./components/filters/MyFilters";
import { fetchAllData } from "./helpers/fetchAllData";
import { fetchAllPaintings } from "./API/fetchAllPaintings";

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

  const [error, setError] = useState(false);
  const debouncedFilter = useDebounce(filter, 500);

  const toggleTheme = () => {
    setTheme((curr) => (curr === "light" ? "dark" : "light"));
  };

  const [authors, setAuthors] = useState([]);
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    fetchAllData()
      .then((data) => {
        setAuthors(data.authors);
        setLocations(NormalizeField(data.locations));
      })
      .catch(() => setError(true));
  }, []);

  useEffect(() => {
    fetchAllPaintings(debouncedFilter, page)
      .then(({ data, headers }) => {
        const amountOfPages = Math.ceil(
          headers["x-total-count"] / debouncedFilter.limit
        );
        setPaintings(data);
        setPageQty(amountOfPages);
        if (amountOfPages < page) {
          setPage(1);
        }
      })
      .catch(() => setError(true));
  }, [page, debouncedFilter]);

  return (
    <div className="App">
      <MyWrapper theme={theme}>
        <MyHeader theme={theme} toggleTheme={toggleTheme} />
        {error ? (
          <h1>Network error, try later</h1>
        ) : (
          <>
            <MyFilters
              theme={theme}
              authors={authors}
              locations={locations}
              filter={filter}
              setFilter={setFilter}
            />
            <MyPaintings
              paintings={paintings}
              authors={authors}
              locations={locations}
              theme={theme}
            />
          </>
        )}
        {pageQty > 1 && !error && (
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
