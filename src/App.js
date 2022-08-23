import React, {useState} from "react";
import cn from "classnames/bind";
import './style/resetStyle.css'
import styles from './style/App.module.scss'
import MyHeader from "./components/header/MyHeader";

const cx = cn.bind(styles);

function App() {
    const [theme, setTheme] = useState("light")
    const toggleTheme = () => {
        setTheme((curr) => curr === "light" ? "dark" : "light")
    }
    return (
        <div className="App" id={theme}>
            <div className={cx("wrapper", { "wrapper--dark": theme === "dark" })}>
                <div className={cx("wrapper__container")}>
                    <MyHeader theme={theme} toggleTheme={toggleTheme}/>
                </div>
            </div>
        </div>
    );
}

export default App;
