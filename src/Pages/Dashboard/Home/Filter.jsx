import React from 'react';
import { Select, Space } from 'antd';

const handleChange = (value) => {
  console.log(`selected ${value}`);
};

export default function Filter() {
  return (
    <div className='h-full shadow-md rounded '>
        <Space wrap>
      <Select
        defaultValue="Weekly"
        style={{ width: 120}}

        onChange={handleChange}
        options={[
          { value: 'Daily', label: 'Daily' },
          { value: 'Weekly', label: 'Weekly' },
          { value: 'Monthly', label: 'Monthly' },
          { value: 'Yearly', label: 'Yearly'},
        ]}
        
      />
    </Space>
    </div>
    
  );
}
