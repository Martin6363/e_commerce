/* eslint-disable react/prop-types */
import { Button } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useSearchParams } from "react-router-dom";

const PriceFilterComponent = ({ minPrice, maxPrice, handleFilterPrice }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [t] = useTranslation("global");
  
  const handlePriceChange = (e) => {
    const { name, value } = e.target;
  };
  
  return (
    <div className="relative grid grid-cols-2 gap-2 mb-6">
      <div>
        <label htmlFor="min-price" className="sr-only">Min price</label>
        {t("all_products.filter_component.price_component.from")}
        <input
          id="min-price"
          type="number"
          name="minPrice"
          min={minPrice}
          max={maxPrice}
          className="w-full mb-2 p-1 border rounded bg-transparent shadow-xl"
          placeholder={minPrice}
          onChange={handlePriceChange}
        />
      </div>
      <div>
        <label htmlFor="max-price" className="sr-only">Max price</label>
        {t("all_products.filter_component.price_component.to")}
        <input
          id="max-price"
          type="number"
          name="maxPrice"
          min={minPrice}
          max={maxPrice}
          placeholder={maxPrice}
          className="w-full mb-2 p-1 border rounded bg-transparent shadow-xl"
          onChange={handlePriceChange}
        />
      </div>
      <Button
        onClick={handleFilterPrice}
        sx={{ backgroundColor: "rgba(168, 85, 247, 1)", color: "#fff" }}
        variant="contained"
      >
        {t("all_products.filter_component.price_component.filter_by_price")}
      </Button>
    </div>
  );
};

export default PriceFilterComponent;
