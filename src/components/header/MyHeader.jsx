import React from "react";
import { ReactComponent as Logo } from "./images/logo.svg";
import { ReactComponent as BulbSwitchLight } from "./images/bulb_light.svg";
import { ReactComponent as BulbSwitchDark } from "./images/bulb_dark.svg";
import classes from "./MyHeader.module.scss";
export const MyHeader = ({ theme, toggleTheme }) => {
  return (
    <div className={classes.header}>
      <Logo className={classes.header__logo} />
      <div className={classes.header__switch}>
        {theme === "dark" ? (
          <BulbSwitchLight onClick={toggleTheme} />
        ) : (
          <BulbSwitchDark onClick={toggleTheme} />
        )}
      </div>
    </div>
  );
};
