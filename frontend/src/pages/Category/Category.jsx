import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import myAxios from "../../api/axios";
import "ldrs/ring";
import CardDetail from "../../components/Card/CardDetail";
import Breadcrumbs from "../../components/Breadcrumbs/Breadcrumbs";
import CardSize from "../../components/Card/CardSize";
import SpinnerLoader from "../../components/SpinnerLoader/SpinnerLoader";

export default function Category() {
  const { catId } = useParams();
  const [searchParams] = useSearchParams();
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [category, setCategory] = useState(null);
  const cardSize = searchParams.get("cardsize") || "small";
  const cardSizeClass = cardSize === "big" ? "xl:grid-cols-4 sm:grid-cols-1" : "xl:grid-cols-6 sm:grid-cols-2";

  useEffect(() => {
    setIsLoading(true);
    if (catId) {
      handleGetData();
    }
  }, [catId]);

  const handleGetData = async () => {
    try {
      const response = await myAxios.get(`/categories/${catId}`);
      setCategory(response.data.data);
      setProduct(response.data.data.products);
      if (response) {
        setIsLoading(false);
      }
    } catch (error) {
      console.error("Error fetching product data:", error);
      setIsLoading(true);
    }
  };

  if (isLoading) {
    return (
      <SpinnerLoader/>
    );
  }

  return (
    <>
      <main className="max-w-[1504px] flex flex-col mx-auto">
        <div className="w-full flex justify-between">
            <Breadcrumbs category={category.name}/>
            <CardSize />
        </div>
        <h2 className="text-3xl font-bold">{ category.name } <span className="text-sm ml-3 text-gray-500 font-normal">({product.length}) Products</span></h2>
        <section className="w-100">
          <div className={`w-full grid grid-cols-2 gap-x-[20px] ${cardSizeClass} lg:grid-cols-4 md:grid-cols-3 gap-y-[32px]`}>
            {product.map((product) => (
              <CardDetail product={product} key={product.id}/>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}
