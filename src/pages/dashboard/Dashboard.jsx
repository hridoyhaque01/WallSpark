import React from "react";
import Masonry from "react-responsive-masonry";
import DashboardTopCard from "../../components/cards/DashboardTopCard";
import EmptyScreen from "../../components/shared/loaders/EmptyScreen";
import SearchLoader from "../../components/shared/loaders/SearchLoader";
import { useCategory } from "../../contexts/CategoryContext/CategoryContext";
import { useWallpaper } from "../../contexts/WallpaperContext/WallpaperContext";

export default function Dashboard() {
  const {
    allCategories,
    isLoading: categoryLoading,
    isError: categoryError,
  } = useCategory();
  const {
    allWallpapers,
    isLoading: wallpaperLoading,
    isError: wallpaperError,
  } = useWallpaper();

  const categories = allCategories?.map((item, i) => {
    return { name: item?.name, count: 0, id: i + 1 };
  });

  allWallpapers?.forEach((wallpaper) => {
    const categoryIndex = categories.findIndex(
      (category) => category?.name === wallpaper?.tag
    );
    if (categoryIndex !== -1) {
      categories[categoryIndex].count++;
    }
  });

  const data = [
    {
      title: "Total Wallpapers",
      number: allWallpapers?.length,
      color: "bg-primaryMain",
    },
    {
      title: "Total Category",
      number: allCategories?.length,
      color: "bg-secondaryMainLight",
    },
  ];

  const colorsArray = [
    "#447878",
    "#779977",
    "#4B2C34",
    "#5B305A",
    "#9A4C68",
    "#E04B5A",
    "#E49756",
    "#0C81F6",
    "#425E92",
    "#5FE1D9",
    "#0478A7",
    "#FE6836",
    "#B3E061",
    "#0093A9",
    "#F68297",
    "#A2EFDB",
  ];

  function getRandomColorFromArray(colorsArray) {
    const randomIndex = Math.floor(Math.random() * colorsArray.length);
    return colorsArray[randomIndex];
  }

  let content = null;

  if (categoryLoading || wallpaperLoading) {
    content = <SearchLoader></SearchLoader>;
  } else if (categoryError || wallpaperError) {
    content = (
      <div className="bg-whiteHigh p-8 text-errorColor">
        Something went wrong!
      </div>
    );
  } else if (categories?.length === 0) {
    content = <EmptyScreen></EmptyScreen>;
  } else if (categories?.length > 0) {
    content = (
      <Masonry columnsCount={4} gutter="20px">
        {categories?.map((category, i) => {
          const rowNumber = Math.floor(i / 4); // Assuming there are 4 columns in the Masonry layout
          const isRowEven = rowNumber % 2 === 0 ? true : false;
          console.log(isRowEven);
          const height =
            i % 2 === 0
              ? isRowEven
                ? "h-48 "
                : "h-20"
              : !isRowEven
              ? "h-48 "
              : "h-20";
          return (
            <div
              className={`w-full flex items-center justify-center rounded-lg ${height}`}
              key={category?.id}
              style={{
                backgroundColor: getRandomColorFromArray(colorsArray),
              }}
            >
              <div className="flex items-center justify-between w-full px-8 text-whiteHigh text-xl font-medium">
                <p>{category?.name}</p>
                <p>{category?.count}</p>
              </div>
            </div>
          );
        })}
      </Masonry>
    );
  }

  return (
    <div className="w-full overflow-auto pt-10 pb-32 pr-10">
      <div className="flex flex-col justify-around pty-10 gap-4 w-full">
        {/* 4 top cards */}
        <section className="flex justify-between gap-8 px-4">
          {data.map((data, index) => (
            <DashboardTopCard data={data} key={index}></DashboardTopCard>
          ))}
        </section>
        <div className="mt-10">
          <h2 className="text-2xl text-blackHigh font-bold leading-none capitalize">
            Wallpaper Categories
          </h2>
          <div className="mt-5 py-4">{content}</div>
        </div>
      </div>
    </div>
  );
}
