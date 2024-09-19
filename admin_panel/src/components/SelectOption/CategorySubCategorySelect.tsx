import React, { useEffect, useState } from 'react';
import myAxios from '../../api/axios';

interface Category {
    children: Array<Subcategory>;
    id: number;
    name: string;
}

interface Subcategory {
    id: number;
    name: string;
}

export default function CategorySubCategorySelect() {
    const [categories, setCategories] = useState<Array<Category>>([]);
    const [selectedCategory, setSelectedCategory] = useState<string>("");

    useEffect(() => {
        myAxios.get('/categories').then((res) => {
            setCategories(res.data.data);
        }).catch((error) => {
            console.error('Error fetching categories:', error);
        });
    }, []);

    const handleSelectChange = (event: React.ChangeEvent<{ value: number | unknown | string }>) => {
        setSelectedCategory(event.target.value as string);
    };

    return (
        <div className='w-70 my-2'>
            <label htmlFor="category" className="block mb-2 text-base font-medium text-slate-900 dark:text-white">Category <span className="text-meta-1">*</span></label>
            <select id="category" onChange={handleSelectChange} className="w-full rounded border border-stroke bg-gray px-3 py-2 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary">
                {categories?.length > 0 ? (
                    categories.map((category) => (
                        <React.Fragment key={category.id}>
                            <optgroup label={category.name}>
                                {category.children?.map((subCategory) => (
                                    <option key={subCategory.id} value={subCategory.id}>{subCategory.name}</option>
                                ))}
                            </optgroup>
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
