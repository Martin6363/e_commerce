import React from 'react'
import BackButton from '../../components/BackButton/BackButton'
import ImageDropZone from '../../components/ImageDropZone/ImageDropZone'
import CategorySubCategorySelect from '../../components/SelectOption/CategorySubCategorySelect'
import BrandSelect from '../../components/SelectOption/BrandSelect'

function CreateProduct() {


  return (
    <>
      <div className="flex flex-col gap-9">
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="flex items-center gap-2 border-b border-stroke py-4 px-6.5 dark:border-strokedark">
            <BackButton />
            <h3 className="font-medium text-black dark:text-white">
              Create Product
            </h3>
          </div>
          <form action="#">
            <div className="p-6.5">
              <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                <div className="w-full xl:w-1/2">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Name
                  </label>
                  <input
                    type="text"
                    placeholder="Enter product name"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                </div>
                <div className="w-full xl:w-1/2">
                  <label htmlFor="price-input" className="mb-2.5 block text-black dark:text-white">Select a number:</label>
                  <input type="number" id="price-input" aria-describedby="helper-text-explanation" className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary" placeholder="90210" required />
                </div>
              </div>
              <div className='flex items-center gap-3'>
                <CategorySubCategorySelect />
                <BrandSelect />
              </div>
              {/* <SelectGroupOne /> */}
              <div className="mb-6">
                <label className="mb-2.5 block text-black dark:text-white">
                  Description
                </label>
                <textarea
                  rows={6}
                  placeholder="Type product description"
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                ></textarea>
              </div>
              <ImageDropZone />
              <button className="flex w-full justify-center rounded bg-purple-500 p-3 font-medium text-gray hover:bg-opacity-90">
                Create
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default CreateProduct