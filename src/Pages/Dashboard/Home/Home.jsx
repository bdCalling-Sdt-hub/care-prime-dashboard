// import React from "react";
// import { FaUserGroup } from "react-icons/fa6";
// import LineChartOne from "../../Layout/Main/LineChartOne";
// import { GoDotFill } from "react-icons/go"; 

// const CustomLegend = () => {
//     return (
//       <div className="absolute -top-80 right-4 flex gap-4 items-center bg-white p-2 rounded-md shadow-md">
//         <div className="flex items-center gap-1">
//           <GoDotFill className="text-[#8884d8]" />
//           <p className="text-sm text-gray-700">Total Users</p>
//         </div>
//         <div className="flex items-center gap-1">
//           <GoDotFill className="text-[#82ca9d]" />
//           <p className="text-sm text-gray-700">Active Users</p>
//         </div>
//       </div>
//     );
//   };

// const Home = ()=>{ 
    

//     return (
//         <div> 

//                                     {/* Dashboard Header */}
//                                     <h1 className='text-2xl font-semibold '>Dashboard Overview</h1>

//             <div className="grid grid-cols-4 gap-6 h-[120px]"> 

//                 <div className='bg-white rounded-lg py-0 px-6 flex items-center justify-between gap-4'>  
//                     <div className="flex items-center gap-3"> 

//                     <div className=" w-10 h-10 rounded-full bg-[#EFEFEF] flex items-center justify-center "> 

//                     <FaUserGroup color="#007BA5" className="" size={24} />
//                     </div>
//                     <h2 className="text-center text-2xl text-base ">Total User</h2>

//                     </div>
//                     <h3 className="text-center text-primary text-[32px] font-semibold">$10</h3>
//                 </div>

//                 <div className='bg-white rounded-lg py-0 px-6 flex items-center justify-between gap-4'>  
//                     <div className="flex items-center gap-3"> 

//                     <div className=" w-10 h-10 rounded-full bg-[#EFEFEF] flex items-center justify-center "> 

//                     <FaUserGroup color="#007BA5" className="" size={24} />
//                     </div>
//                     <h2 className="text-center text-2xl text-base ">Total Subscriber</h2>

//                     </div>
//                     <h3 className="text-center text-primary text-[32px] font-semibold">$10</h3>
//                 </div>
                
//                 <div className='bg-white rounded-lg py-0 px-6 flex items-center justify-between gap-4'>  
//                     <div className="flex items-center gap-3"> 

//                     <div className=" w-10 h-10 rounded-full bg-[#EFEFEF] flex items-center justify-center "> 

//                     <FaUserGroup color="#007BA5" className="" size={24} />
//                     </div>
//                     <h2 className="text-center text-2xl text-base ">Total Revenue</h2>

//                     </div>
//                     <h3 className="text-center text-primary text-[32px] font-semibold">$10</h3>
//                 </div>

//                 <div className='bg-white rounded-lg py-0 px-6 flex items-center justify-between gap-4'>  
//                     <div className="flex items-center gap-3"> 

//                     <div className=" w-10 h-10 rounded-full bg-[#EFEFEF] flex items-center justify-center "> 

//                     <FaUserGroup color="#007BA5" className="" size={24} />
//                     </div>
//                     <h2 className="text-center text-2xl text-base ">Total Income</h2>

//                     </div>
//                     <h3 className="text-center text-primary text-[32px] font-semibold">$10</h3>
//                 </div>
//             </div> 


            
            
//                                     {/* Chart Section */}
//                                     <div className='w-full  p-4  bg-white rounded mt-4 '>
//                                         <h2 className='text-lg font-medium mb-2 py-3'>User Engagement</h2>
//                                         <CustomLegend/>
//                                         <LineChartOne />
//                                     </div>

         
     
//         </div>
//     );
// }

// export default Home;

import React from "react";
import { FaUserGroup } from "react-icons/fa6";
import LineCharts from "./LineCharts";
import BarCharts from "./BarCharts";
import { GoDotFill } from "react-icons/go"; 
import Filter from './Filter';
import { TbUsersGroup } from "react-icons/tb";
// import { FaRegMoneyBill1 } from "react-icons/fa6";
import { RiMoneyDollarCircleLine } from "react-icons/ri";
import { ImBooks } from "react-icons/im";

const stats = [
  { label: "Total User", value: "1000" },
  { label: "Total Subscriber", value: "1200" },
  { label: "Total Revenue", value: "$106" },
  { label: "Total Chapters", value: "106" },
];

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
  return (
    <div>
      {/* Dashboard Header */}
      {/* <h1 className="text-2xl font-semibold">Dashboard Overview</h1> */}

      {/* Stats Cards */}
      <div className="grid grid-cols-4 gap-6 h-[120px]">
  {stats.map((stat, index) => (
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
