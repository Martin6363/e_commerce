import React, { useEffect, useState } from 'react';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import TableProduct from '../../components/Tables/TableProduct';
import myAxios from '../../api/axios';
import { useSearchParams } from 'react-router-dom';
import PaginationComponent from '../../components/Pagination/PaginationComponent';

interface ProductData {
  data: Array<any>;
  meta: {
    last_page: number;
  };
}

const cache: {
  [page: number]: {
    [sort: string]: {
      [status: string]: ProductData
    }
  }
} = {};

export default function Product() {
  const [product, setProduct] = useState<Array<any>>([]);;
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = parseInt(searchParams.get('page') || '1', 10);
  const [pageCount, setPageCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const sortByPrice = searchParams.get('sort') || '';
  const status = searchParams.get("status") || '';

  useEffect(() => {
    handleGetProducts();
  }, [currentPage, sortByPrice, status]);

  const handleGetProducts = async (forceRefresh = false) => {
    setLoading(true);
    try {
      if (!forceRefresh) {
        cache[currentPage] = cache[currentPage] || {};
        cache[currentPage][sortByPrice] = cache[currentPage][sortByPrice] || {};
  
        const cachedData = cache[currentPage][sortByPrice][status];
        if (cachedData) {
          setProduct(cachedData.data);
          setPageCount(cachedData.meta.last_page);
          setLoading(false);
          console.log("Loaded from cache");
          return;
        }
      }
  
      const response = await myAxios.get(`/products?page=${currentPage}&sort_by=${sortByPrice}&status=${status}`);
      const newData = response.data;
      cache[currentPage][sortByPrice][status] = newData;
      setProduct(newData.data);
      setPageCount(newData.meta.last_page);
      console.log("Fetched new data");
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };  

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setSearchParams({ page: value.toString(), sort: sortByPrice, status });
  };
  return (
    <>
      <Breadcrumb pageName="Products" />
      <div className="flex flex-col gap-10">
        <TableProduct productData={product} loading={loading} handleUpdateData={handleGetProducts} />
        <PaginationComponent
          currentPage={currentPage}
          pageCount={pageCount}
          onPageChange={handlePageChange}
        />
      </div>
    </>
  );
}
