import React from "react";
import { IoMdCloseCircleOutline, IoMdCloseCircle } from "react-icons/io";
import ModalForm from "./BlogForm";

const BlogModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const handleBackdropClick = (e) => {
    e.stopPropagation();
    onClose();
  };

  const handleModalClick = (e) => {
    e.stopPropagation(); // Prevent closing when clicking inside modal
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
      onClick={handleBackdropClick}
    >
      <div
        className="bg-gray-100 p-10  rounded-2xl shadow-lg w-[1000px] h-[700px] relative"
        onClick={handleModalClick}
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-600 hover:text-black"
        >
          <IoMdCloseCircleOutline
            size={26}
            className="fill-gray-600 hover:fill-black transition-colors duration-200"
          />
        </button>
        <h2 className="text-lg font-semibold">Adding New Blogs</h2>
        <ModalForm />
      </div>
    </div>
  );
};

export default BlogModal;
