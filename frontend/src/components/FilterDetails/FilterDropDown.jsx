import { useTheme } from "@emotion/react";
import { useCallback, useEffect, useRef, useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { useSearchParams } from "react-router-dom";

function FilterDropDown({ filterData }) {
    const [searchParams, setSearchParams] = useSearchParams();
    const [openDropDown, setOpenDropDown] = useState(false);
    const dropDownRef = useRef(null);
    const theme = useTheme();
    // const sort = searchParams.get('sort');

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

  return (
    <div>
      <div className="relative" ref={dropDownRef}>
        <button
          data-dropdown-toggle="dropdownDefaultRadio"
          className={`shadow-xl ${
            theme.palette.mode === "dark"
              ? "bg-gray-800 text-gray-100"
              : "bg-gray-100 text-gray-600"
          } select-none focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center gap-2`}
          type="button"
          onClick={(e) => handleToggleDropDown(e)}
        >
          {filterData && filterData.name}
          <span
            className={`transition duration-300 ease-in-out ${
              openDropDown && "rotate-180"
            }`}
          >
            <IoIosArrowDown fontSize={"16"} />
          </span>
        </button>

        <div
          className={`z-[850] absolute shadow-xl left-0 bottom-0 translate-y-[110%] ${
            theme.palette.mode === "dark"
              ? "bg-gray-800 text-gray-100"
              : "bg-gray-100 text-gray-900"
          } ${
            !openDropDown && "hidden"
          } divide-y divide-gray-100 rounded-lg shadow`}
        >
          <ul
            className="p-3 space-y-3 text-sm min-w-[100px]"
            aria-labelledby="dropdownRadioButton"
          >
            {filterData.items?.map((item) => (
              <li key={item.id}>
                <div className="flex items-center">
                  <input
                    id={`filter-item-${item.id}`}
                    type="radio"
                    value="lowest_price"
                    name="sort_option"
                    className="w-5 h-5 cursor-pointer accent-purple-500 select-none"
                  />
                  <label htmlFor={`filter-item-${item.id}`} className="ms-2 cursor-pointer text-[15px] font-medium select-none">
                    {item.value}
                  </label>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default FilterDropDown;
