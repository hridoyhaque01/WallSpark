import React from "react";
import { empty } from "../../../assets/getImages";

function EmptyScreen() {
  return (
    <div className="bg-whiteHigh px-6 py-10 flex justify-center w-full rounded-b-lg">
      <div className="w-96">
        <img src={empty} alt="" />
      </div>
    </div>
  );
}

export default EmptyScreen;
