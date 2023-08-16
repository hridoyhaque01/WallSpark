import imageCompression from "browser-image-compression";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  serverTimestamp,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { createContext, useContext, useEffect, useState } from "react";
import { firebaseFirestore, storage } from "../../firebase/firebase.config";
const CategoryContext = createContext();

export const useCategory = () => {
  return useContext(CategoryContext);
};

export const CategoryProvider = ({ children }) => {
  const [type, setType] = useState("");
  const [item, setItem] = useState({});
  const [isRequestLoading, setIsRequestLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [allCategories, setAllCategories] = useState([]);
  const [isError, setIsError] = useState(false);
  const [searchBarValue, setSearchBarValue] = useState("");
  const [filteredCategories, setFilteredCategories] = useState([]);
  const [isDeleteable, setIsDeletable] = useState(true);
  // pagination

  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const categories = filteredCategories?.slice(indexOfFirstRow, indexOfLastRow);

  const filterCategoriesBySearch = (e) => {
    const searchValue = e.target.value.trim().toLowerCase();

    const filterCategories = allCategories?.filter((category) =>
      searchValue !== ""
        ? category?.name?.toLowerCase().startsWith(searchValue)
        : true
    );
    setFilteredCategories(filterCategories);
    setSearchBarValue(searchValue);
  };

  const dropdownMenus = {
    activeAction: "active",
    bgColor: "bg-successLight",
    textColor: "text-successMain",
    actions: [
      {
        actionName: "edit",
        action: "edit",
        textColor: "text-warningMain",
        modalName: "#category-modal",
      },
      {
        actionName: "delete",
        action: "deleted",
        textColor: "text-errorColor",
      },
    ],
  };

  const getImageUrl = async (file) => {
    try {
      const storageRef = ref(storage, `files/${Date.now()}-${file?.name}`);
      const compressedFile = await imageCompression(file, {
        maxSizeMB: 1,
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

  // upload category

  const uploadCategory = async (data) => {
    const { file, name } = data || {};
    setIsRequestLoading(true);
    try {
      const id = Date.now().toString();
      const ref = doc(firebaseFirestore, "category", id);
      const timestamp = serverTimestamp();
      const imageUrl = await getImageUrl(file);
      await setDoc(ref, { name, imageUrl, id, timestamp });
      setAllCategories((prev) => [...prev, { name, imageUrl, id, timestamp }]);
      setFilteredCategories((prev) => [
        ...prev,
        { name, imageUrl, id, timestamp },
      ]);
      setIsRequestLoading(false);
    } catch (error) {
      setIsRequestLoading(false);
      throw error;
    }
  };

  // upload category

  const updateCategory = async (id, data) => {
    const { file, name } = data || {};
    setIsRequestLoading(true);
    try {
      const ref = doc(firebaseFirestore, "category", id);
      if (file?.name) {
        const imageUrl = await getImageUrl(data?.file);
        await updateDoc(ref, { imageUrl, name });
        setAllCategories((prevCategories) =>
          prevCategories.map((item) =>
            item.id === id ? { ...item, name, imageUrl } : item
          )
        );
        setFilteredCategories((prevCategories) =>
          prevCategories.map((item) =>
            item.id === id ? { ...item, name, imageUrl } : item
          )
        );
      } else {
        await updateDoc(ref, { name });
        setAllCategories((prevCategories) =>
          prevCategories.map((item) =>
            item.id === id ? { ...item, name } : item
          )
        );
        setFilteredCategories((prevCategories) =>
          prevCategories.map((item) =>
            item.id === id ? { ...item, name } : item
          )
        );
      }
      setIsRequestLoading(false);
    } catch (error) {
      console.log(error);
      setIsRequestLoading(false);
      throw error;
    }
  };

  const handleDelete = async (item) => {
    const { id } = item || {};
    setIsRequestLoading(true);
    try {
      const ref = doc(firebaseFirestore, "category", id);
      await deleteDoc(ref);
      setAllCategories((prevCategories) =>
        prevCategories.filter((item) => item.id !== id)
      );
      setFilteredCategories((prevCategories) =>
        prevCategories.filter((item) => item.id !== id)
      );
      setIsRequestLoading(false);
    } catch (error) {
      console.log(error);
      setIsRequestLoading(false);
      throw error;
    }
  };

  const fetchCategories = async () => {
    const ref = collection(firebaseFirestore, "category");
    getDocs(ref)
      .then((res) => {
        const data = res?.docs?.map((doc) => ({
          ...doc?.data(),
        }));
        setAllCategories(data);
        setFilteredCategories(data);
        setIsLoading(false);
        setIsError(false);
      })
      .catch((err) => {
        setIsLoading(false);
        setIsError(true);
        console.log(err);
      });
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const value = {
    allCategories,
    isLoading,
    isError,
    dropdownMenus,
    type,
    setType,
    item,
    setItem,
    uploadCategory,
    updateCategory,
    handleDelete,
    categories,
    filterCategoriesBySearch,
    filteredCategories,
    setFilteredCategories,
    currentPage,
    rowsPerPage,
    setCurrentPage,
    setRowsPerPage,
    isRequestLoading,
    isDeleteable,
    setIsDeletable,
  };

  return (
    <CategoryContext.Provider value={value}>
      {children}
    </CategoryContext.Provider>
  );
};
