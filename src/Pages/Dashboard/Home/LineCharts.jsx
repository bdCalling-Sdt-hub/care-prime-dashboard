
import React from "react";
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';






export default function LineCharts({users}) {

  return (
    <div className="w-full h-[230px] bg-white  rounded-md ">

    <ResponsiveContainer width="100%" height={220}>
      <LineChart data={users} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" strokeWidth={0.5} vertical={false}/>
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        {/* <Legend /> */}
        <Line type="monotone" dataKey="total" stroke="#023f86" strokeWidth={2} />
        
      </LineChart>
    </ResponsiveContainer>
    </div>
  );
}
