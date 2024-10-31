import { useEffect, useState } from 'react'
import myAxios from '../../api/axios';
import FilterDropDown from '../../components/FilterDetails/FilterDropDown';
import DropDownSort from '../../components/FilterDetails/DropDownSort';

function CategoryFilter({ categoryId }) {
    const [filters, setFilters] = useState([]);
    
    useEffect(() => {
        myAxios.get(`categories/${categoryId}/filters`).then((res) => {
            setFilters(res.data);
        })
    }, [categoryId]); 
    
  return (
    <div className='w-100 flex items-center gap-2 my-4 mx-5'>
        <DropDownSort/>
        {filters.filters?.map((item) => (
          <div className='' key={item.id}>
            <FilterDropDown filterData={item}/>
          </div>
        ))} 
    </div>
  )
}

export default CategoryFilter