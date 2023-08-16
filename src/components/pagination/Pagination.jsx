export const Pagination = ({
  currentPage,
  setCurrentPage,
  rowsPerPage,
  setRowsPerPage,
  totalRows,
}) => {
  const handleIncrement = () => {
    if (currentPage * rowsPerPage >= totalRows) {
      return;
    } else {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handleDecrement = () => {
    if (currentPage <= 1) {
      return;
    } else {
      setCurrentPage((prev) => prev - 1);
    }
  };

  // console.log(totalRows);

  const handleItemsPerPage = (value) => {
    setCurrentPage(1);
    setRowsPerPage(value);
  };

  return (
    <section className="flex items-center justify-end gap-4 py-4 text-darkHigh">
      {/* <div>{renderPagination()}</div> */}

      <div className="flex items-center gap-2">
        <p className="font-semibold">Item per page:</p>
        <div className="dropdown dropdown-top dropdown-end">
          <label
            tabIndex={3}
            className="rounded-lg px-2 py-2 border border-blackLow  cursor-pointer flex items-center"
          >
            {rowsPerPage} &nbsp;
            <span className="material-symbols-outlined">arrow_drop_down</span>
          </label>
          <ul
            tabIndex={3}
            className="dropdown-content menu p-1 mt-2 m-0.5 shadow bg-whiteHigh rounded-md"
          >
            <li>
              <p onClick={() => handleItemsPerPage(10)} className="py-1">
                10
              </p>
            </li>
            <hr className="text-disabledColor opacity-10" />
            <li>
              <p onClick={() => handleItemsPerPage(25)} className="py-1">
                25
              </p>
            </li>
            <hr className="text-disabledColor opacity-10" />
            <li>
              <p onClick={() => handleItemsPerPage(50)} className="py-1">
                50
              </p>
            </li>
          </ul>
        </div>
      </div>
      <div>
        {/* <p>
          {Math.min(rowsPerPage * currentPage - rowsPerPage + 1, totalRows)} -{" "}
          {Math.min(rowsPerPage * currentPage, totalRows)} of {totalRows}
        </p> */}
        <p>
          {currentPage} - {Math.min(rowsPerPage * currentPage, totalRows)} of{" "}
          {totalRows}
        </p>
      </div>
      <div className="flex items-center gap-3">
        <button type="button" onClick={handleDecrement}>
          <span className="material-symbols-outlined">chevron_left</span>
        </button>
        <button type="button" onClick={handleIncrement}>
          <span className="material-symbols-outlined">chevron_right</span>
        </button>
      </div>
    </section>
  );
};
