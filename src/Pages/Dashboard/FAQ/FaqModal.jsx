import { IoMdCloseCircleOutline, IoMdCloseCircle } from "react-icons/io";
// import ContentsForm from "./ContentsForm";
import { Button } from "antd";
import FaqForm from "./FaqForm";

const FaqModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const handleBackdropClick = (e) => {
    e.stopPropagation();
    onClose();
  };

  const handleModalClick = (e) => {
    e.stopPropagation();
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
      onClick={handleBackdropClick}
    >
      <div
        className="bg-gray-100 p-10  rounded-2xl shadow-lg w-[800px] h-[600px] relative"
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
        <div className="w-full h-auto flex justify-between">
          <h2 className="text-lg font-semibold">Adding New FAQs</h2>
        </div>

        <FaqForm />
      </div>
    </div>
  );
};

export default FaqModal;
