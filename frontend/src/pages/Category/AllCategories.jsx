import { useEffect, useState } from 'react'
import myAxios from '../../api/axios';
import { Link } from "react-router-dom";
import SpinnerLoader from '../../components/SpinnerLoader/SpinnerLoader';
import "../../assets/styles/Category.scss";

const cache = {};

function AllCategories() {
    const [categories, setCategories] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const getCategories = async () => {
            if (cache['categories']) {
                setCategories(cache['categories']);
                setIsLoading(false);
                return;
            } 
            await myAxios.get('/categories').then((res) => {
                console.log(res);
                cache['categories'] = res.data.data;
                setCategories(res.data.data);
                setIsLoading(false);
            })
        }
        getCategories();
    }, []);

    if (isLoading) {
        return (
            <SpinnerLoader/>
        );
      }

  return (
    <main className="max-w-[1504px] lg:px-[25px] xl:px-[32px] mx-auto">
        <h2 className="px-5 py-3 text-2xl my-2 font-bold">Categories</h2>
        <div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 my-2 gap-3 p-none">
            {
                categories.map((category) => (
                    <figure key={category.id} className="relative rounded-lg transition-all duration-300 overflow-hidden group">
                        <img className="rounded-lg object-cover" src={category.picture} alt={category.description}/>
                        <figcaption className="absolute w-full px-3 py-4 text-lg text-white bg-black bg-opacity-70 bottom-0">
                            <p>{category.name}</p>
                        </figcaption>
                        <div className={`absolute category_block_box top-0 left-0 rounded-lg z-40 w-full h-full overflow-y-auto lg:opacity-0 sm:opacity-100 bg-black bg-opacity-70 group-hover:opacity-100 transition-opacity duration-50`}>
                            <ul className="w-full flex flex-col items-start p-5">
                                {category.children.map((children) => (
                                <li key={children.id} className="flex justify-between items-center rounded-sm list-none w-full h-full hover:translate-x-2 transition-transform hover:bg-black hover:bg-opacity-45 duration-150 group">
                                    <Link to={`/category/${children.slug}/${children.id}`} className="hover:underline lg:text-lg text-white w-full px-1 py-2 rounded-md">
                                        {children.name}
                                    </Link>
                                    <span className="text-gray-400 mr-2">{children.products_count}</span>
                                </li>
                                ))} 
                            </ul>
                        </div>
                    </figure>
                ))
            }
        </div>
    </main>
  )
}

export default AllCategories