import React from "react";

function SizeCheckbox() {
  return (
    <>
      <div className="flex flex-wrap gap-4 mt-4">
        <button
          type="button"
          className="w-12 h-11 border-2 hover:border-gray-800 font-semibold text-xs rounded-lg flex items-center justify-center shrink-0"
        >
          SM
        </button>
        <button
          type="button"
          className="w-12 h-11 border-2 hover:border-gray-800 border-gray-800 font-semibold text-xs rounded-lg flex items-center justify-center shrink-0"
        >
          MD
        </button>
        <button
          type="button"
          className="w-12 h-11 border-2 hover:border-gray-800 font-semibold text-xs rounded-lg flex items-center justify-center shrink-0"
        >
          LG
        </button>
        <button
          type="button"
          className="w-12 h-11 border-2 hover:border-gray-800 font-semibold text-xs rounded-lg flex items-center justify-center shrink-0"
        >
          XL
        </button>
        <button
          type="button"
          className="w-12 h-11 border-2 hover:border-gray-800 font-semibold text-xs rounded-lg flex items-center justify-center shrink-0"
        >
          XXL
        </button>
      </div>
    </>
  );
}

export default SizeCheckbox;
