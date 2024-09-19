import { Link } from "react-router-dom";
import Header from "../header/Header";
import Search from "../header/Search";
import { MdPerson } from "react-icons/md";
import Badge from "@mui/material/Badge";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PersonIcon from "@mui/icons-material/Person";
import { grey } from "@mui/material/colors";
import { Container, useMediaQuery } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useEffect, useState } from "react";
import NavBar from "../header/navBarMenu";
import "../../assets/styles/Navigation.scss";
import { useTheme } from "@emotion/react";
import { useSelector } from "react-redux";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import { GrFavorite } from "react-icons/gr";
import myAxios from "../../api/axios";
import { useAuth } from "../../hooks/useAuth";

export const Navigation = () => {
  const theme = useTheme();
  const matches = useMediaQuery('(max-width:700px)');
  const StyledBadge = styled(Badge)(() => ({
    "& .MuiBadge-badge": {
      right: -3,
      top: 13,
      border: `2px solid dark:bg-gray-700`,
      padding: "0 4px",
      color: "dark:bg-gray-700",
    },
  }));

  const HtmlTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} classes={{ popper: className }} />
  ))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: 'transparent',
      color: "rgba(0, 0, 0, 0.87)",
      maxWidth: 250,
      fontSize: theme.typography.pxToRem(15),
    },
  }));

  const [showNavBarMenu, setShowNavBarMenu] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [categories, setCategories] = useState([]);
  const [categoryLoading, setCategoryLoading] = useState(true);
  const carts = useSelector((store) => store.cart.items);
  const { user } = useAuth();

  useEffect(() => {
    myAxios.get("/categories").then((res) => {
      setCategories(res.data.data);
      setCategoryLoading(false);
    });
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 70) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  function openMenu() {
    return setShowNavBarMenu(true);
  }
  return (
    <>
      <nav
        className={` w-50 mx-auto z-50 ${
          theme.palette.mode === "dark" ? "bg-gray-900" : "bg-purple-900"
        }`}
      >
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl p-4">
          <Link
            to="/"
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <img
              src="https://flowbite.com/docs/images/logo.svg"
              className="h-8"
              alt="Flowbite Logo"
            />
            {!matches && (
            <span className="self-center text-white text-2xl select-none font-semibold whitespace-nowrap">
              E-commerce
            </span>
            )

            }
          </Link>
          <div className="flex items-center space-x-6 rtl:space-x-reverse">
            <Link
              to="tel:5541251234"
              className="text-sm  text-gray-300 hover:underline"
            >
              (555) 412-1234
            </Link>
            <Header />
          </div>
        </div>
      </nav>
      <nav
        className={`w-50 mx-auto fixed_nav ${
          theme.palette.mode === "dark" ? "bg-purple-900" : "bg-purple-600"
        }`}
        style={{ background: 'radial-gradient(circle at 10% 20%, rgb(64, 84, 178) 0%, rgb(219, 2, 234) 90%)' }}
      >
        <div className="max-w-screen-xl px-4 py-3 mx-auto">
          <div className="flex items-center justify-between">
            <ul className="menu_root_box flex flex-row items-center font-medium mt-0 space-x-8 rtl:space-x-reverse text-sm">
              <li>
                <Container
                  sx={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <IconButton
                    onClick={openMenu}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      color: "#fff",
                    }}
                  >
                    <MenuIcon sx={{ fontSize: "30px" }} />
                  </IconButton>
                </Container>
              </li>
              <li>
                <Link
                  to="/"
                  className="font-bold hover:underline text-white"
                  aria-current="page"
                >
                  Home
                </Link>
              </li>
            </ul>
            <div className="w-full flex items-center flex-col">
              <Search />
            </div>
            <div className="basket_root_box flex items-center justify-normal gap-2">
              <Link to={'/favorite'} className="text-gray-100">
                  <IconButton>
                    <GrFavorite color="#f2f2f2"/>
                  </IconButton>
              </Link>
              <Link to={"/basket"}>
                <IconButton aria-label="cart" sx={{ color: grey[100] }}>
                  <StyledBadge
                    badgeContent={carts.length}
                    color="primary"
                    sx={{ color: grey[100] }}
                  >
                    <ShoppingCartIcon />
                  </StyledBadge>
                </IconButton>
              </Link>
              <Link to={`${!user ? '/login' : '/profile'}`}>
                <HtmlTooltip
                  title={
                    <div className="py-3 px-2.5">
                      <Link className="bg-purple-500 hover:bg-purple-700 text-white w-full font-bold py-3 px-4 rounded-full" to={`${!user ? '/login' : '/profile'}`}>{!user ? 'Login or create profile' : 'My Profile'}</Link>  
                    </div>
                  }
                >
                  <IconButton>
                    <PersonIcon sx={{ color: grey[100] }} />
                  </IconButton>
                </HtmlTooltip>
              </Link>
            </div>
          </div>
        </div>
      </nav>
      <NavBar
        categories={categories}
        showMenu={showNavBarMenu}
        isScrolled={isScrolled}
        setMenuOpen={setShowNavBarMenu}
      />
    </>
  );
};
