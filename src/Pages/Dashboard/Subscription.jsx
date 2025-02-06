import React, { useEffect, useState } from "react";
import card1 from "../../assets/SUBS1.jpg";
import card2 from "../../assets/SUBS2.png";
import card3 from "../../assets/SUBS3.png";
import { FaCircleCheck } from "react-icons/fa6";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import { Card, Space, Button } from "antd";

const text = [
  { id: 1, des: "But I must explain to you how all" },
  { id: 2, des: "But I must explain to you how all" },
  { id: 3, des: "But I must explain to you how all" },
  { id: 3, des: "But I must explain to you how all" },
];

const List = () => {
  return (
    <ul className="flex flex-col items-center gap-y-1.5 mt-5">
      {text.map((item) => (
        <li key={item.id} className="text-[12px] text-[c4c6ca] list-disc ">
          {item.des}
        </li>
      ))}
    </ul>
  );
};
const SubscriptionCard = () => {
  return (
    <Space direction="vertical" size={16}>
      <Card
        title={
          <div className="flex flex-col items-center gap-2 mt-6">
            <p className=" text-[16px] font-semibold">1 Month Interval</p>
            <p className="text-dashboard text-[24px]">Price: $10</p>
          </div>
        }
        style={{
          width: 245,
          height: 366,
          backgroundColor: "#f6faff",
          borderRadius: "16px",
        }}
      >
        <div className="h-[200px] flex flex-col items-center justify-between">
          <List />
          <Button
            className="rounded-[12px] px-14 py-5 mt-5"
            style={{
              backgroundColor: "#e5e7eb",
              color: "",
              border: "",
              transition: "background-color 0.3s ease",
            }}
            onMouseEnter={(e) => (
              (e.target.style.backgroundColor = "#023f86"),
              (e.target.style.color = "#ffffff"),
              (e.target.style.border = "#ffffff")
            )}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = "#e5e7eb";
              e.target.style.color = "#000000";
              e.target.style.border = "1px solid transparent";
            }}
          >
            Edit Details
          </Button>
        </div>
      </Card>
    </Space>
  );
};
const Subscription = () => {
  return (
    <div className="mx-14 mt-24">
      {/* header */}
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold flex items-center gap-1">
          <IoArrowBackCircleOutline size={26} className="cursor-pointer" />
          Subscription Plans
        </h1>
        {/* <button className="bg-dashboard text-white h-10 px-4 rounded-md">
          Create Subscription
        </button> */}
      </div>
      <div className="w-full flex items-start justify-between gap-3 mt-8 flex-wrap">
        <SubscriptionCard />
        <SubscriptionCard />
        <SubscriptionCard />
        <SubscriptionCard />
        <SubscriptionCard />
        <SubscriptionCard />
      </div>
    </div>
  );
};

export default Subscription;
