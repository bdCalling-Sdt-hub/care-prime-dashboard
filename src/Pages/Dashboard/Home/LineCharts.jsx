// import React from "react";
// import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend,  } from 'recharts';
// import { GoDotFill } from "react-icons/go";

// export default function CustomLineChart() {
//   const data = [
//     {
//       name: 'Mo',
      
//       pv: 2400,
//       amt: 3000,
//     },
//     {
//       name: 'Tu',
     
//       pv: 1398,
//       amt: 2500,
//     },
//     {
//       name: 'We',
      
//       pv: 9800,
//       amt: 2000,
//     },
//     {
//       name: 'Th',
      
//       pv: 3908,
//       amt: 1500,
//     },
//     {
//       name: 'Fr',
      
//       pv: 4800,
//       amt: 1000,
//     },
//     {
//       name: 'St',
      
//       pv: 3800,
//       amt: 500,
//     },
//     {
//       name: 'Su',
      
//       pv: 4300,
//       amt: 0,
//     },
//   ];

//   const TotalUsers = ()=>{
//     return (
//       <div>
//         <GoDotFill />
//         <p>Total Users</p>
//       </div>
//     )
//   }

//   const ActiveUsers = ()=>{
//     return (
//       <div>
//         <GoDotFill size={5}/>
//         <p>Active Users</p>
//       </div>
//     )
//   }

//   return (
//     <LineChart width={730} height={250} data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
      
//       <CartesianGrid strokeDasharray="3 3" />
//       <XAxis dataKey="name" />
//       <YAxis  />
//       <Tooltip />
//       <Legend content={<TotalUsers />}/>
//       <Legend content={<ActiveUsers />}/>
//       <Line type="monotone" dataKey="pv" stroke="#8884d8" strokeWidth={2} />
//     </LineChart>
//   );
// }


import React from "react";
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';






export default function LineCharts() {
  const data = [
    { name: 'Mo', pv: 2400, amt: 2400 },
    { name: 'Tu', pv: 1398, amt: 2210 },
    { name: 'We', pv:9800,  amt: 2290 },
    { name: 'Th', pv:3908,  amt: 2000 },
    { name: 'Fr', pv:4800,  amt: 2181 },
    { name: 'St', pv: 3800, amt: 2500 },
    { name: 'Su', pv: 4300, amt: 2100 },
  ];

  return (
    <div className="w-full h-[330px] bg-white p-4 rounded-md ">

    <ResponsiveContainer width="100%" height={290}>
      <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" strokeWidth={0.5} vertical={false}/>
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        {/* <Legend /> */}
        <Line type="monotone" dataKey="pv" stroke="#023f86" strokeWidth={2} />
        
      </LineChart>
    </ResponsiveContainer>
    </div>
  );
}
