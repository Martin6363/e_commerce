import React from "react";

function ColorCheckbox() {
  return (
    <>
      <div className="flex flex-wrap gap-4 mt-4">
        <button
          type="button"
          className="w-12 h-11 bg-black border-2 border-white hover:border-gray-800 rounded-lg shrink-0"
        ></button>
        <button
          type="button"
          className="w-12 h-11 bg-gray-400 border-2 border-white hover:border-gray-800 rounded-lg shrink-0"
        ></button>
        <button
          type="button"
          className="w-12 h-11 bg-orange-400 border-2 border-white hover:border-gray-800 rounded-lg shrink-0"
        ></button>
        <button
          type="button"
          className="w-12 h-11 bg-red-400 border-2 border-white hover:border-gray-800 rounded-lg shrink-0"
        ></button>
      </div>
    </>
  );
}

export default ColorCheckbox;
