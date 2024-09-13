import React, { useEffect, useState } from 'react';
import myAxios from '../../api/axios';

interface Brand {
    id: number;
    b_name: string;
}

export default function BrandSelect() {
    const [brands, setBrands] = useState<Array<Brand>>([]);
    const [selectedBrand, setSelectedBrand] = useState<string>("");

    useEffect(() => {
        myAxios.get('/brands').then((res) => {
            setBrands(res.data.data);
        }).catch((error) => {
            console.error('Error fetching categories:', error);
        });
    }, []);

    const handleSelectChange = (event: React.ChangeEvent<{ value: number | unknown | string }>) => {
        setSelectedBrand(event.target.value as string);
    };

    return (
        <div className='w-70 my-2'>
            <label htmlFor="brand" className="block mb-2 text-base font-medium text-slate-900 dark:text-white">Brand <span className="text-meta-1">*</span></label>
            <select id="brand" onChange={handleSelectChange} className="rounded border-[1.5px] border-stroke bg-transparent text-black outline-none transition active:border-primary disabled:cursor-default disabled:bg-whiter block relative w-full px-4 py-3 text-base text-gray-900 border-gray-300 bg-slate-50 focus:ring-purple-500 focus:border-purple-500 dark:bg-slate-700 dark:border-slate-600 dark:placeholder-slate-400 dark:text-white dark:focus:ring-purple-500 dark:focus:border-purple-500">
                {brands?.length > 0 ? (
                    brands.map((brand) => (
                        <React.Fragment key={brand.id}>
                            <option key={brand.id} value={brand.id}>{brand.b_name}</option>
                        </React.Fragment>
                    ))
                ) : (
                    <option value="">Loading...</option>
                )
                }
            </select>
        </div>
    );
}
