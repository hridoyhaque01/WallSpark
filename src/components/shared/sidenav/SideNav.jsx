import React, { useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../../contexts/AuthContext/AuthContext";
import "./sidenav.css";

const SideNav = () => {
  const [isClosed] = useState();
  const [isSubmenuOpen, setIsSubmenuOpen] = useState({});
  const submenuRef = useRef({});
  const { logout } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const handleDropdown = (menu, submenuOpen) => {
    if (!submenuOpen) {
      setIsSubmenuOpen((prev) => ({
        [menu]: !prev[menu],
      }));
    }
  };

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
    <div
      className={`${
        isClosed ? "w-20" : "w-72"
      } bg-primaryMainDarkest flex flex-col gap-1 h-full sideNav overflow-auto  text-whiteHigh`}
    >
      {/* routes */}
      <section className="flex flex-col flex-1 justify-start items-start gap-1 py-4">
        {/* dashboard  */}
        <div className="w-full overflow-hidden capitalize">
          <NavLink
            to="/"
            className="flex items-center pl-6 pr-3 py-4 cursor-pointer select-none"
          >
            <span className="material-symbols-outlined">dashboard</span>
            &nbsp;
            <p className={`flex-1 ${isClosed && "hidden"} shrink-0`}>
              <span>dashboard</span>
            </p>
          </NavLink>
        </div>

        {/* categories  */}

        <div className="w-full overflow-hidden capitalize">
          <NavLink
            to="/categories"
            className="flex items-center pl-6 pr-3 py-4 cursor-pointer select-none"
          >
            <span className="material-symbols-outlined">settings_suggest</span>
            &nbsp;
            <p className={`flex-1 ${isClosed && "hidden"} shrink-0`}>
              <span>Category</span>
            </p>
          </NavLink>
        </div>
        {/* wallpapers  */}

        <div className="w-full overflow-hidden capitalize">
          <NavLink
            to="/wallpapers"
            className="flex items-center pl-6 pr-3 py-4 cursor-pointer select-none"
          >
            <span className="material-symbols-outlined">photo_library</span>
            &nbsp;
            <p className={`flex-1 ${isClosed && "hidden"} shrink-0`}>
              <span>Wallpapers</span>
            </p>
          </NavLink>
        </div>
        {/* wallpapers  */}

        <div className="w-full overflow-hidden capitalize">
          <NavLink
            to="/trending"
            className="flex items-center pl-6 pr-3 py-4 cursor-pointer select-none"
          >
            <span className="material-symbols-outlined">trending_up</span>
            &nbsp;
            <p className={`flex-1 ${isClosed && "hidden"} shrink-0`}>
              <span>Trending</span>
            </p>
          </NavLink>
        </div>
        {/* wallpapers  */}

        {/* <div className="w-full overflow-hidden capitalize">
          <NavLink
            to="/colors"
            className="flex items-center pl-6 pr-3 py-4 cursor-pointer select-none"
          >
            <span className="material-symbols-outlined">palette</span>
            &nbsp;
            <p className={`flex-1 ${isClosed && "hidden"} shrink-0`}>
              <span>Colors</span>
            </p>
          </NavLink>
        </div> */}

        {/* logout */}
        <button
          className="btn-btn-ghost pl-6 pr-3 py-3 w-full"
          onClick={handleLogout}
          disabled={isLoading}
        >
          <p className="flex items-center">
            <span className="material-symbols-outlined">Logout</span>
            <span className={`${isClosed && "hidden"} shrink-0`}>Logout</span>
          </p>
        </button>
      </section>
    </div>
  );
};

export default SideNav;
