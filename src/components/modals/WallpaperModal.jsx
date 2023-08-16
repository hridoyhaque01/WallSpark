import React, { useRef, useState } from "react";
import { ToastContainer } from "react-toastify";
import { useCategory } from "../../contexts/CategoryContext/CategoryContext";
import { useWallpaper } from "../../contexts/WallpaperContext/WallpaperContext";

function WallpaperModal({ notifySuccess, notifyError }) {
  const { allCategories } = useCategory();
  const { uploadWallpaper, colors } = useWallpaper();

  const [file, setFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [typeError, setTypeError] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const fileRef = useRef();

  const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (
      file?.type === "image/jpg" ||
      file?.type === "image/jpeg" ||
      file?.type === "image/png"
    ) {
      setFile(file);
      const imageURL = URL.createObjectURL(file);
      setImagePreview(imageURL);
      setTypeError(false);
    } else {
      setFile("");
      setImagePreview("");
      setTypeError(true);
    }
  };

  const handleCategoryChange = (value) => {
    setSelectedCategory(value);
  };
  const handleColorChange = (value) => {
    setSelectedColor(value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.target;
    const initialName = form.name.value;
    let artistName = initialName.charAt(0).toUpperCase() + initialName.slice(1);
    const data = {
      artistName,
      file,
      color: selectedColor?.name,
      tag: selectedCategory?.name,
      imageUrl: selectedCategory?.imageUrl,
      viewCount: 0,
    };

    if (!selectedCategory?.id) {
      notifyError("Please select an Category!");
      return;
    } else if (!selectedColor?.id) {
      notifyError("Please select an color!");
      return;
    } else {
      try {
        await uploadWallpaper(data);
        form.reset();
        setFile(null);
        setImagePreview(null);
        setTypeError(null);
        setSelectedCategory(null);
        setSelectedColor(null);
        notifySuccess("Wallpaper Added!");
      } catch (error) {
        console.log(error);
        notifyError("Something went wrong!");
      }
    }
  };

  const handleDeleteFile = () => {
    fileRef.current.value = "";
    setFile(null);
    setImagePreview("");
  };
  return (
    <>
      <div
        id="wallpaper-modal"
        className="hs-overlay hs-overlay-open:bg-black-30 hidden w-full h-full fixed top-0 left-0 z-[80] overflow-x-hidden overflow-y-auto"
      >
        <div className="hs-overlay-open:opacity-100 hs-overlay-open:duration-200 opacity-0 ease-out transition-all  sm:w-full sm:mx-auto min-h-screen overflow-hidden flex items-center">
          <div className="flex flex-col w-[40rem] bg-whiteHigh  shadow-md rounded-xl mx-auto hs-overlay-open:translate-y-0 translate-y-3 duration-300">
            <div className="flex flex-col justify-center items-center relative p-8 w-full">
              <div className="absolute top-2.5 right-2.5 sm:top-5 sm:right-5 ">
                <button
                  className="p-2 rounded-full bg-whiteLow"
                  data-hs-overlay="#wallpaper-modal"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                  >
                    <path
                      d="M8.94251 8L12.4712 4.47132C12.7318 4.21132 12.7318 3.78869 12.4712 3.52869C12.2105 3.26802 11.7892 3.26802 11.5285 3.52869L7.99984 7.05734L4.47118 3.52869C4.21051 3.26802 3.78917 3.26802 3.52851 3.52869C3.26784 3.78869 3.26784 4.21132 3.52851 4.47132L7.05717 8L3.52851 11.5287C3.26784 11.7887 3.26784 12.2113 3.52851 12.4713C3.65851 12.6013 3.82917 12.6667 3.99984 12.6667C4.17051 12.6667 4.34118 12.6013 4.47118 12.4713L7.99984 8.94267L11.5285 12.4713C11.6585 12.6013 11.8292 12.6667 11.9998 12.6667C12.1705 12.6667 12.3412 12.6013 12.4712 12.4713C12.7318 12.2113 12.7318 11.7887 12.4712 11.5287L8.94251 8Z"
                      className="fill-black"
                    />
                  </svg>
                </button>
              </div>
              <form
                action=""
                className="flex flex-col  gap-6 pt-10 w-full"
                onSubmit={handleSubmit}
              >
                {/* artist Name:  */}
                <div className="flex flex-col gap-3 w-full">
                  <div className="">
                    <p className="font-medium">Artist Name:</p>
                  </div>
                  <div>
                    <input
                      name="name"
                      required
                      type="text"
                      placeholder="Artist name here"
                      className="w-full border border-whiteLow rounded-md py-3 px-4 outline-none"
                    />
                  </div>
                </div>

                {/* uploader  */}
                <div className="w-full">
                  <div className="w-full">
                    <input
                      ref={fileRef}
                      type="file"
                      id="fileUpload"
                      onChange={handleFileChange}
                      className="w-1 h-1 opacity-0 absolute"
                      required
                    />
                    {!imagePreview ? (
                      <label
                        htmlFor="fileUpload"
                        className="w-full border border-dotted border-primaryMain rounded-lg py-10 px-4 flex flex-col justify-center items-center gap-2 cursor-pointer"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="40"
                          height="40"
                          viewBox="0 0 40 40"
                          fill="none"
                        >
                          <g clipPath="url(#clip0_1738_23988)">
                            <path
                              d="M11.6667 34.9688C9.3901 34.794 7.22695 33.9043 5.48611 32.4269C3.74527 30.9494 2.51575 28.9597 1.97311 26.7418C1.43047 24.524 1.60246 22.1913 2.46452 20.0771C3.32658 17.9628 4.83463 16.1749 6.77335 14.9688C7.18587 11.7522 8.75634 8.79626 11.1909 6.65402C13.6254 4.51177 16.7571 3.33008 20 3.33008C23.2429 3.33008 26.3746 4.51177 28.8091 6.65402C31.2437 8.79626 32.8142 11.7522 33.2267 14.9688C35.1654 16.1749 36.6734 17.9628 37.5355 20.0771C38.3976 22.1913 38.5696 24.524 38.0269 26.7418C37.4843 28.9597 36.2548 30.9494 34.5139 32.4269C32.7731 33.9043 30.6099 34.794 28.3333 34.9688V35.0004H11.6667V34.9688ZM21.6667 21.6671H26.6667L20 13.3338L13.3333 21.6671H18.3333V28.3338H21.6667V21.6671Z"
                              fill="#515EDB"
                            />
                          </g>
                          <defs>
                            <clipPath id="clip0_1738_23988">
                              <rect width="40" height="40" fill="white" />
                            </clipPath>
                          </defs>
                        </svg>
                        <span className=" text-primaryMain font-medium">
                          Select an image
                        </span>
                      </label>
                    ) : (
                      <label
                        className="flex gap-3 cursor-pointer w-[30rem] rounded-lg overflow-hidden "
                        htmlFor="fileUpload"
                      >
                        <img
                          src={imagePreview}
                          alt=""
                          className="h-56 w-full object-cover"
                        />
                      </label>
                    )}
                    {typeError && (
                      <p className="text-errorColor text-sm mt-2">
                        This type isn't supported, Only jpg, jpeg, png formate
                        are supported
                      </p>
                    )}

                    {!typeError && !file && (
                      <p className="text-blackLow text-sm mt-2">
                        Only jpg, jpeg, png formate are supported
                      </p>
                    )}
                  </div>

                  {file && (
                    <div className="flex gap-3 mt-2">
                      <div className="w-[30rem] flex items-center gap-4">
                        <p>
                          {file?.name?.length > 40
                            ? file?.name?.slice(0, 40) + "...."
                            : file?.name}
                        </p>
                        <button
                          className="w-6 h-6 flex items-center justify-center rounded-full bg-errorMidColor"
                          onClick={handleDeleteFile}
                        >
                          <span className="material-symbols-outlined text-sm text-whiteHigh">
                            close
                          </span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                {/* category Name:  */}
                <div>
                  <p className="font-semibold">Select a Category</p>
                  <div className="flex items-center flex-wrap gap-2 mt-4">
                    {allCategories?.map((category) => (
                      <button
                        className={`px-4 py-2 border ${
                          selectedCategory?.name === category?.name
                            ? "border-primaryMain"
                            : "border-whiteLow"
                        } rounded-full cursor-pointer`}
                        key={category?.id}
                        type="button"
                        onClick={() => handleCategoryChange(category)}
                      >
                        {category?.name}
                      </button>
                    ))}
                  </div>
                </div>
                {/* color  */}
                <div className="w-full">
                  <p className="font-semibold">Select a Color</p>
                  <div className="flex items-center flex-wrap gap-2 w-full mt-4">
                    {colors?.map((color) => (
                      <label
                        htmlFor={color?.color}
                        className={`block w-10 h-10 border ${
                          selectedColor?.color === color?.color
                            ? "border-primaryMain scale-125"
                            : "border-whiteLow"
                        } rounded-full cursor-pointer`}
                        key={color?.id}
                        style={{ backgroundColor: color?.color }}
                      >
                        <input
                          type="radio"
                          name="color"
                          onChange={() => handleColorChange(color)}
                          id={color?.color}
                          className="absolute opacity-0 invisible"
                        />
                      </label>
                    ))}
                  </div>
                </div>

                {/* submit button  */}

                <div className="flex items-center gap-3 mt-10">
                  <button
                    type="submit"
                    className="px-6 py-4 text-center capitalize text-whiteHigh font-medium bg-primaryMain rounded-full"
                    data-hs-overlay={
                      !selectedCategory?.id || !selectedColor?.id
                        ? "test"
                        : "#wallpaper-modal"
                    }
                  >
                    Add Wallpaper
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
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
    </>
  );
}

export default WallpaperModal;
