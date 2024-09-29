/* eslint-disable react/prop-types */
import { IoClose } from "react-icons/io5";
import { IconButton } from "@mui/material";
import { useTheme } from "@emotion/react";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useSearchParams } from "react-router-dom";
import "../../assets/styles/Products.scss";
import PriceFilterComponent from "../../components/FilterDetails/PriceFilterComponent";
import CategoryFilterComponent from "../../components/FilterDetails/CategoryFilterComponent";
import BrandFilterComponent from "../../components/FilterDetails/BrandFilterComponent";
import ColorFilterComponent from "../../components/FilterDetails/ColorFilterComponent";
import { useTranslation } from "react-i18next";

const FilterComponent = ({
  isFilterOpen,
  setIsFilterOpen,
  categories,
  brands,
  colors,
  loadData,
  minPrice,
  maxPrice,
  totalItems,
  // handleFilterData,
}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const matches = useMediaQuery("(max-width:1020px)");
  const theme = useTheme();
  const [t] = useTranslation("global");

  const handleToggleFilter = () => {
    setIsFilterOpen(!isFilterOpen);
  };

  const handleFilterPrice = () => {
    setIsFilterOpen(false);
  };

  const handleResetFilters = () => {
    searchParams.delete("minPrice");
    searchParams.delete("maxPrice");
    searchParams.delete("brands");
    searchParams.delete("categories");
    searchParams.delete("colors");
    searchParams.delete("page");
    setSearchParams(searchParams);

    setIsFilterOpen(false);
  };

  return (
    <>
      {isFilterOpen && (
        <div
          onClick={handleToggleFilter}
          className="fixed top-0 left-0 z-[1001] w-full min-h-screen bg-black bg-opacity-40"
        ></div>
      )}
      <aside
        className={`${ matches ? "w-screen pb-[50px]" : "w-[400px]"}
          filter_container fixed top-[0] right-0 h-full z-[1002] overflow-y-auto transform transition-transform duration-300 ease-in-out ${
          !isFilterOpen ? "translate-x-[100%]" : " translate-x-[0%]"
        } ${theme.palette.mode === "dark" ? "bg-[#0d1320]" : "bg-gray-200"}`}
      >
        <div className="relative">
          <div className={`sticky z-[200] shadow-sm top-0 px-5 py-2 flex items-center justify-between ${theme.palette.mode === "dark" ? "bg-[#0d1320]" : "bg-gray-200"}`}>
            <h2 className="font-bold text-[25px] mb-2">
              {t("all_products.filter_component.title")}{" "}
              <span className="text-[12px] text-gray-600">
              {t("all_products.filter_component.found")} {totalItems} {t("all_products.filter_component.products")}
              </span>
            </h2>
            <IconButton sx={{ fontSize: 30 }} onClick={() => setIsFilterOpen(false)}>
              <IoClose />
            </IconButton>
          </div>
          <button className={`text-[13px] ms-5 ${theme.palette.mode === "dark" ? "text-gray-100" : "text-gray-700"}`} onClick={handleResetFilters}>
            {t("all_products.filter_component.reset_products")}
          </button>
          <div className="p-5">
            <PriceFilterComponent
              minPrice={minPrice}
              maxPrice={maxPrice}
              handleFilterPrice={handleFilterPrice}
            />
            <CategoryFilterComponent
              categories={categories}
              loadData={loadData}
            />
            <BrandFilterComponent brands={brands} loadData={loadData} />
            <ColorFilterComponent colors={colors} loadData={loadData} />
          </div>
        </div>
      </aside>
    </>
  );
};

export default FilterComponent;
