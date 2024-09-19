import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import myAxios from "../api/axios";
import CardDetail from "../components/Card/CardDetail";
import Footer from "../components/footer/Footer";
import CardSize from "../components/Card/CardSize"
import "ldrs/ring";
import { useCurrency } from "../context/CurrencyContext";
import { useTranslation } from "react-i18next";

export default function SearchedResults() {
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("search_query");
  const [searchedResult, setSearchedResult] = useState([]);
  const [loadProducts, setLoadProducts] = useState(true);
  const [totalCount, setTotalCount] = useState();
  const [offset, setOffset] = useState(0);
  const [loadingMore, setLoadingMore] = useState(false);
  const [allProductsLoaded, setAllProductsLoaded] = useState(false);
  const { selectedCurrency } = useCurrency();
  const cardSize = searchParams.get("cardsize") || "small";
  const cardSizeClass = cardSize === "big" ? "xl:grid-cols-4 sm:grid-cols-1" : "xl:grid-cols-6 sm:grid-cols-2";
  const [t] = useTranslation("global");

  useEffect(() => {
    setLoadProducts(true);
    setSearchedResult([]);
    setOffset(0);
    setAllProductsLoaded(false);
    getSearchData(0, true);
  }, [searchQuery, selectedCurrency]);

  useEffect(() => {
    const handleScroll = (e) => {
      const scrollHeight = e.target.documentElement.scrollHeight;
      const currentHeight = e.target.documentElement.scrollTop + window.innerHeight;
      if (
        currentHeight + 200 >= scrollHeight &&
        !loadingMore &&
        !allProductsLoaded
      ) {
        setLoadingMore(true);
        getSearchData(offset + 20);
      }
    };
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [loadingMore, allProductsLoaded, offset, selectedCurrency]);

  function getSearchData(newOffset, isNewSearch = false) {
    myAxios
      .get(`/products?search=${searchQuery}&currency=${selectedCurrency}`)
      .then((res) => {
        setSearchedResult((prev) =>
          isNewSearch ? res.data.data : [...prev, ...res.data.data]
        );
        setTotalCount(res.data.meta.total);
        setLoadProducts(false);
        setLoadingMore(false);
        setOffset(newOffset);
        if (res.data.data.length === 0 || res.data.data.length < 10) {
          setAllProductsLoaded(true);
        }
      })
      .catch(() => {
        setLoadingMore(false);
      });
  }

  return (
    <>
      <main className="w-full">
        <div className="max-w-[1504px] mx-auto">
          <div className="flex items-center justify-between gap-2 p-3">
            <div className="flex items-center gap-2 p-3">
              <h2 className="text-[25px]">{searchQuery}</h2>
              <span className="text-gray-500 text-[12px]">
                {totalCount} {t("search.product_found")}
              </span>
            </div>
            <div>
              <CardSize cardsize={"big"}/>
            </div>
          </div>
          <section className={`w-full grid grid-cols-2 gap-x-[20px] ${cardSizeClass} lg:grid-cols-4 md:grid-cols-3 gap-y-[32px]`}>
            {loadProducts && searchedResult.length === 0 ? (
              <div
                className="w-screen flex items-center justify-center"
                style={{ minHeight: "calc(100vh - 500px)" }}
              >
                <l-ring
                  size="60"
                  stroke="6"
                  bg-opacity="0"
                  speed="1.3"
                  color="#581C87"
                ></l-ring>
              </div>
            ) : (
              searchedResult?.map((product, index) => (
                <CardDetail
                  key={`${product.id}-${index}`}
                  product={product}
                  loadingCard={loadProducts}
                />
              ))
            )}
          </section>
          {loadingMore && (
            <div className="w-full flex justify-center items-center my-7">
                <l-ring
                  size="50"
                  stroke="5"
                  bg-opacity="0"
                  speed="1.3"
                  color="#581C87"
                ></l-ring>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
