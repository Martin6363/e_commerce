import { Route, Routes } from "react-router-dom";
import { Navigation } from "./components/navigation/Navigation";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import { Outlet } from "react-router-dom";
import ScrollToTop from "./components/scroll/ScrollToTop";
import Products from "./pages/All_products/Products";
import SearchedResults from "./pages/SearchedResults";
import Basket from "./pages/Basket/Basket";
import NavbarMobileLink from "./components/Navbar_Mobile/NavbarMobileLink";
import Profile from "./pages/Profile/Profile";
import Favorite from "./pages/Favorite/Favorite";
import ProtectedRoute from "./components/ProtectedRoute/ProtectesRoute";
import Category from "./pages/Category/Category";
import ProductDetail from "./pages/ProductDetail/ProductDetail";
import Promotions from "./pages/Promotions/Promotions";
import AllPromotions from "./pages/Promotions/AllPromotions";
import AllCategories from "./pages/Category/AllCategories";
import PageNotFound from "./pages/PageNotFound/PageNotFound";
import Footer from "./components/footer/Footer";

function App() {
  const [theme, colorMode] = useMode();
  return (
    <>
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <div className="App min-h-screen">
            <Navigation />
            <CssBaseline />
            <ScrollToTop />
            <NavbarMobileLink />
            <main className="mx-auto">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/product/:slug/:id" element={<ProductDetail />} />
                <Route path="/products" element={<Products />} />
                <Route path="/search" element={<SearchedResults />} />
                <Route path="/basket" element={<Basket />} />
                <Route path="/category/:catSlug/:catId" element={<Category/>}/>
                <Route path="/promotions/:slug/:id" element={<Promotions/>}/>
                <Route path="/promotions" element={<AllPromotions/>}/>
                <Route path="/categories" element={<AllCategories/>}/>
                <Route
                  path="/profile"
                  element={
                    <ProtectedRoute>
                      <Profile />
                    </ProtectedRoute>
                  }
                />
                <Route path="/favorite" element={
                  <ProtectedRoute>
                    <Favorite />
                  </ProtectedRoute>
                } />
                <Route path="*" element={<PageNotFound/>}/>
              </Routes>
            </main>
            <Footer />
            <Outlet />
          </div>
        </ThemeProvider>
      </ColorModeContext.Provider>
    </>
  );
}

export default App;
