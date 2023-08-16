import { collection, getDocs } from "firebase/firestore";
import { createContext, useContext, useEffect, useState } from "react";
import { firebaseFirestore } from "../../firebase/firebase.config";

const TrendingContext = createContext();

export const useTrending = () => {
  return useContext(TrendingContext);
};

export const TrendingProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [allTrending, setAllTrending] = useState([]);
  const [isError, setIsError] = useState(false);
  const [searchBarValue, setSearchBarValue] = useState("");
  const [filteredTrending, setFilteredTrending] = useState([]);
  // pagination

  //   const [currentPage, setCurrentPage] = useState(1);
  //   const [rowsPerPage, setRowsPerPage] = useState(10);
  //   const indexOfLastRow = currentPage * rowsPerPage;
  //   const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  //   const trending = filteredTrending?.slice(indexOfFirstRow, indexOfLastRow);

  const filterTrendingBySearch = (e) => {
    const searchValue = e.target.value;

    const filterTrending = allTrending?.filter((wallpaper) =>
      searchValue !== ""
        ? wallpaper?.tag?.toLowerCase().startsWith(searchValue)
        : true
    );
    setFilteredTrending(filterTrending);
    setSearchBarValue(searchValue);
  };

  const fetchTrending = async () => {
    const ref = collection(firebaseFirestore, "data");
    try {
      const querySnapshot = await getDocs(ref);
      const data = querySnapshot?.docs?.map((doc) => doc?.data());
      const sortedArray = data?.sort((a, b) => {
        return b?.viewCount - a?.viewCount;
      });
      setAllTrending(sortedArray?.slice(0, 12));
      setFilteredTrending(sortedArray?.slice(0, 12));
      setIsLoading(false);
      setIsError(false);
    } catch (error) {
      setIsLoading(false);
      setIsError(true);
      console.log(error);
    }
  };

  useEffect(() => {
    fetchTrending();
  }, []);

  const value = {
    isLoading,
    allTrending,
    isError,
    filteredTrending,
    filterTrendingBySearch,
    searchBarValue,
  };

  return (
    <TrendingContext.Provider value={value}>
      {children}
    </TrendingContext.Provider>
  );
};
