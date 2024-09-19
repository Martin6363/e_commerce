import React, { useEffect, useState } from 'react'
import myAxios from '../../api/axios';

export default function AttributesSelect() {
    const [colors, setColors] = useState([]);
    const [ramMemory, setRamMemory] = useState([]);
    const [sizes, setSizes] = useState();

    useEffect(() => {
        const fetchAttributes = async () => {
            try {
                const [colorRes, ramMemoryRes, sizeRes] = await Promise.all([
                    myAxios.get('/attributes?colors'),
                    myAxios.get('/attributes?ram')
                ]);
                setColors(colorRes.data.data);
                setRamMemory(ramMemoryRes.data.data);
                console.log(colorRes.data.data);
                console.log(ramMemoryRes);
            } catch (error) {
                console.error("Error fetching attributes:", error);
            }
        };
        fetchAttributes();
    }, []);

    return (
        <div>
            <div className='w-70 my-2'>
                <label htmlFor="colors" className="block mb-2 text-base font-medium text-slate-900 dark:text-white">{colors[0]?.name} <span className="text-meta-1">*</span></label>

                <div className="w-full rounded border border-stroke bg-gray px-3 py-2 text-black dark:border-strokedark dark:bg-meta-4 dark:text-white">
                    {colors?.length > 0 ? (
                        <div id="dropdownSearch" className="z-10 bg-white rounded-lg shadow w-60 dark:bg-slate-700">
                            <div className="p-3">
                                <label htmlFor="input-group-search" className="sr-only">Search</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                        <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                                        </svg>
                                    </div>
                                    <input type="text" id="input-group-search" className="bg-gray-50 border border-slate-300 text-slate-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-slate-600 dark:border-slate-500 dark:placeholder-slate-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search user" />
                                </div>
                            </div>
                            <ul className="h-48 px-3 pb-3 overflow-y-auto text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownSearchButton">
                                {colors[0]?.values?.map((color) => (
                                    <li key={color.id}>
                                        <div className="flex items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                                            <input id={`color-item-${color.id}`} type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
                                            <label htmlFor={`color-item-${color.id}`} className="w-full ms-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300">{color.value}</label>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ) : (
                        <span>Loading...</span>
                    )}
                </div>
            </div>
        </div>
    )
}
