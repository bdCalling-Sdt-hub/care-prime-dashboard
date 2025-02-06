import { ConfigProvider, Input, Modal, Table } from 'antd';
import React, { useState } from 'react'
import { FiEye } from 'react-icons/fi';
import { useEarningsQuery } from '../../redux/apiSlices/earningSlice';
import moment from 'moment';
import { imageUrl } from '../../redux/api/baseApi';

const data = [
    {
        key: "1",
        invoiceNo: "10",
        time: "18 Jul, 2023  4:30pm",
        username: "Tushar",
        method: "Credit Card",
        amount: "$850.00",
        status: "complete",
        printView: "Button",
    },
    {
        key: "2",
        invoiceNo: "11",
        time: "18 Jul, 2023  4:30pm",
        username: "Tushar",
        method: "Credit Card",
        amount: "$850.00",
        status: "complete",
        printView: "Button",
    },
    {
        key: "3",
        invoiceNo: "12",
        time: "18 Jul, 2023  4:30pm",
        username: "Tushar",
        method: "Credit Card",
        amount: "$850.00",
        status: "complete",
        printView: "Button",
    },
    {
        key: "4",
        invoiceNo: "13",
        time: "18 Jul, 2023  4:30pm",
        username: "Tushar",
        method: "Credit Card",
        amount: "$850.00",
        status: "complete",
        printView: "Button",
    },
    {
        key: "5",
        invoiceNo: "14",
        time: "18 Jul, 2023  4:30pm",
        username: "Tushar",
        method: "Credit Card",
        amount: "$850.00",
        status: "complete",
        printView: "Button",
    },
    
    {
        key: "6",
        invoiceNo: "12",
        time: "18 Jul, 2023  4:30pm",
        username: "Tushar",
        method: "Credit Card",
        amount: "$850.00",
        status: "complete",
        printView: "Button",
    },
    {
        key: "7",
        invoiceNo: "13",
        time: "18 Jul, 2023  4:30pm",
        username: "Tushar",
        method: "Credit Card",
        amount: "$850.00",
        status: "complete",
        printView: "Button",
    }
    ,
    {
        key: "8",
        invoiceNo: "14",
        time: "18 Jul, 2023  4:30pm",
        username: "Tushar",
        method: "Credit Card",
        amount: "$850.00",
        status: "complete",
        printView: "Button",
    },
    
    {
        key: "9",
        invoiceNo: "12",
        time: "18 Jul, 2023  4:30pm",
        username: "Tushar",
        method: "Credit Card",
        amount: "$850.00",
        status: "complete",
        printView: "Button",
    },
    {
        key: "10",
        invoiceNo: "13",
        time: "18 Jul, 2023  4:30pm",
        username: "Tushar",
        method: "Credit Card",
        amount: "$850.00",
        status: "complete",
        printView: "Button",
    }
];

const Earnings = () => {
    const [invoiceData, setInvoiceData] = useState(null);
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState("")
    const {data: earnings} = useEarningsQuery({page: page, search: search})

    const columns = [
        {
            title: "Serial No",
            dataIndex: "invoiceNo",
            key: "invoiceNo",
            render: (_, _record, index)=> <p>{index + 1}</p>
        },
        {
            title: "User",
            dataIndex: "user",
            key: "user",
            render: (_, record)=> <div className="flex items-center gap-2">
                <img 
                    src={
                        record?.user?.image?.startsWith("https") ?   record?.user?.image :
                        `${imageUrl}${record?.user?.image}`
                    } 
                    style={{width: 40, height: 40, borderRadius: 8}} 
                />
                <p>{record?.user?.firstName} {" "} {record?.user?.lastName}</p>
            </div>
        },
        {
            title: "Artist Name",
            dataIndex: "username",
            key: "username",
            render: (_, record)=> <div className="flex items-center gap-2">
                <img 
                    src={
                        record?.artist?.image?.startsWith("https") ?   record?.artist?.image :
                        `${imageUrl}${record?.artist?.image}`
                    } 
                    style={{width: 40, height: 40, borderRadius: 8}} 
                />
                <p>{record?.artist?.firstName} {" "} {record?.artist?.lastName}</p>
            </div>
        },
        {
            title: "Status",
            dataIndex: "orderStatus",
            key: "orderStatus",
        },
        {
            title: "AMOUNT",
            dataIndex: "price",
            key: "price",
            render: (_, record)=> <p>$ { record?.price}</p>
        },
        {
            title: "Transaction Id",
            dataIndex: "transactionId",
            key: "transactionId",
        },
        {
            title: "Deal Date",
            dataIndex: "createdAt",
            key: "createdAt",
            render: (_, record)=> <p>{moment(record?.createdAt).format("L")}</p>
        },
        
        {
            title: "ACTION",
            dataIndex: "printView",
            key: "printView",
            render: (_,record) => <FiEye onClick={() => setInvoiceData(record)} className="cursor-pointer" size={24} color="#999999" />
        }
    ]
    return (
        <React.Fragment>
            <div className='flex items-center justify-between mb-4'>
                <h2 className='text-[25px] font-normal'>Earnings</h2>
                <Input
                    style={{
                        width: 300, 
                        height: 40,
                        outline: "none",
                        border: "1px solid #d9d9d9",
                        boxShadow: "none"
                    }}
                    placeholder="Search by Date"
                    onChange={(e)=>setSearch(e.target.value)}
                />
            </div>
            <ConfigProvider
                theme={{
                    components: {
                        Pagination: {
                            itemActiveBg: "#6C57EC",
                            borderRadius: "100%"
                        }
                    },
                    token:{
                        colorPrimary: "white"
                    }
                }}
            >
                <Table 
                    columns={columns} 
                    dataSource={earnings?.data?.data} 
                    pagination={{
                        current: parseInt(page),
                        onChange: (page)=> setPage(page)
                    }}
                />
            </ConfigProvider>

            <Modal
                open={invoiceData}
                onCancel={()=>setInvoiceData(null)}
                onClose={()=>setInvoiceData(null)}
                footer={false}
                title="Deal Details"
            >
                <div className='mt-6'>
                    
                    <div style={{display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "15px"}}>
                        <div className="grid grid-cols-1 gap-[5px]">
                            <p>User Name:</p>
                            <p>Artist Name:</p>
                            <p>Amount</p>
                            <p>Status</p>
                            <p>Service Name</p>
                            <p>Total Service</p>
                            <p>Event Date</p>
                            <p>Deal Date</p>
                            <p>Transaction ID</p>
                        </div>

                        <div className="grid grid-cols-1 gap-[5px]">
                            <p className="text-right">{invoiceData?.user?.firstName} {" "} {invoiceData?.user?.lastName} </p>
                            <p className="text-right">{invoiceData?.artist?.firstName} {" "} {invoiceData?.artist?.lastName} </p>
                            <p className="text-right">{invoiceData?.price}</p>
                            <p className="text-right">{invoiceData?.orderStatus}</p>
                            <p className="text-right">{invoiceData?.service_name}</p>
                            <p className="text-right">{invoiceData?.total_service}</p>
                            <p className="text-right">{invoiceData?.event_date}</p>
                            <p className="text-right">{moment(invoiceData?.createdAt).format("L")}</p>
                            <p className="text-right">{invoiceData?.transactionId}</p>
                        </div>

                    </div>
                </div>
            </Modal>
        </React.Fragment>
    )
}

export default Earnings