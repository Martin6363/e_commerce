import SliderSwiper from "../components/HomeDetails/SliderSwiper/SliderSwiper";
import Header2 from "../components/header/Header2";
import CardDetail from "../components/Card/CardDetail";
import { useEffect, useRef, useState } from "react";
import myAxios from "../api/axios";
import "../assets/styles/Home.scss";
import PaginationHome from "../components/Pagination/PaginationHome";
import Footer from "../components/footer/Footer";
import "ldrs/ring";
import { useSearchParams } from "react-router-dom";
import { useCurrency } from "../context/CurrencyContext";

const cache = {};

const Home = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const currentPage = parseInt(searchParams.get('page')) || 1;
  const [pageCount, setPageCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const productCardContainerRef = useRef(null);
  const { selectedCurrency } = useCurrency();

  useEffect(() => {
    setLoading(true);
    fetchProducts();
  }, [currentPage, selectedCurrency]);

  useEffect(() => {
    if (productCardContainerRef.current) {
      window.scrollTo({
        top:
          productCardContainerRef.current.getBoundingClientRect().top +
          window.pageYOffset - 100,
          behavior: "smooth",
      });
    }
  }, [currentPage]);

  const fetchProducts = async () => {
    if (cache[`${currentPage}-${selectedCurrency}`]) {
      setProducts(cache[`${currentPage}-${selectedCurrency}`].data);
      setPageCount(cache[`${currentPage}-${selectedCurrency}`].meta.last_page);
      setLoading(false);
      return;
    }
    try {
      const response = await myAxios.get(`/products?page=${currentPage}&currency=${selectedCurrency}`);
      cache[`${currentPage}-${selectedCurrency}`] = response.data;
      setProducts(response.data.data);      
      setPageCount(response.data.meta.last_page);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  const handlePageChange = (event, value) => {
    setSearchParams({page: value});
  };

  if (loading) {
    return (
      <div className="homeSpinner">
        <l-ring
          size="70"
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
      <Header2 />
      {currentPage === 1 && (
        <div className="max-w-[1440px] px-3 mx-auto flex items-center justify-center mt-2">
          <SliderSwiper />
        </div>
      )}
      <main
        ref={productCardContainerRef}
        className="product_card_container mt-10 justify-around max-w-[1440px] flex flex-row flex-wrap gap-3 mx-auto items-center"
      >
        {products.map((product) => (
          <CardDetail
            key={product.id}
            product={product}
            loadingCard={loading}
          />
        ))}
      </main>
      <PaginationHome
        currentPage={currentPage}
        pageCount={pageCount}
        onPageChange={handlePageChange}
      />
      <Footer />
    </>
  );
};

export default Home;
