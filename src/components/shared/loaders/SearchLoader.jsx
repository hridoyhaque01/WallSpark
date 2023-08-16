import React from "react";
import loader from "../../../assets/animations/emptyAnimation.gif";

function SearchLoader() {
  return (
    <div className="bg-whiteHigh px-6 py-4 flex justify-center w-full rounded-b-lg">
      <div className="">
        <img src={loader} alt="" className="max-w-md" />
      </div>
    </div>
  );
}

export default SearchLoader;
