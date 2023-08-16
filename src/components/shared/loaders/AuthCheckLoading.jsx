import React from "react";
import loader from "../../../assets/animations/opener-loading.gif";

function AuthCheckLoading() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center">
      <img src={loader} alt="" className="max-w-96" />
    </div>
  );
}

export default AuthCheckLoading;
