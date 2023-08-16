import React from "react";
import EmptyScreen from "../../components/shared/loaders/EmptyScreen";
import SearchLoader from "../../components/shared/loaders/SearchLoader";
import SearchBar from "../../components/shared/search/SearchBar";
import { useTrending } from "../../contexts/trendingContext/TrendingContext";

function Trending() {
  const {
    isLoading,
    isError,
    filteredTrending,
    filterTrendingBySearch,
    searchBarValue,
  } = useTrending();

  const handleSearch = (event) => {
    filterTrendingBySearch(event);
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
  } else if (!isLoading && !isError && filteredTrending?.length === 0) {
    content = <EmptyScreen></EmptyScreen>;
  } else if (!isLoading && !isError && filteredTrending?.length > 0) {
    content = (
      <div className="py-6 grid grid-cols-4 gap-6 ">
        {filteredTrending?.map((wallpaper) => (
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
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="overflow-auto w-full py-8 pr-6 h-full">
      <SearchBar
        tableName="Trending Wallpapers"
        onChange={handleSearch}
        value={searchBarValue}
      ></SearchBar>
      <div className="bg-whiteHigh shadow-md p-8 rounded-b-lg">
        <div>{content}</div>
        {/* {filteredTrending?.length > 0 && (
          <div className="pr-10">
            <Pagination
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              rowsPerPage={rowsPerPage}
              setRowsPerPage={setRowsPerPage}
              totalRows={filteredCategories?.length}
            ></Pagination>
          </div>
        )} */}
      </div>
    </div>
  );
}

export default Trending;
