import { Link, useLocation } from "react-router-dom";
import { AiFillHome } from "react-icons/ai";
import { useTheme } from "@emotion/react";
import { TiThMenu } from "react-icons/ti";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import { styled } from "@mui/material/styles";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useSelector } from "react-redux";
import { blue, grey } from "@mui/material/colors";
import PersonIcon from "@mui/icons-material/Person";
import "../../assets/styles/Navbar_Mobile.scss"
import { useEffect, useState } from "react";
import UserProfileMobile from "./UserProfileMobile";
import MenuMobile from "./MenuMobile";
import myAxios from "../../api/axios";
import { MdFavoriteBorder } from "react-icons/md";
import { MdOutlineFavorite } from "react-icons/md";

export default function NavbarMobileLink() {
  const theme = useTheme();
  const location = useLocation();
  const carts = useSelector((store) => store.cart.items);
  const StyledBadge = styled(Badge)(() => ({
    "& .MuiBadge-badge": {
      right: -3,
      top: 13,
      border: `2px solid ${theme.palette.mode === "dark" ? grey[800] : grey[300]}`,
      padding: "0 4px",
      color: theme.palette.mode === "dark" ? grey[800] : grey[300],
    },
  }));
  const [categoryData, setCategoryData] = useState([]);
  const [isShowUserProfile, setIsShowUserProfile] = useState(false);
  const [isShowMenu, setIsShowMenu] = useState(false);
  const locationHref = location.pathname === "/login" ? "/login" : "/register";
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    myAxios.get('/categories').then((res) => {
      setCategoryData(res.data.data);
    })
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    }
  }, [])

  function handleShowUserProfile () {
    setIsShowUserProfile(true);
    setIsShowMenu(isShowMenu && false )
  }

  function handleShowMenu () {
    setIsShowMenu(!isShowMenu);
  }

  
  return (
    <>    
    {isShowUserProfile && (
      <UserProfileMobile isHideProfile={setIsShowUserProfile}/>
    )
    }
    {isShowMenu && (
      <MenuMobile setIsHideMobile={setIsShowMenu} categoryData={categoryData}/>
    )}
    
    <div  className={`navbar_mobile_link_cont w-full shadow-[0_35px_60px_-15px_rgba(0,0,0,0.5)] z-[999] fixed bottom-0 px-10 py-3 ${theme.palette.mode === "dark" ? 'bg-purple-950' : 'bg-purple-800'}`}>
      <ul className="flex items-center justify-center w-full">
        <li>
          <Link to="/" className="hover:underline" aria-current="page">
            <IconButton aria-label="home" sx={{ color: location.pathname === "/" ? blue[600] : grey[100] }}>
              <AiFillHome />
            </IconButton>
          </Link>
        </li>
        <li>
            <IconButton onClick={handleShowMenu} aria-label="menu" sx={{ color: isShowMenu ? blue[600] : grey[100]}}>
              <TiThMenu />
            </IconButton>
        </li>
        <li>
          <Link to={"/basket"}>
            <IconButton aria-label="cart">
              <StyledBadge badgeContent={carts.length} color="primary" sx={{ color: grey[100] }}>
                <ShoppingCartIcon sx={{ fontSize: '30px', color: location.pathname === "/basket" ? blue[600] : grey[100] }} />
              </StyledBadge>
            </IconButton>
          </Link>
        </li>
        <li>
          <Link to={`${ !isLoggedIn ? '/login' : '/favorite' }`} className="text-gray-100">
            <IconButton sx={{ fontSize: "30px", color: location.pathname === "/favorite" ? blue[600] : grey[100] }}>
              {location.pathname === "/favorite" ? (
                <MdOutlineFavorite />
              ) : (
                <MdFavoriteBorder color="#f2f2f2"/>
              )
            }
            </IconButton>
          </Link>
        </li>
        <li>
          {!isLoggedIn ? (
            <IconButton onClick={handleShowUserProfile}>
              <PersonIcon sx={{ color: location.pathname === locationHref ? blue[600] : grey[100], fontSize: '30px'}} />
            </IconButton>
          ): (
            <Link to={'/profile'}>
              <PersonIcon sx={{ color: location.pathname === '/profile' ? blue[600] : grey[100], fontSize: '30px'}} />
            </Link>            
          )
        }
        </li>
      </ul>
    </div>
    </>
  );
}
