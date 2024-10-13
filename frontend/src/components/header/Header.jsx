import { useContext } from "react";
import { ColorModeContext } from "../../theme";
import { IconButton, useTheme } from "@mui/material";
import { DarkModeOutlined, LightModeOutlined } from "@mui/icons-material";
import "../../assets/styles/Header.scss"
import ExchangePrice from "../ExchangePrice/ExchangePrice";
import LanguageDropDown from "../LanguageDropDown/LanguageDropDown";


const Header = () => {
  const colorMode = useContext(ColorModeContext);
  const theme = useTheme();

  return (
    <>
      <div className="flex items-center gap-2">
        <ExchangePrice/>
        <LanguageDropDown/>
        {theme.palette.mode === "light" ? (
          <IconButton
            onClick={() => {
              localStorage.setItem(
                "mode",
                theme.palette.mode === "dark" ? "light" : "dark"
              );
              colorMode.toggleColorMode();
            }}
            color="secondary"
          >
            <LightModeOutlined />
          </IconButton>
        ) : (
          <IconButton
            onClick={() => {
              localStorage.setItem(
                "mode",
                theme.palette.mode === "dark" ? "light" : "dark"
              );
              colorMode.toggleColorMode();
            }}
            color="inherit"
          >
            <DarkModeOutlined />
          </IconButton>
        )}
      </div>
    </>
  );
};

export default Header;
