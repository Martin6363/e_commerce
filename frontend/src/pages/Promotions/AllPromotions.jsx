import { useEffect, useState } from "react";
import myAxios from "../../api/axios";
import { Link } from "react-router-dom";
import { useTheme } from "@emotion/react";

const cache = {};

function AllPromotions() {
  const [promotions, setPromotions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const theme = useTheme();

  useEffect(() => {
    const getPromotions = async () => {
        if (cache['promotions']) {
            setPromotions(cache['promotions']);
            setIsLoading(false);
            return;
        } 
      await myAxios.get("/promotions").then((res) => {
        cache['promotions'] = res.data.data;
        setPromotions(res.data.data);
        setIsLoading(false);
      });
    };
    getPromotions();
  }, []);

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
    <main className="w-[98%] mx-auto">
        <h2 className="px-5 py-3 text-2xl my-2 font-bold">Promotions of the day</h2>
        <div className="grid lg:grid-cols-2 sm:grid-cols-1 gap-3 p-none">
            {promotions?.map((promotion) => (
                <Link to={`/promotions/${promotion.slug}/${promotion.id}`} className="w-full h-full relative overflow-hidden transition-scale duration-75 hover:scale-95" key={promotion.id}>
                    <div className="w-full text-center bg-white border border-gray-200 rounded-lg shadow overflow-hidden">
                        <img className="w-full h-full object-cover" src={promotion.image_url} alt={promotion.name} />
                    </div>
                    <p className={`absolute bottom-0 w-full py-3 lg:text-start px-5 sm:text-center ${ theme.palette.mode === 'dark' ? 'bg-[rgba(0,0,0,.8)]' : 'bg-[rgba(255,255,255,.8)]' } rounded-b-lg`}>{promotion.name}</p>
                </Link>
            ))}
        </div>
    </main>
  );
}

export default AllPromotions;
