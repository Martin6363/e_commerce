import { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import { MdKeyboardArrowDown } from "react-icons/md";
import { Oval } from "react-loader-spinner";
import { useSearchParams } from "react-router-dom";

const BrandFilterComponent = ({ brands, loadData }) => {
  const [isBrandHide, setIsBrandHide] = useState(true);
  const [visibleMoreBrands, setVisibleMoreBrands] = useState(5);
  const [searchParams, setSearchParams] = useSearchParams();
  const [t] = useTranslation("global");

  const handleShowMoreBrands = () => {
    setVisibleMoreBrands((prevValue) => prevValue + 5);
  };

  const handleHideBrand = useCallback(() => {
    setIsBrandHide(!isBrandHide);
  }, [isBrandHide]);

  const handleBrandChange = (e) => {
    const { value, checked } = e.target;
    const currentBrands = searchParams.get("brands")?.split(",") ?? [];
    let updateBrands = [...currentBrands];

    if (checked) {
      updateBrands.push(value);
    } else {
      updateBrands = updateBrands.filter(color => color !== value);
    }

    if (updateBrands.length > 0) {
      searchParams.set("brands", updateBrands.join(","));
    } else {
      searchParams.delete("brands")
    }

    setSearchParams(searchParams);
  }

  const isBrandChecked = (brandId) => {
    const currentColors = searchParams.get("brands") || "";
    const colorsArray = currentColors.split(',')    
    return colorsArray.includes(brandId.toString());
  };

  return (
    <div className="brand_container flex flex-col gap-3">
      <h2
        className="w-full mt-5 flex items-center justify-between cursor-pointer"
        style={{ fontWeight: 600 }}
        onClick={handleHideBrand}
      >
        <span className="border-b-4 border-purple-500">{t("all_products.filter_component.brand_component.title")}</span>
        <span className="text-xl">
          <MdKeyboardArrowDown />
        </span>
      </h2>
      {loadData ? (
        <div className="w-full flex justify-center">
          <Oval
            visible={true}
            height="20"
            width="20"
            color="#0041C2"
            ariaLabel="oval-loading"
            wrapperStyle={{}}
            wrapperClass=""
          />
        </div>
      ) : (
        <div className={`flex flex-col gap-[6px] ${isBrandHide ? "h-auto visible" : "h-0 hidden"}`}>
          {brands.slice(0, visibleMoreBrands).map((brand, index) => (
            <li className={`checkbox-wrapper-28 overflow-hidden`} key={brand.id}>
              <input
                id={`brand-${index}`}
                type="checkbox"
                className="promoted-input-checkbox"
                onChange={(e) => handleBrandChange(e)}
                checked={isBrandChecked(brand.id)}
                value={brand.id}
              />
              <svg>
                <use xlinkHref="#checkmark-28" />
              </svg>
              <label htmlFor={`brand-${index}`}>{brand.b_name}</label>
              <svg style={{ display: "none" }}>
                <symbol id="checkmark-28" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeMiterlimit="10" fill="none" d="M22.9 3.7l-15.2 16.6-6.6-7.1"></path>
                </symbol>
              </svg>
            </li>
          ))}
          <button className="btn btn-sm text-[12px] outline-none" onClick={handleShowMoreBrands}>
          {t("all_products.filter_component.show_more")}
          </button>
        </div>
      )}
    </div>
  );
};

export default BrandFilterComponent;
