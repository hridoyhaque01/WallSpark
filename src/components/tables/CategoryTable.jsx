import React, { Fragment, useState } from "react";
import { useCategory } from "../../contexts/CategoryContext/CategoryContext";
import { useWallpaper } from "../../contexts/WallpaperContext/WallpaperContext";
import ConfirmationModal from "../modals/ConfirmationModal";
import PhotoModal from "../modals/PhotoModal";
import { Pagination } from "../pagination/Pagination";

function CategoryTable({ items, notifySuccess, notifyError }) {
  const { allWallpapers } = useWallpaper();
  const {
    currentPage,
    setCurrentPage,
    rowsPerPage,
    setRowsPerPage,
    item,
    handleDelete,
    setItem,
    filteredCategories,
    setType,
    isDeleteable,
    setIsDeletable,
  } = useCategory();

  // useEffect(() => {
  //     const getFormatedList = allWallpapers?.filter(
  //       (wallpaper) => wallpaper?.tag === item?.name
  //     );
  //     if (getFormatedList?.length > 0) {
  //       setIsEditable(true);
  //     } else {
  //       setIsEditable(false);
  //     }
  // }, [type, item?.name]);

  const handleEdit = (item) => {
    setItem(item);
    setType("edit");
  };

  const deleteHandler = (item) => {
    setItem(item);
    const getFormatedList = allWallpapers?.filter(
      (wallpaper) => wallpaper?.tag === item?.name
    );
    if (getFormatedList?.length > 0) {
      setIsDeletable(false);
    } else {
      setIsDeletable(true);
    }
  };

  const [imageUrl, setImageUrl] = useState();

  return (
    <div className="flex flex-col w-full pb-6 bg-whiteHigh shadow-md rounded-b-lg">
      <div className="-m-1.5 overflow-x-auto">
        <div className="p-1.5 min-w-full inline-block align-middle">
          <div className="overflow-visible">
            <table className="min-w-full ">
              <thead>
                <tr className=" text-blackHigh font-medium  ">
                  <th
                    scope="col"
                    className="px-6 py-5 text-left text-base bg-blueLight"
                  >
                    Serial
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-5 text-left text-base bg-blueLight"
                  >
                    Name
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-5 text-left text-base bg-blueLight"
                  >
                    Image
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-5 text-left text-base bg-blueLight"
                  >
                    Created At
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-5 text-right text-base bg-blueLight"
                  >
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-whiteMid">
                {items?.map((item, i) => (
                  <tr
                    className="hover:bg-whiteSemi text-blackLow text-sm"
                    key={item?.id}
                  >
                    <td className="px-6 py-4">
                      {currentPage === 1 && i + 1 < 10
                        ? "0" + (rowsPerPage * (currentPage - 1) + i + 1)
                        : rowsPerPage * (currentPage - 1) + i + 1}
                    </td>
                    <td
                      className="px-6 py-4 whitespace-nowrap"
                      data-hs-overlay="#coach-modal"
                    >
                      {item?.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <label
                        htmlFor="photoModal"
                        onClick={() => setImageUrl(item?.imageUrl)}
                      >
                        <img
                          src={item?.imageUrl}
                          alt=""
                          className="w-10 h-10"
                        />
                      </label>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {new Date(parseInt(item?.id)).toLocaleDateString("en-US")}
                    </td>

                    <td className="px-0 py-0 capitalize text-right pr-4 whitespace-nowrap">
                      <div className="dropdown dropdown-bottom dropdown-end">
                        <label
                          tabIndex={1}
                          className={`rounded-lg px-2 py-2 w-24 focus:outline-none active:border-none bg-successLight text-successMain cursor-pointer select-none flex items-center max-w-max gap-1`}
                        >
                          Active
                          <i className="fa-solid fa-angle-down text-sm"></i>
                        </label>
                        <ul
                          tabIndex={1}
                          className="dropdown-content menu mt-2 m-0.5 shadow bg-whiteHigh rounded-md w-36 bg-white z-50"
                        >
                          <Fragment>
                            <label
                              onClick={() => handleEdit(item)}
                              data-hs-overlay="#category-modal"
                            >
                              <li>
                                <p
                                  className={`text-warningMain py-2 active:bg-blackLow w-full rounded-t-md `}
                                >
                                  Edit
                                </p>
                              </li>
                            </label>
                            <hr className="text-disabledColor opacity-10" />
                            <label
                              onClick={() => deleteHandler(item)}
                              htmlFor="confirmationPopup"
                            >
                              <li>
                                <p
                                  className={`text-errorColor py-2 active:bg-blackLow w-full rounded-t-md `}
                                >
                                  delete
                                </p>
                              </li>
                            </label>
                          </Fragment>
                        </ul>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="pr-10">
          <Pagination
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            rowsPerPage={rowsPerPage}
            setRowsPerPage={setRowsPerPage}
            totalRows={filteredCategories?.length}
          ></Pagination>
        </div>
        <div>
          <ConfirmationModal
            item={item}
            handler={handleDelete}
            isDeleteable={isDeleteable}
            notifySuccess={notifySuccess}
            notifyError={notifyError}
            type="Category"
          ></ConfirmationModal>
        </div>
        <div>
          <PhotoModal url={imageUrl}></PhotoModal>
        </div>
      </div>
    </div>
  );
}

export default CategoryTable;
