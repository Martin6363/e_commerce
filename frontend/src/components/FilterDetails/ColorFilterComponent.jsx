import { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import { MdKeyboardArrowDown } from "react-icons/md";
import { Oval } from "react-loader-spinner";
import { useSearchParams } from "react-router-dom";

const ColorFilterComponent = ({ colors, loadData }) => {
  const [isColorHide, setIsColorHide] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const [t] = useTranslation("global");
  const handleHideColor = useCallback(() => {
    setIsColorHide(prev => !prev);
  }, []);

  const handleColorChange = useCallback((e) => {
    const { value, checked } = e.target;
    let currentColors = searchParams.get("colors") || "";

    if (checked) {
      currentColors = currentColors ? `${currentColors},${value}` : value;
    } else {
      const colorsArray = currentColors.split(',').filter(color => color !== value);
      currentColors = colorsArray.join(",");
    }

    if (currentColors) {
      searchParams.set("colors", currentColors);
    } else {
      searchParams.delete("colors");
    }

    setSearchParams(searchParams);
  }, [searchParams, setSearchParams]);

  const isColorChecked = (colorId) => {
    const currentColors = searchParams.get("colors") || "";
    const colorsArray = currentColors.split(',')    
    return colorsArray.includes(colorId.toString());
  };

  return (
    <div className="color_container">
      <h2
        className="w-full mt-5 flex items-center justify-between cursor-pointer"
        style={{ fontWeight: 600 }}
        onClick={handleHideColor}
      >
        <span className="border-b-4 border-purple-500">{t("all_products.filter_component.color_component.title")}</span>
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
        <div
          className={`color-container ${
            isColorHide ? "h-auto visible" : "h-0 hidden"
          }`}
        >
          {colors?.map((color) => (
            <div key={color.id} className="project mt-2">
              <div className="boxes">
                <div className="box">
                  <div>
                    <input
                      type="checkbox"
                      onChange={(e) => handleColorChange(e)}
                      id={`box${color.id}`}
                      value={color.id}
                      checked={isColorChecked(color.id)}
                      style={{ backgroundColor: color.color }}
                    />
                  </div>
                  <label htmlFor={`box${color.id}`}></label>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ColorFilterComponent;
