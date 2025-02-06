import React, { useState } from "react";
import { LuPlus } from "react-icons/lu";
import BlogModal from "./BlogModal";
import BlogTable from "./BlogTable";

const AddTips = ({ onOpen }) => {
  return (
    <div
      className="w-40 h-[45px] bg-dashboard flex items-center justify-center rounded gap-2 text-white cursor-pointer"
      onClick={onOpen}
    >
      <LuPlus color="white" size={20} />
      <p>Add Blog</p>
    </div>
  );
};

export default function Blogs() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="flex flex-col mx-14 mt-24">
      <div className="flex items-center justify-between ">
        <h2 className="text-[20px] font-medium">All Blogs</h2>
        <AddTips onOpen={() => setIsModalOpen(true)} />
      </div>
      <BlogModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      ></BlogModal>
      <BlogTable />
    </div>
  );
}
