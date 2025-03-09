
import { Table, Spin, Tag } from "antd";
import { useGetAllSubscriptionQuery } from "../../redux/apiSlices/subscriptionSlice";
import { imageUrl } from "../../redux/api/baseApi";
import React, { useState } from "react";
import moment from "moment";
// import { useGetAllSubscriptionQuery } from "../../redux/apiSlices/subscriptionSlice";

const Subscription = () => {
   const [image, setImage] = useState(null);
   const [imagePreview, setImagePreview] = useState(null);
  const { data, isLoading } = useGetAllSubscriptionQuery();
  console.log(data?.data?.subscriptions);

   const tableData = data?.data?.subscriptions;

  const columns = [
    {
      title: "Serial No",
      dataIndex: "serial",
      key: "serial",
      render: (text, record, index) => index + 1,
    },
    {
      title: "Image",
      dataIndex: ["user", "profile"],
      key: "image",
      render: (text) => (
        <img
          className="w-28 h-16 rounded-xl object-cover"
          src={text?.startsWith("http") ? text : `${imageUrl}/${text}`}
          alt=""
        />
      ),
    },
    {
      title: "user",
      dataIndex: ["user", "name"],
      key: "user",
    },
    {
      title: "Package",
      dataIndex: ["package", "title"],
      key: "package",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (price) => `$${price}`,
    },
    {
      title: "Trx ID",
      dataIndex: "trxId",
      key: "trxId",
    },
    {
      title: "Start Date",
      dataIndex: "currentPeriodStart",
      key: "currentPeriodStart",
      render: (text) => <p>{moment(text).format("L")}</p>,
    },
    {
      title: "End Date",
      dataIndex: "currentPeriodEnd",
      key: "currentPeriodEnd",
      render: (text) => <p>{moment(text).format("L")}</p>,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <Tag color={status === "active" ? "green" : "red"}>
          <p className="font-bold"> {status.toUpperCase()}</p>
        </Tag>
      ),
    },
  ];

  return (
    <div className="">
      <h2 className="text-xl font-semibold mb-4">Subscription History</h2>
      <Table
        columns={columns}
        dataSource={tableData}
        loading={isLoading}
        pagination={{ pageSize: 10 }}
      />
    </div>
  );
};

export default Subscription;
