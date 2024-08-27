import { useCallback, useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { TbArrowsSort } from "react-icons/tb";
import { IoIosArrowDown } from "react-icons/io";
import { useTheme } from "@emotion/react";
import { useTranslation } from "react-i18next";

export default function DropDownSort() {
    const [searchParams, setSearchParams] = useSearchParams();
    const [openDropDown, setOpenDropDown] = useState(false);
    const dropDownRef = useRef(null);
    const theme = useTheme();
    const sort = searchParams.get('sort');
    const [t] = useTranslation("global");

    const handleSortChange = useCallback((event) => {
      const { value } = event.target;
      searchParams.set('sort', value);
      setSearchParams(searchParams);
      setOpenDropDown(false);
  }, [searchParams, setSearchParams]);

    function handleToggleDropDown () {
      setOpenDropDown(!openDropDown);
    }

    const handleClickOutside = useCallback((event) => {
      if (dropDownRef.current && !dropDownRef.current.contains(event.target)) {
          setOpenDropDown(false);
      }
    }, []);

    useEffect(() => {
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
          document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [handleClickOutside]);

    function handleResetSorting () {
      searchParams.delete('sort');
      setSearchParams(searchParams);
      setOpenDropDown(false);
    }

    const getSortLabel = () => {
      switch (sort) {
          case 'lowest_price':
              return t("all_products.sort.lowest_price");
          case 'highest_price':
              return t("all_products.sort.highest_price");
          case 'rating':
              return t("all_products.sort.rating");
          default:
              return t("all_products.sort.sort_by");
      }
  };

  return (
    <div className="relative" ref={dropDownRef}>
      <button
        data-dropdown-toggle="dropdownDefaultRadio"
        className={`shadow-xl ${ theme.palette.mode === "dark" ? 'bg-gray-800 text-gray-100' : 'bg-gray-100 text-gray-600' } select-none focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center gap-2`}
        type="button"
        onClick={(e) => handleToggleDropDown(e)}
      >
        <TbArrowsSort fontSize={'20'}/>
        { getSortLabel() }
        <span className={`transition duration-300 ease-in-out ${ openDropDown && 'rotate-180' }`}>
          <IoIosArrowDown fontSize={'16'}/>
        </span>
      </button>

      <div  
        className={`z-[850] absolute shadow-xl left-0 bottom-0 translate-y-[110%] ${ theme.palette.mode === "dark" ? 'bg-gray-800 text-gray-100' : 'bg-gray-100 text-gray-900' } ${ !openDropDown && "hidden" } w-60 divide-y divide-gray-100 rounded-lg shadow`}
      >
        <ul
          className="p-3 space-y-3 text-sm"
          aria-labelledby="dropdownRadioButton"
        >
          {
            sort && ( <button className="text-gray-400 hover:text-gray-500 transition duration-300"  onClick={handleResetSorting}>{t("all_products.sort.reset")}</button> ) 
          }
        <li>
            <div className="flex items-center">
              <input
                id="sort-lowest-price"
                type="radio"
                value="lowest_price"
                name="sort_option"
                className="w-5 h-5 cursor-pointer accent-purple-500 select-none"
                onChange={handleSortChange}
                checked={sort === 'lowest_price'}
              />
              <label
                htmlFor="sort-lowest-price"
                className="ms-2 cursor-pointer text-[15px] font-medium select-none"
              >
                {t("all_products.sort.lowest_price")}
              </label>
            </div>
          </li>
          <li>
            <div className="flex items-center">
              <input
                id="sort-highest-price"
                type="radio"
                value="highest_price"
                name="sort_option"
                className="w-5 h-5 cursor-pointer accent-purple-500 select-none"
                onChange={handleSortChange}
                checked={sort === 'highest_price'}
              />
              <label
                htmlFor="sort-highest-price"
                className="ms-2 cursor-pointer text-[15px] font-medium select-none"
              >
                {t("all_products.sort.highest_price")}
              </label>
            </div>
          </li>
          <li>
            <div className="flex items-center">
              <input
                id="sort-rating"
                type="radio"
                value="rating"
                name="sort_option"
                className="w-5 h-5 cursor-pointer accent-purple-500 select-none"
                onChange={handleSortChange}
                checked={sort === 'rating'}
              />
              <label
                htmlFor="sort-rating"
                className="ms-2 cursor-pointer text-[15px] font-medium select-none"
              >
                {t("all_products.sort.rating")}
              </label>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
}
