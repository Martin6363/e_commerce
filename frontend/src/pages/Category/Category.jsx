import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import myAxios from "../../api/axios";
import "ldrs/ring";
import CardDetail from "../../components/Card/CardDetail";
import Breadcrumbs from "../../components/Breadcrumbs/Breadcrumbs";
import CardSize from "../../components/Card/CardSize";
import SpinnerLoader from "../../components/SpinnerLoader/SpinnerLoader";
import CategoryFilter from "./CategoryFilter";
import { useCurrency } from "../../context/CurrencyContext";

export default function Category() {
  const { catId } = useParams();
  const [searchParams] = useSearchParams();
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [category, setCategory] = useState(null);
  const cardSize = searchParams.get("cardsize") || "small";
  const cardSizeClass = cardSize === "big" ? "xl:grid-cols-4 sm:grid-cols-1" : "xl:grid-cols-6 sm:grid-cols-2";
  const sortOption = searchParams.get('sort');
  const { selectedCurrency } = useCurrency();

  useEffect(() => {
    setIsLoading(true);
    if (catId) {
      handleGetData();
    }
  }, [catId]);

  useEffect(() => {
    handleGetFilterProducts()
  }, [sortOption, selectedCurrency])

  const handleGetData = async () => {
    try {
      const [productsRes, categoryRes] = await Promise.all([
        myAxios.get(`/products?category_id=${catId}`),
        myAxios.get(`/categories/${catId}`),
      ]);
      setCategory(categoryRes.data.data);
      setProduct(productsRes.data.data);
      
      if (productsRes && categoryRes) {
        setIsLoading(false);
      }
    } catch (error) {
      console.error("Error fetching product data:", error);
      setIsLoading(true);
    }
  };

  const handleGetFilterProducts = async () => {
    try {
      const res = await myAxios.get(`/products?category_id=${catId}`, {
        params: {
          currency: selectedCurrency,
          sort_by: sortOption,
        }
      })
      console.log(res.data.data);
      
      setProduct(res.data.data);
    } catch (error) {
      console.log('Error Message' + error);
    }
  }

  if (isLoading) {
    return (
      <SpinnerLoader/>
    );
  }

  return (
    <>
      <main className="max-w-[1504px] flex flex-col mx-auto">
        <div className="w-full flex justify-between">
            <Breadcrumbs category={category?.name}/>
            <CardSize />
        </div>
        <h2 className="text-3xl font-bold">{ category?.name } <span className="text-sm ml-3 text-gray-500 font-normal">({product?.length}) Products</span></h2>
        <CategoryFilter categoryId={catId}/>
        <section className="w-100">
          <div className={`w-full grid grid-cols-2 gap-x-[20px] ${cardSizeClass} lg:grid-cols-4 md:grid-cols-3 gap-y-[32px]`}>
            {product?.map((product) => (
              <CardDetail product={product} key={product.id}/>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}
