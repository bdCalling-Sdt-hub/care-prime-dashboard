import React, { useState } from "react";
import { Table } from "antd";
import { RiDeleteBin6Line, RiEdit2Fill } from "react-icons/ri";
import medical from "../../../assets/medical.png";

export default function MedicalHistTable() {
  const [data, setData] = useState([
    {
      key: "1",
      slno: 1,
      image: medical,
      overview: "Edit",
      categoryname: "Medications, Food or Other Allergies",
    },
    {
      key: "2",
      slno: 2,
      image: medical,
      overview: "Edit",
      categoryname: "Chronic Conditions",
    },
    {
      key: "3",
      slno: 3,
      image: medical,
      overview: "Edit",
      categoryname: "Past Surgeries",
    },
  ]);

  // Delete function when clicking on RiEdit2Fill
  const handleDelete = (key) => {
    setData((prevData) => prevData.filter((item) => item.key !== key));
  };

  const columns = [
    {
      title: "Sl No.",
      dataIndex: "slno",
      key: "slno",
      width: "200px",
      render: (slno) => <p className="text-[#929394]"> {slno}</p>,
    },
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      render: (image) => (
        <img src={image} width={50} height={50} alt="Medical" />
      ),
      width: "200px",
    },
    {
      title: "Category Name",
      dataIndex: "categoryname",
      key: "categoryname",
      width: "1000px",
      render: (categoryname) => (
        <p className="text-[#929394]"> {categoryname}</p>
      ),
    },
    {
      title: "Overview",
      dataIndex: "overview",
      key: "overview",
      width: "200px",
      render: () => (
        <h2 className="bg-[#eceffd] inline-block px-7 py-3 rounded-xl text-dashboard font-semibold text-[16px] cursor-pointer">
          Details
        </h2>
      ),
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (_, record) => (
        <div className="flex gap-5">
          <RiEdit2Fill color="#5b52a3" size={24} className="cursor-pointer" />
          <RiDeleteBin6Line
            color="red"
            size={24}
            className="cursor-pointer"
            onClick={() => handleDelete(record.key)}
          />
        </div>
      ),
    },
  ];

  return (
    <div className="mt-10">
      <Table dataSource={data} columns={columns} pagination={false} />
    </div>
  );
}
