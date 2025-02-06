import React, { useState } from "react";
import { RiDeleteBin6Line, RiEdit2Fill } from "react-icons/ri";
import { LuPlus } from "react-icons/lu";
import { Table } from "antd";
import { color } from "chart.js/helpers";
import doctor from "../../assets/doctor.png";

const AddTips = () => {
  return (
    <div className="w-40 h-[45px] bg-dashboard flex items-center justify-center rounded gap-2 text-white cursor-pointer">
      <LuPlus color="white" size={20} />
      <p>Add Tips</p>
    </div>
  );
};

const Text = () => {
  return (
    <p className="break-words text-[#929394]">
      Lorem ipsum dolor, sit amet consectetur adipisicing elit. Iusto amet quod
      non blanditiis beatae asperiores vel nihil debitis dolores ullam! Aliquam
      veritatis aliquid velit temporibus ullam optio consequatur nostrum aut?
    </p>
  );
};

export default function Insight() {
  const [data, setData] = useState([
    {
      key: "1",
      date: "20-03-2024",
      description: <Text />,
      image: doctor,
    },
    {
      key: "2",
      date: "20-03-2024",
      description: <Text />,
      image: doctor,
    },
    {
      key: "3",
      date: "20-03-2024",
      description: <Text />,
      image: doctor,
    },
  ]);

  // Function to delete a row
  const handleDelete = (key) => {
    setData((prevData) => prevData.filter((item) => item.key !== key));
  };

  const columns = [
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      width: "170px",
      render: (date) => <p className="text-[#929394]"> {date}</p>,
    },
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      render: (image) => <img src={image} width={50} height={50} />,
      width: "150px",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Overview",
      dataIndex: "overview",
      key: "overview",
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
      width: "150px",
    },
  ];

  return (
    <div className="flex flex-col mx-14 mt-24">
      <div className="flex items-center justify-between ">
        <h2 className="text-[20px] font-medium">Insightful Tips</h2>
        <AddTips />
      </div>
      <div className="mt-10">
        <Table dataSource={data} columns={columns} pagination={false} />
      </div>
    </div>
  );
}
