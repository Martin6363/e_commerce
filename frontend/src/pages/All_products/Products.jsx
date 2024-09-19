import { useCallback, useEffect, useState } from "react";
import myAxios from "../../api/axios";
import Footer from "../../components/footer/Footer";
import "../../assets/styles/Products.scss";
import CardDetail from "../../components/Card/CardDetail";
import PaginationHome from "../../components/Pagination/PaginationHome";
import CardSize from "../../components/Card/CardSize";
import "ldrs/ring";
import FilterComponent from "./FilterComponent";
import { useSearchParams } from "react-router-dom";
import DropDownSort from "../../components/FilterDetails/DropDownSort";
import { VscSettings } from "react-icons/vsc";
import { useTheme } from "@emotion/react";
import  { useCurrency }  from "../../context/CurrencyContext";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTranslation } from "react-i18next";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [colors, setColors] = useState([]);
  const [pageCount, setPageCount] = useState(1);
  const [loadData, setLoadData] = useState(true);
  const [loadProducts, setLoadProducts] = useState(true);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const matches = useMediaQuery("(max-width:1020px)");
  const theme = useTheme();
  const minPrice = searchParams.get('minPrice');
  const maxPrice = searchParams.get('maxPrice');
  const selectedCategories = searchParams.get('categories');
  const selectedBrands = searchParams.get('brands');
  const selectedColors = searchParams.get('colors');
  const sortOption = searchParams.get('sort');
  const { selectedCurrency } = useCurrency();
  const currentPage = parseInt(searchParams.get('page')) || 1;
  const [t] = useTranslation("global");
  const cardSize = searchParams.get("cardsize") || "small";
  const cardSizeClass = cardSize === "big" ? "xl:grid-cols-4 sm:grid-cols-1" : "xl:grid-cols-6 sm:grid-cols-2";
  
  const activeFiltersCount = [
    selectedCategories ? selectedCategories.split(',').length : 0,
    selectedBrands ? selectedBrands.split(',').length : 0,
    selectedColors ? selectedColors.split(',').length : 0,
    minPrice ? 1 : 0,
    maxPrice ? 1 : 0,
  ].reduce((acc, count) => acc + count, 0);

  useEffect(() => {
    const fetchFilterData = async () => {
      try {
        setLoadData(true);
        const [categoryRes, brandsRes, colorsRes] = await Promise.all([
          myAxios.get("/categories"),
          myAxios.get("/brands"),
          myAxios.get("/attributes?colors=true")
        ]);

        setCategories(categoryRes.data.data);
        setBrands(brandsRes.data.data);
        setColors(colorsRes.data.data);
      } catch (error) {
        console.error("Error fetching filter data:", error);
      } finally {
        setLoadData(false);
      }
    };

    fetchFilterData();
  }, []);

  useEffect(() => {
    getProducts();
  }, [
    currentPage,
    selectedCategories,
    selectedBrands,
    selectedColors,
    minPrice,
    maxPrice,
    sortOption,
    selectedCurrency,
  ]);

  const handleFilterData = () => {
    getProducts();
  }

  const getProducts = async () => {
    setLoadProducts(true);
    try {
      const res = await myAxios.get("/products", {
        params: {
          page: currentPage,
          currency: selectedCurrency,
          category_id: selectedCategories,
          brand_id: selectedBrands,
          color_id: selectedColors,
          min_price: minPrice,
          max_price: maxPrice,
          sort_by: sortOption,
        },
      });
      setProducts(res.data.data);  
      setPageCount(res.data.meta);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoadProducts(false);
    }
  };

  const handlePageChange = useCallback((event, value) => {
    setSearchParams((prev) => {
      const newParams = new URLSearchParams(prev);
      newParams.set('page', value);
      
      if (selectedCategories) {
        newParams.set('categories', selectedCategories);
      }
      if (selectedBrands) {
        newParams.set('brands', selectedBrands);
      }
      if (selectedColors) {
        newParams.set('colors', selectedColors);
      }
      if (minPrice) {
        newParams.set('min_price', minPrice);
      }
      if (maxPrice) {
        newParams.set('max_price', maxPrice);
      }
      
      return newParams;
    });
  }, [selectedCategories, selectedBrands, selectedColors, minPrice, maxPrice, sortOption]);

  const handleToggleFilter = () => {
    setIsFilterOpen(!isFilterOpen);
  };

  return (
    <>
      <div className="products_container max-w-[1500px] mx-auto">
        <FilterComponent
          isFilterOpen={isFilterOpen}
          setIsFilterOpen={setIsFilterOpen}
          categories={categories}
          brands={brands}
          colors={colors}
          loadData={loadData}
          minPrice={minPrice}
          maxPrice={maxPrice}
          totalItems={pageCount.total}
          handleFilterData={handleFilterData}
        />
        <section className="left-50 root_product_result_container">
          <div className="w-[90%] mx-auto px-2 flex justify-between items-center">
            <div className="flex items-center gap-3">
              <DropDownSort/>
              <button
                className={`relative shadow-xl ${ theme.palette.mode === "dark" ? 'bg-gray-800 text-gray-100' : 'bg-gray-100 text-gray-600' } select-none focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center gap-2`}
                  onClick={handleToggleFilter}
                >
                  <VscSettings fontSize={'20'} />
                  { !matches && t("all_products.all_filters_button")}
                  {
                    activeFiltersCount !== 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center">
                      {activeFiltersCount}
                    </span>
                    )
                  }
              </button>
            </div>
            <CardSize />
          </div>
          <div className="product_result_container">
            {loadProducts ? (
              <div
                className="w-full flex items-center justify-center"
                style={{ minHeight: "calc(100vh - 145px)" }}
              >
                <l-ring
                  size="70"
                  stroke="6"
                  bg-opacity="0"
                  speed="1.3"
                  color="#581C87"
                ></l-ring>
              </div>
            ) : products.length === 0 ? (
              <div
                className="flex items-center justify-center min-h-screen"
                style={{ width: "100%" }}
              >
                <strong>No result</strong>
              </div>
            ) : (
              <div className={`grid grid-cols-2 gap-x-[20px] ${cardSizeClass} lg:grid-cols-4 md:grid-cols-3 gap-y-[32px]`}>
                {products.map((product) => (
                  <CardDetail key={product.id} product={product} loadingCard={loadProducts} />
                ))}
              </div>
            )}
          </div>
        </section>
      </div>
      <PaginationHome
        currentPage={currentPage}
        pageCount={pageCount.last_page}
        onPageChange={handlePageChange}
      />
      <Footer />
    </>
  );
}
