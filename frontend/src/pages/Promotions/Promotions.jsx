import { useEffect, useState } from "react";
import myAxios from "../../api/axios";
import { useParams, useSearchParams } from "react-router-dom";
import CardDetail from "../../components/Card/CardDetail";
import CardSize from "../../components/Card/CardSize";
import Breadcrumbs from "../../components/Breadcrumbs/Breadcrumbs";
import SpinnerLoader from "../../components/SpinnerLoader/SpinnerLoader";

const cacheData = {};

function Promotions() {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [promotion, setPromotion] = useState({});
  const [searchParams] = useSearchParams();
  const cardSize = searchParams.get("cardsize") || "small";
  const cardSizeClass = cardSize === "big" ? "xl:grid-cols-4 sm:grid-cols-1" : "xl:grid-cols-6 sm:grid-cols-2";

  useEffect(() => {
    setIsLoading(true);
    if (id) {
      handleGetPromotion();
    }
  }, [id]);

  const handleGetPromotion = async () => {
    try {
      if (cacheData[`promotion_products_${id}`]) {
        setPromotion(cacheData[`promotion_products_${id}`]);
        setIsLoading(false);
        return;
      }
      const res = await myAxios.get(`/promotions/${id}`);
      setPromotion(res.data.data);
      cacheData[`promotion_products_${id}`] = res.data.data;
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching promotion data:", error);
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <SpinnerLoader />;
  }

  return (
    <>
      <main className="max-w-[1440px] flex flex-col mx-auto">
        <div className="w-full flex justify-between">
          <Breadcrumbs />
          <CardSize />
        </div>
        <h2 className="text-3xl font-bold">
          {promotion.name}{" "}
          <span className="text-sm ml-3 text-gray-500 font-normal">
            {promotion.total_products} Products
          </span>
        </h2>
        <section className="w-100">
          <div
            className={`w-full mt-5 grid grid-cols-2 gap-x-[20px] ${cardSizeClass} lg:grid-cols-4 md:grid-cols-3 gap-y-[32px]`}
          >
            {promotion.discounted_products?.map((product) => (
              <CardDetail key={product.id} product={product} loadingCard={isLoading} />
            ))}
          </div>
        </section>
      </main>
    </>
  );
}

export default Promotions;
