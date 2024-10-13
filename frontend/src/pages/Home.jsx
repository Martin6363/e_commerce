import SliderSwiper from "../components/HomeDetails/SliderSwiper/SliderSwiper";
import Header2 from "../components/header/Header2";
import CardDetail from "../components/Card/CardDetail";
import { useEffect, useRef, useState } from "react";
import myAxios from "../api/axios";
import "../assets/styles/Home.scss";
import PaginationHome from "../components/Pagination/PaginationHome";
import "ldrs/ring";
import { useSearchParams } from "react-router-dom";
import { useCurrency } from "../context/CurrencyContext";
import HeaderBottomContents from "../components/header/HeaderBottomContents";
import SpinnerLoader from "../components/SpinnerLoader/SpinnerLoader";

const cache = {};

const Home = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const currentPage = parseInt(searchParams.get("page")) || 1;
  const [pageCount, setPageCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const productCardContainerRef = useRef(null);
  const { selectedCurrency } = useCurrency();
  const cardSize = searchParams.get("cardsize") || "small";

  useEffect(() => {
    setLoading(true);
    const fetchProducts = async () => {
      if (cache[`${currentPage}-${selectedCurrency}`]) {
        setProducts(cache[`${currentPage}-${selectedCurrency}`].data);
        setPageCount(cache[`${currentPage}-${selectedCurrency}`].meta.last_page);
        setLoading(false);
        return;
      }
      try {
        const response = await myAxios.get(
          `/products?page=${currentPage}&currency=${selectedCurrency}`
        );
        cache[`${currentPage}-${selectedCurrency}`] = response.data;
        setProducts(response.data.data);
        setPageCount(response.data.meta.last_page);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };
    fetchProducts()
  }, [currentPage, selectedCurrency]);

  useEffect(() => {
    if (productCardContainerRef.current) {
      window.scrollTo({
        top:
          productCardContainerRef.current.getBoundingClientRect().top +
          window.pageYOffset -
          100,
        behavior: "smooth",
      });
    }
  }, [currentPage]);


  const handlePageChange = (event, value) => {
    setSearchParams({ page: value });
  };

  if (loading) {
    return (
      <SpinnerLoader/>
    );
  }

  return (
    <div className="max-w-[1504px] lg:px-[25px] xl:px-[32px] mx-auto ">
      <Header2 />
      {currentPage === 1 && (
        <div className="mx-auto flex items-center justify-center mt-2">
          <SliderSwiper />
        </div>
      )}
      <HeaderBottomContents/>
      <div className="w-full flex items-center justify-center mx-auto mt-5">
        <main
          ref={productCardContainerRef}
          className={`grid grid-cols-2 lg:gap-x-[20px] sm:gap-0 ${cardSize === "big" ? "xl:grid-cols-4 sm:grid-cols-1" : "xl:grid-cols-6 sm:grid-cols-2"} lg:grid-cols-4 md:grid-cols-3 gap-y-[32px]`}
        >
          {products.map((product) => (
            <CardDetail
              key={product.id}
              product={product}
              loadingCard={loading}
            />
          ))}
        </main>
      </div>
      <PaginationHome
        currentPage={currentPage}
        pageCount={pageCount}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default Home;
