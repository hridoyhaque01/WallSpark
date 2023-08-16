import imageCompression from "browser-image-compression";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { createContext, useContext, useEffect, useState } from "react";
import { firebaseFirestore, storage } from "../../firebase/firebase.config";

const WallpaperContext = createContext();

export const useWallpaper = () => {
  return useContext(WallpaperContext);
};

export const WallpaperProvider = ({ children }) => {
  const [isRequestLoading, setIsRequestLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [allWallpapers, setAllWallpapers] = useState([]);
  const [isError, setIsError] = useState(false);
  const [searchBarValue, setSearchBarValue] = useState("");
  const [filteredWallpapers, setFilteredWallpapers] = useState([]);
  // pagination

  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const wallpapers = filteredWallpapers?.slice(indexOfFirstRow, indexOfLastRow);

  const filterWallpapersBySearch = (e) => {
    const searchValue = e.target.value;

    const filterWallpapers = allWallpapers?.filter((wallpaper) =>
      searchValue !== ""
        ? wallpaper?.tag?.toLowerCase().startsWith(searchValue)
        : true
    );
    setFilteredWallpapers(filterWallpapers);
    setSearchBarValue(searchValue);
  };

  const colors = [
    {
      id: 1,
      color: "#FF0000",
      name: "Red",
    },
    {
      id: 2,
      color: "#FFDD60",
      name: "Yellow",
    },
    {
      id: 3,
      color: "#000000",
      name: "Black",
    },
    {
      id: 4,
      color: "#2D8EFF",
      name: "Blue",
    },
    {
      id: 5,
      color: "#FFC0CB",
      name: "Pink",
    },
    {
      id: 6,
      color: "#A020F0",
      name: "Purple",
    },
    {
      id: 7,
      color: "#964B00",
      name: "Brown",
    },
    {
      id: 8,
      color: "#4CAF50",
      name: "Green",
    },
    {
      id: 9,
      color: "#FF5722",
      name: "Orange",
    },
    {
      id: 10,
      color: "#FFFFFF",
      name: "White",
    },
  ];

  const fetchWallpapers = async () => {
    const ref = collection(firebaseFirestore, "data");
    getDocs(ref)
      .then((res) => {
        const data = res?.docs?.map((doc) => ({
          ...doc?.data(),
        }));
        setAllWallpapers(data);
        setFilteredWallpapers(data);
        setIsLoading(false);
        setIsError(false);
      })
      .catch((err) => {
        setIsLoading(false);
        setIsError(true);
        console.log(err);
      });
  };

  const getImageUrl = async (file) => {
    try {
      const storageRef = ref(storage, `files/${Date.now()}-${file?.name}`);
      const compressedFile = await imageCompression(file, {
        maxSizeMB: 0.058,
        maxIteration: 30,
      });
      const uploadResult = await uploadBytes(storageRef, compressedFile);
      const downloadUrl = await getDownloadURL(
        ref(storage, uploadResult?.ref?.fullPath)
      );
      return downloadUrl;
    } catch (error) {
      throw error;
    }
  };

  const uploadWallpaper = async (data) => {
    const { file, artistName, tag, color, viewCount, imageUrl } = data || {};
    setIsRequestLoading(true);
    try {
      const id = Date.now().toString();
      const ref = doc(firebaseFirestore, "data", id);
      const timestamp = serverTimestamp();
      const thumbnailUrl = await getImageUrl(file);
      await setDoc(ref, {
        artistName,
        thumbnailUrl,
        tag,
        color,
        viewCount,
        imageUrl,
        imageId: id,
        timestamp,
      });
      setAllWallpapers((prev) => [
        ...prev,
        {
          artistName,
          thumbnailUrl,
          tag,
          color,
          viewCount,
          imageUrl,
          imageId: id,
          timestamp,
        },
      ]);
      setFilteredWallpapers((prev) => [
        ...prev,
        {
          artistName,
          thumbnailUrl,
          tag,
          color,
          viewCount,
          imageUrl,
          imageId: id,
          timestamp,
        },
      ]);
      setIsRequestLoading(false);
    } catch (error) {
      console.log(error);
      setIsRequestLoading(false);
      throw error;
    }
  };

  const handleDelete = async (item) => {
    setIsRequestLoading(true);
    const { imageId: id } = item || {};
    try {
      const ref = doc(firebaseFirestore, "data", id);
      await deleteDoc(ref);
      setAllWallpapers((prevWallpapers) =>
        prevWallpapers.filter((item) => item.imageId !== id)
      );
      setFilteredWallpapers((prevWallpapers) =>
        prevWallpapers.filter((item) => item.imageId !== id)
      );
      setIsRequestLoading(false);
    } catch (error) {
      console.log(error);
      setIsRequestLoading(false);
      throw error;
    }
  };

  useEffect(() => {
    fetchWallpapers();
  }, []);

  const value = {
    wallpapers,
    isLoading,
    isError,
    currentPage,
    setCurrentPage,
    rowsPerPage,
    setRowsPerPage,
    indexOfLastRow,
    indexOfFirstRow,
    allWallpapers,
    filterWallpapersBySearch,
    filteredWallpapers,
    searchBarValue,
    uploadWallpaper,
    colors,
    handleDelete,
    isRequestLoading,
  };

  return (
    <WallpaperContext.Provider value={value}>
      {children}
    </WallpaperContext.Provider>
  );
};
