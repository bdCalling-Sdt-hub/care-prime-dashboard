import React from 'react'
import BarCharts from "./Home/BarCharts";
import LineCharts from "./Home/LineCharts";

export default function Earnings() {
  return (
    <div className='flex flex-col gap-4'>
        <BarCharts />
        <LineCharts/>
    </div>
    
  )
}
