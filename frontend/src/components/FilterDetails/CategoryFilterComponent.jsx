/* eslint-disable react/prop-types */
import { useCallback, useState } from "react";
import { MdKeyboardArrowDown } from "react-icons/md";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Oval } from "react-loader-spinner";
import { useSearchParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

const CategoryFilterComponent = ({ categories, loadData }) => {
  const [isCategoryHide, setIsCategoryHide] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const [visibleMoreCategories, setVisibleMoreCategories] = useState(5);
  const [t] = useTranslation("global");

  const handleCategoryChange = useCallback((event) => {
    const { value, checked } = event.target;
    let currentCategories = searchParams.get("categories") || "";
  
    if (checked) {
      currentCategories = currentCategories ? `${currentCategories},${value}` : value;
    } else {
      const categoriesArray = currentCategories.split(",").filter(cat => cat !== value);
      currentCategories = categoriesArray.join(",");
    }
  
    if (currentCategories) {
      searchParams.set("categories", currentCategories);
    } else {
      searchParams.delete("categories");
    }
  
    setSearchParams(searchParams);
  }, [searchParams, setSearchParams]);
  
  
  const handleShowMoreCategories = () => {
    setVisibleMoreCategories((prevValue) => prevValue + 5);
  };

  const handleHideCategory = useCallback(() => {
    setIsCategoryHide(!isCategoryHide);
  }, [isCategoryHide]);

  const handleTruncateText = (text, maxLength) => {
    if (text.length <= maxLength) {
      return text;
    }
    return text.substring(0, maxLength) + "...";
  };

  const isCategoriesChecked = (categoryId) => {
    const currentColors = searchParams.get("categories") || "";
    const colorsArray = currentColors.split(',')    
    return colorsArray.includes(categoryId.toString());
  };

  return (
    <div className="flex flex-col">
      <h2
        className="w-full flex items-center justify-between cursor-pointer"
        style={{ fontWeight: 600 }}
        onClick={handleHideCategory}
      >
        <span className="border-b-4 border-purple-500">{t("all_products.filter_component.category_component.title")}</span>
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
        <div className={`${isCategoryHide ? "h-auto visible" : "h-[0px] hidden"}`}>
          {categories.slice(0, visibleMoreCategories).map((category, index) => (
            <li className="list-none mb-1 mt-2" key={category.id}>
              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls={`panel${category.id}-content`}
                  id={`panel${category.id}-header`}
                >
                  <div className="overflow-hidden w-[100%]">
                    <label
                      htmlFor={`category-${index}`}
                      className="cursor-pointer flex justify-between items-center gap-2"
                    >
                      {handleTruncateText(category.name, 20)}
                      <small className="text-[11px] text-gray-500">
                        {category.products_count}
                      </small>
                    </label>
                  </div>
                </AccordionSummary>
                <AccordionDetails>
                  {category.children.map((subCategory) => (
                    <div className={`checkbox-wrapper-29 overflow-hidden ml-3 mb-2`} key={subCategory.id}>
                      <input
                        id={`subCategory-${subCategory.id}`}
                        type="checkbox"
                        className="promoted-input-checkbox"
                        onChange={(e) => handleCategoryChange(e)}
                        checked={isCategoriesChecked(subCategory.id)}
                        value={subCategory.id}
                      />
                      <svg>
                        <use xlinkHref="#checkmark-28" />
                      </svg>
                      <label htmlFor={`subCategory-${subCategory.id}`} className="text-small">
                        {subCategory.name}
                        <small className="ml-5">{subCategory.products_count}</small>
                      </label>
                      <svg style={{ display: "none" }}>
                        <symbol id="checkmark-28" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeMiterlimit="10" fill="none" d="M22.9 3.7l-15.2 16.6-6.6-7.1"></path>
                        </symbol>
                      </svg>
                    </div>
                  ))}
                </AccordionDetails>
              </Accordion>
            </li>
          ))}
          <button className="btn btn-sm text-[12px] outline-none" onClick={handleShowMoreCategories}>
          {t("all_products.filter_component.show_more")}
          </button>
        </div>
      )}
    </div>
  );
};

export default CategoryFilterComponent;
