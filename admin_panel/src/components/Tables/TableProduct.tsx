import { ChangeEvent, useState } from 'react';
import ProductThree from '../../images/product/product-03.png';
import ModalInput from '../Modals/ModalInput';
import { Link, useSearchParams } from 'react-router-dom';
import { IoAddOutline } from "react-icons/io5";
import { blue, green, red } from '@mui/material/colors';
import { MdEdit, MdDelete } from "react-icons/md";
import { FaEye } from "react-icons/fa";
import Loader from '../../common/Loader';
import SwitcherProduct from '../Switchers/SwitcherProduct';
import SearchInput from '../SearchInput/SearchInput';
import SuccessAlert from '../Alerts/SuccessAlert';
import { FaSortDown, FaSortUp, FaSort } from "react-icons/fa";


interface typeTableProduct {
  productData: Array<any>,
  loading: boolean,
}

const TableProduct = ({ productData, loading }: typeTableProduct) => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [toggleSortPrice, setToggleSortPrice] = useState(0);
  const [searchParams, setSearchParams] = useSearchParams();
  const sort = searchParams.get("sort");
  const status = searchParams.get("status");
  const handleEditClick = (product: any) => {
    setSelectedProduct(product);
  };

  const handleToggleSortByPrice = () => {
    let newToggleSortPrice = toggleSortPrice + 1;
    if (newToggleSortPrice >= 3) {
      newToggleSortPrice = 0;
    }
    setToggleSortPrice(newToggleSortPrice);

    let newParamValue = '';
    if (newToggleSortPrice === 1) {
      newParamValue = 'lowest_price';
    } else if (newToggleSortPrice === 2) {
      newParamValue = 'highest_price';
    }

    if (newToggleSortPrice === 0) {
      searchParams.delete("sort");
    } else {
      searchParams.set("sort", newParamValue);
    }
    setSearchParams(searchParams);
  };

  const handleChangeStatus = (e: ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    searchParams.set("status", value);
    setSearchParams(searchParams);
    
    if (value === "reset") {
      searchParams.delete('status')
      setSearchParams(searchParams);
    }
  }


  return (
    <>
      <SuccessAlert text={''} />
      <div className="rounded-sm border max-h-[600px] overflow-y-auto border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="py-6 px-4 md:px-6 xl:px-7.5 flex items-center justify-between">
          <div className='flex items-center gap-5'>
            <h4 className="text-xl font-semibold text-black dark:text-white">
              Products
            </h4>
            <div>
              <select onChange={(e) => handleChangeStatus(e)} className="block w-full p-2 text-sm text-slate-900 border border-slate-300 rounded-lg bg-slate-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-slate-700 dark:border-slate-600 dark:placeholder-slate-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                <option selected={!status && true } value="reset">Default</option>
                <option selected={status == 'published' && true } value="published">Published</option>
                <option selected={status == 'unpublished' && true } value="unpublished">Unpublished</option>
              </select>
            </div>
          </div>
          <SearchInput />
          <Link to={'/create/product'} className='flex items-center gap-2 bg-purple-500 text-white px-4 py-2 rounded'><IoAddOutline size={20} /> Create Product</Link>
        </div>

        <div className="sticky top-0 w-full z-10 grid grid-cols-6 bg-white dark:bg-black border-t border-stroke py-4.5 px-4 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5">
          <div className="col-span-3 flex items-center">
            <p className="font-medium flex items-center gap-1">Product Name
              <svg className="w-3 h-3 ms-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z" />
              </svg>
            </p>
          </div>
          <div className="col-span-2 hidden items-center sm:flex">
            <p className="font-medium">Category</p>
          </div>
          <div className="col-span-1 flex items-center">
            <p className="font-medium flex items-center gap-3 select-none cursor-pointer rounded-full hover:text-slate-900 dark:hover:text-slate-100 transition-all duration-75 px-2 py-1" onClick={handleToggleSortByPrice}>
              Price
              <span className='text-slate-400 flex flex-col justify-center items-center'>
                {sort === "lowest_price" ? <FaSortUp /> : sort === "highest_price" ? <FaSortDown /> : <FaSort />}
              </span>

            </p>
          </div>
          <div className="col-span-1 flex items-center">
            <p className="font-medium">Published</p>
          </div>
          <div className="col-span-1 flex items-center">
            <p className="font-medium">Actions</p>
          </div>
        </div>

        {loading ? (
          <div><Loader /></div>
        ) : (
          <>
            {productData.map((product) => (
              <div
                className="grid grid-cols-6 border-t border-stroke py-4.5 px-4 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5"
                key={product.id}
              >
                <div className="col-span-3 flex items-center">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                    <div className="h-12.5 w-15 rounded-md overflow-hidden">
                      <img src={product.images[0]?.url ? product.images[0]?.url : ProductThree} alt={product?.name} />
                    </div>
                    <p className="text-sm flex flex-col gap-1 text-black dark:text-white">
                      {product?.name}
                      <span className='text-[10px]'>{product?.created_at}</span>
                    </p>
                  </div>
                </div>
                <div className="col-span-2 hidden items-center sm:flex">
                  <p className="text-sm text-black dark:text-white">
                    {product.category}
                  </p>
                </div>
                <div className="col-span-1 flex items-center">
                  <p className="text-sm text-black dark:text-white">
                    ${product.price}
                  </p>
                </div>
                <div className="col-span-1 items-center">
                  <SwitcherProduct published={product.published} productId={product.id} />
                </div>
                <div className="col-span-1 flex items-center gap-2">
                  <button
                    onClick={() => handleEditClick(product)}
                    style={{ color: 'white', backgroundColor: green[500], padding: '10px', borderRadius: '100%', textAlign: 'center' }}
                    type='button'
                  >
                    <MdEdit />
                  </button>
                  <button
                    style={{ color: 'white', backgroundColor: blue[500], padding: '10px', borderRadius: '100%', textAlign: 'center' }}
                    type='button'
                  >
                    <FaEye />
                  </button>
                  <button
                    style={{ color: 'white', backgroundColor: red[500], padding: '10px', borderRadius: '100%', textAlign: 'center' }}
                    type='button'
                  >
                    <MdDelete />
                  </button>
                </div>
              </div>
            ))}
          </>
        )
        }

        {selectedProduct && (
          <ModalInput product={selectedProduct} />
        )}
      </div>
    </>
  );
};

export default TableProduct;
