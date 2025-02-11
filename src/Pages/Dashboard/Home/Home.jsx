import React from "react";
import { FaUserGroup } from "react-icons/fa6";
import LineCharts from "./LineCharts";
import BarCharts from "./BarCharts";
import { GoDotFill } from "react-icons/go"; 
import Filter from './Filter';
import { TbUsersGroup } from "react-icons/tb";
import { RiMoneyDollarCircleLine } from "react-icons/ri";
import { ImBooks } from "react-icons/im";
import { useSummaryQuery } from "../../../redux/apiSlices/homeSlice";

const CustomLegend = () => (


  <div className="top-4 right-4 flex gap-4 items-center bg-white py-1.5 px-2 rounded-md shadow-md">
    {[
      { color: "#8884d8", label: "Total Users" },
      { color: "#82ca9d", label: "Active Users" },
    ].map((item, index) => (
      <div key={index} className="flex items-center gap-1">
        <GoDotFill className={`text-[${item.color}]`} />
        <p className="text-sm text-gray-700">{item.label}</p>
      </div>
    ))}
  </div>
);

const Home = () => {
  const { data: summary } = useSummaryQuery();
  console.log(summary?.data?.summary)
  const stats = summary?.data?.summary;
  const formattedData = Object.entries(stats).map(([key, value]) => ({
    label: key
      .replace(/([A-Z])/g, " $1")
      .replace(/^./, (str) => str.toUpperCase()),
    value: value,
  }));
  console.log(formattedData);
  return (
    <div>
      {/* Dashboard Header */}
      {/* <h1 className="text-2xl font-semibold">Dashboard Overview</h1> */}

      {/* Stats Cards */}
      <div className="grid grid-cols-4 gap-6 h-[120px]">
  {formattedData.map((stat, index) => (
    <div key={index} className="bg-white rounded-lg py-4 px-6 flex flex-col justify-center items-center">
      <div className="flex items-center justify-center gap-3 w-full ">
        <div className="w-14 h-14 rounded-full bg-[#EFEFEF] flex items-center justify-center">
          {stat.label === "Total User" ? (
            <FaUserGroup opacity={0.5} color="#023f86" size={24} />
          ) : stat.label === "Total Subscriber" ? (
            <TbUsersGroup opacity={0.5} color="#023f86" size={24} />
          ) : stat.label === "Total Revenue" ? (
            <RiMoneyDollarCircleLine opacity={0.5} color="#023f86" size={24} />
          ) : (
            <ImBooks opacity={0.5} color="#023f86" size={24} />
          )}
        </div>

        {/* Text section, aligned vertically */}
        <div className="flex flex-col justify-start">
          <h2 className="text-base">{stat.label}</h2>
          <h3 className="text-slate-600 text-[32px] font-semibold">{stat.value}</h3>
        </div>
      </div>
    </div>
  ))}
</div>



      {/*Line Chart Section */}
      <div className="w-full p-4 bg-white rounded mt-4 relative ">
        <h2 className="text-lg font-medium mb-2 py-2">User Engagement</h2>
        <div className="flex items-center justify-end gap-4 absolute top-7 right-5">
            <CustomLegend />
            <Filter/>
        </div>
        <LineCharts />
        
      </div>

        {/*Bar Chart Section */}
      <div className='mt-4'>
      <BarCharts/>
      </div>
    </div>
  );
};

export default Home;
