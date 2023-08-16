import React, { useState } from "react";
import { avater, logo } from "../../../assets/getImages";
import { useAuth } from "../../../contexts/AuthContext/AuthContext";

const TopNav = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { logout } = useAuth();

  const handleLogout = async () => {
    setIsLoading(true);
    try {
      await logout();
      setIsLoading(false);
    } catch (err) {
      console.log(err);
      setIsLoading(false);
    }
  };

  return (
    <div className="navbar bg-primaryMainDarkest px-10 py-4">
      {/* top nav left */}
      <div className="flex-1 text-whiteHigh">
        <img src={logo} alt="" className="w-14 h-14" />
      </div>
      {/* top nav right */}
      <div className="flex-none">
        {/* user avater */}
        <div className="dropdown dropdown-end">
          <label tabIndex={3} className="btn btn-ghost btn-circle avatar">
            <div className="w-12 h-12 rounded-full">
              <img src={avater} alt="" />
            </div>
          </label>
          <ul
            tabIndex={3}
            className="menu menu-compact dropdown-content mt-3 shadow bg-base-100 rounded-md w-44 z-50"
          >
            <li>
              <button
                className="active:bg-primaryMain flex items-center gap-1 "
                onClick={handleLogout}
                disabled={isLoading}
              >
                <span className="material-symbols-outlined">Logout</span>
                Logout
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TopNav;
