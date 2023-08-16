import React from "react";

const PhotoModal = ({ url }) => {
  return (
    <div>
      <input type="checkbox" id="photoModal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box w-11/12 max-w-5xl flex flex-col items-center justify-center gap-4">
          <img className="h-full rounded-xl" src={url} alt="" />
          <div>
            <label
              htmlFor="photoModal"
              className="btn btn-sm py-2 px-8 rounded-full bg-primaryMain border-primaryMain text-whiteHigh hover:text-primaryMain hover:bg-whiteHigh hover:border-primaryMain "
            >
              Close
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhotoModal;
