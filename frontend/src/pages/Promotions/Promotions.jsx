import { useEffect, useState } from "react"
import myAxios from "../../api/axios";
import { useParams } from "react-router-dom";
import CardDetail from "../../components/Card/CardDetail";
import CardSize from "../../components/Card/CardSize";
import Breadcrumbs from "../../components/Breadcrumbs/Breadcrumbs";

function Promotions() {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [promotion, setPromotion] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    if (id) {
      handelGetPromotion()
    }
  }, [id])

  const handelGetPromotion = async () => {
    await myAxios.get(`/promotions/${id}`).then((res) => {
      setPromotion(res.data);
      setIsLoading(false);
    })
  }

  if (isLoading) {
    return (
      <div className="homeSpinner">
        <l-ring
          size="70"
          stroke="6"
          bg-opacity="0"
          speed="1.3"
          color="#581C87"
        ></l-ring>
      </div>
    );
  }
  return (
    <div>
      <main className="max-w-[1440px] flex flex-col mx-auto">
        <div className="w-full flex justify-between">
            <Breadcrumbs/>
            <CardSize />
        </div>
        <h2 className="text-3xl font-bold">{ promotion.name } <span className="text-sm ml-3 text-gray-500 font-normal">{promotion.total_products} Products</span></h2>
        <section className="w-100">
          <div className="w-100 mt-5 flex flex-wrap gap-2">
          {promotion.discounted_products?.map((product) => (
            <CardDetail 
              key={product.id}
              product={product}
              loadingCard={isLoading}
            />
          ))}
          </div>
        </section>
      </main>
    </div>
  )
}

export default Promotions