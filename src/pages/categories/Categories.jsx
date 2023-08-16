import React from "react";
import { ToastContainer, toast } from "react-toastify";
import CategoryModal from "../../components/modals/CategoryModal";
import EmptyScreen from "../../components/shared/loaders/EmptyScreen";
import RequestLoader from "../../components/shared/loaders/RequestLoader";
import SearchLoader from "../../components/shared/loaders/SearchLoader";
import SearchBar from "../../components/shared/search/SearchBar";
import CategoryTable from "../../components/tables/CategoryTable";
import { useCategory } from "../../contexts/CategoryContext/CategoryContext";

function Categories() {
  const {
    categories,
    isLoading,
    isError,
    dropdownMenus,
    setType,
    setItem,
    searchBarValue,
    filterCategoriesBySearch,
    isRequestLoading,
  } = useCategory();

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

  const handleSearch = (event) => {
    filterCategoriesBySearch(event);
  };

  const handleModal = (data, type) => {
    setItem(data);
    setType(type);
  };

  let content = null;

  if (isLoading) {
    content = <SearchLoader></SearchLoader>;
  } else if (!isLoading && isError) {
    content = (
      <div className="bg-whiteHigh p-8 text-errorColor">
        Something went wrong!
      </div>
    );
  } else if (!isLoading && !isError && categories?.length === 0) {
    content = <EmptyScreen></EmptyScreen>;
  } else if (!isLoading && !isError && categories?.length > 0) {
    content = (
      <CategoryTable
        items={categories}
        dropdownMenus={dropdownMenus}
        notifySuccess={notifySuccess}
        notifyError={notifyError}
      ></CategoryTable>
    );
  }

  return (
    <div className="overflow-auto w-full py-10 pr-6 h-full">
      <SearchBar
        tableName="Categories"
        onChange={handleSearch}
        value={searchBarValue}
      >
        <div>
          <button
            type="button"
            data-hs-overlay="#category-modal"
            className="btn bg-whiteHigh hover:bg-whiteLow border-none rounded-full h-12 w-12"
            onClick={() => handleModal({}, "add")}
          >
            <span className="material-symbols-outlined text-primaryMain">
              add
            </span>
          </button>
        </div>
      </SearchBar>
      <div>{content}</div>
      <div>
        <CategoryModal
          notifySuccess={notifySuccess}
          notifyError={notifyError}
        ></CategoryModal>
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

export default Categories;
