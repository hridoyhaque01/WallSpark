import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import ConfirmationModal from "../../components/modals/ConfirmationModal";
import WallpaperModal from "../../components/modals/WallpaperModal";
import { Pagination } from "../../components/pagination/Pagination";
import EmptyScreen from "../../components/shared/loaders/EmptyScreen";
import RequestLoader from "../../components/shared/loaders/RequestLoader";
import SearchLoader from "../../components/shared/loaders/SearchLoader";
import SearchBar from "../../components/shared/search/SearchBar";
import { useWallpaper } from "../../contexts/WallpaperContext/WallpaperContext";

function Wallpapers() {
  const {
    wallpapers,
    isLoading,
    isError,
    currentPage,
    setCurrentPage,
    rowsPerPage,
    setRowsPerPage,
    filterWallpapersBySearch,
    filteredWallpapers,
    searchBarValue,
    handleDelete,
    isRequestLoading,
  } = useWallpaper();

  const [item, setItem] = useState();

  const handleSearch = (event) => {
    filterWallpapersBySearch(event);
  };

  const notifySuccess = (message) =>
    toast.info(message, {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });

  const notifyError = (message) =>
    toast.error(message, {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });

  let content = null;

  if (isLoading) {
    content = <SearchLoader></SearchLoader>;
  } else if (!isLoading && isError) {
    content = (
      <div className="bg-whiteHigh p-8 text-errorColor">
        Something went wrong!
      </div>
    );
  } else if (!isLoading && !isError && wallpapers?.length === 0) {
    content = <EmptyScreen></EmptyScreen>;
  } else if (!isLoading && !isError && wallpapers?.length > 0) {
    console.log(wallpapers);
    content = (
      <div className="py-6 grid grid-cols-4 gap-6 ">
        {wallpapers?.map((wallpaper) => (
          <div
            key={wallpaper?.imageId}
            className="flex flex-col gap-4 bg-whiteHigh shadow-md rounded-lg overflow-hidden"
          >
            <div>
              <img
                src={wallpaper?.imageUrl}
                alt=""
                className="w-full h-72 object-cover bg-center "
              />
            </div>
            <div className="flex items-center justify-between gap-3 px-4 pt-2 pb-5">
              <h2 className="text-md font-bold text-blackHigh capitalize">
                {wallpaper?.tag}
              </h2>
              <label
                onClick={() => setItem(wallpaper)}
                htmlFor="confirmationPopup"
                className="cursor-pointer"
              >
                <span className="material-symbols-outlined text-primaryMain">
                  delete
                </span>
              </label>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="overflow-auto w-full py-8 pr-6 h-full">
      <SearchBar
        tableName="Wallpaper"
        onChange={handleSearch}
        value={searchBarValue}
      >
        <div>
          <button
            type="button"
            data-hs-overlay="#wallpaper-modal"
            className="btn bg-whiteHigh hover:bg-whiteLow border-none rounded-full h-12 w-12"
          >
            <span className="material-symbols-outlined text-primaryMain">
              add
            </span>
          </button>
        </div>
      </SearchBar>
      <div className="bg-whiteHigh shadow-md p-8 rounded-b-lg">
        <div className="">{content}</div>
        {wallpapers?.length > 0 && (
          <div className="pr-10">
            <Pagination
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              rowsPerPage={rowsPerPage}
              setRowsPerPage={setRowsPerPage}
              totalRows={filteredWallpapers?.length}
            ></Pagination>
          </div>
        )}
      </div>
      <div>
        <WallpaperModal
          notifySuccess={notifySuccess}
          notifyError={notifyError}
        ></WallpaperModal>
      </div>
      <div>
        <ConfirmationModal
          item={item}
          handler={handleDelete}
          isDeleteable={true}
          notifySuccess={notifySuccess}
          notifyError={notifyError}
          type="Wallpaper"
        ></ConfirmationModal>
      </div>
      <div>{isRequestLoading && <RequestLoader></RequestLoader>}</div>
      <div>
        <ToastContainer
          position="top-right"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </div>
    </div>
  );
}

export default Wallpapers;
