import { useEffect, useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import myAxios from "../../api/axios";
import CardDetail from "../../components/Card/CardDetail";
import CardSize from "../../components/Card/CardSize";
import Footer from "../../components/footer/Footer";
import { Link, useNavigate } from "react-router-dom";
import { useCurrency } from "../../context/CurrencyContext";
import { useTranslation } from "react-i18next";

export default function Favorite() {
  const { user } = useAuth();
  const [favorites, setFavorites] = useState([]);
  const [totalFavorites, setTotalFavorites] = useState(0);
  const [loadProducts, setLoadProducts] = useState(true);
  const { selectedCurrency } = useCurrency();
  const [t] = useTranslation("global");
  const navigate = useNavigate();

  useEffect(() => {
    setLoadProducts(true);
    if (user) {
      fetchFavorites();
    } else {
      navigate("/login");
    }
  }, [user, selectedCurrency]);

  const fetchFavorites = async () => {
    try {
      const response = await myAxios.get(
        `/favorite?currency=${selectedCurrency}`
      );
      const fetchedFavorites = response.data.data;
      setFavorites(fetchedFavorites);
      setTotalFavorites(response.data.total_favorites);
      setLoadProducts(false);
    } catch (error) {
      console.error("Error fetching favorites:", error);
    } finally {
      setLoadProducts(false);
    }
  };

  if (loadProducts) {
    return (
      <div
        className="w-full flex items-center justify-center"
        style={{ minHeight: "calc(100vh - 140px)" }}
      >
        <l-ring
          size="60"
          stroke="6"
          bg-opacity="0"
          speed="1.3"
          color="#581C87"
        ></l-ring>
      </div>
    );
  }

  return (
    <>
      {!loadProducts ? (
        <>
          {favorites.length < 1 ? (
            <div
              className="w-full  flex flex-col items-center justify-center"
              style={{ minHeight: "calc(100vh - 142px)" }}
            >
              <div className="flex flex-col justify-center items-center w-[55%]">
                <h2>{t("favorite.empty_favorite")}</h2>
                <p className="text-gray-500 text-center">
                  {t("favorite.to_home_page_select_products")}
                </p>
                <Link
                  to={"/"}
                  className="bg-purple-500 hover:bg-purple-700 mt-5 text-white font-bold py-2 px-4 rounded-full"
                >
                  {t("favorite.go_to_main_page")}
                </Link>
              </div>
            </div>
          ) : (
            <div className="max-w-[1540px] mx-auto">
              <div className="flex items-center justify-between gap-2 p-3">
                <div className="flex items-center gap-2 p-3">
                  <h2 className="text-[25px]">{t("favorite.total")}</h2>
                  <span className="text-gray-500 text-[25px]">
                    ({totalFavorites})
                  </span>
                </div>
                <div>
                  <CardSize cardsize={"big"} />
                </div>
              </div>
              <section className="max-w-[1540px] flex flex-row flex-wrap gap-3 mx-auto items-center justify-center">
                {favorites.map((favorite, index) => (
                  <CardDetail
                    key={`${favorite.id}-${index}`}
                    product={favorite.product}
                    loadingCard={false}
                    isFavorite={true}
                  />
                ))}
              </section>
            </div>
          )}
          <Footer />
        </>
      ) : (
        <div
          className="w-full flex items-center justify-center"
          style={{ minHeight: "calc(100vh - 140px)" }}
        >
          <l-ring
            size="60"
            stroke="6"
            bg-opacity="0"
            speed="1.3"
            color="#581C87"
          ></l-ring>
        </div>
      )}
    </>
  );
}
