import React from "react";
import { Table, Spin, Tag } from "antd";
import { useGetAllSubscriptionQuery } from "../../redux/apiSlices/subscriptionSlice";
// import { useGetAllSubscriptionQuery } from "../../redux/apiSlices/subscriptionSlice";

const Subscription = () => {
  const { data, isLoading } = useGetAllSubscriptionQuery();
  console.log(data?.data?.subscriptions);

  if (isLoading) {
    return <Spin size="large" className="flex justify-center mt-10" />;
  }

  if (!data?.data || data.data.length === 0) {
    return (
      <p className="text-center text-gray-500 mt-10">
        No subscription data found
      </p>
    );
  }


  const columns = [
    {
      title: "Serial No",
      dataIndex: "serial",
      key: "serial",
      render: (text, record, index) => index + 1,
    },
    {
      title: "Package",
      dataIndex: "package",
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
      dataIndex: "startDate",
      key: "startDate",
    },
    {
      title: "End Date",
      dataIndex: "endDate",
      key: "endDate",
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


  const tableData = data?.data?.subscriptions.map((item, index) => ({
    key: index,
    package: item.package.title,
    price: item.price,
    trxId: item.trxId,
    startDate: new Date(item.currentPeriodStart).toLocaleDateString(),
    endDate: new Date(item.currentPeriodEnd).toLocaleDateString(),
    status: item.status,
  }));

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-4">Subscription History</h2>
      <Table
        columns={columns}
        dataSource={tableData}
        pagination={{ pageSize: 10 }}
      />
    </div>
  );
};

export default Subscription;
