import { ConfigProvider, Input, Modal, Table } from 'antd'
import moment from 'moment';
import React, { useState } from 'react'
import { FiEye } from 'react-icons/fi';
import { useArtistsQuery } from '../../redux/apiSlices/artistSlice';
import { imageUrl } from '../../redux/api/baseApi';

const Artists = () => {
    const [search, setSearch] = useState("")
    const [page, setPage] = useState(1);
    const {data: artists} = useArtistsQuery({page: page, search: search});
    const pagePerSize = 10;
    const [value, setValue] = useState(null)


    const columns = [
        {
            title: "Serial No.",
            dataIndex: "name",
            key: "name",
            render: (_,record, index) =><p>{((page - 1) * pagePerSize) + index + 1}</p>
        },
        {
            title: "Artist",
            dataIndex: "artist",
            key: "artist",
            render: (_,record, index) => <div className='flex items-center gap-2'>
                <img 
                    src={ record?.image?.startsWith("https") ? record?.image :  `${imageUrl}${record?.image}`}
                    style={{height: 50, width: 50, borderRadius: 8}} 
                    alt=""
                />
                <p>{record?.firstName} {" "} {record?.lastName}</p>
            </div>
        },
        {
            title: "EMAIL",
            dataIndex: "email",
            key: "email",
        },
        {
            title: "CONTACT",
            dataIndex: "mobileNumber",
            key: "mobileNumber",
        },
        {
            title: "DATE",
            dataIndex: "createdAt",
            key: "createdAt",
            render: (_, record)=> <p>{moment(record?.createdAt).format("L")}</p>
        },
        {
            title: "Type",
            dataIndex: "type",
            key: "type",
            render: (_, record)=>  <p> {record?.appId ? "Social" : "General"}</p>
        },
        {
            title: "ACTIONS",
            dataIndex: "actions",
            key: "actions",
            render: (_,record) => <FiEye size={22} color='#999999' onClick={() => setValue(record)} className={"cursor-pointer"}/>
            
        },
    ];

    return (
        <>
            <div className='flex items-center justify-between mb-6'>
                <h2 style={{ fontSize: "25px", fontWeight: "normal" }}>Artist's information</h2>
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
                    dataSource={artists?.data} 
                    pagination={{
                        current: parseInt(page),
                        onChange: (page)=> setPage(page)
                    }}
                />
            </ConfigProvider>

            <Modal
                open={value}
                onCancel={()=>setValue(null)}
                onClose={()=>setValue(null)}
                footer={false}
            >
                <div>
                    <img 
                        width={120} 
                        style={{borderRadius: "12px", margin: "0 auto"}} 
                        src={ value?.image?.startsWith("https") ? value?.image :  `${imageUrl}${value?.image}`}
                        alt=""
                    />
                    
                    <div className='flex items-center justify-between mt-[15px]'>
                        <div>
                            <p className='pb-[5px]' >Artish Name:</p>
                            <p className='pb-[5px]' >Email</p>
                            <p className='pb-[5px]' >Contact</p>
                            <p className='pb-[5px]' >Joining Date</p>
                            <p className=''>Type</p>
                        </div>

                        <div>
                            <p className='pb-[5px] text-right'>{value?.firstName} {" "} {value?.lastName} </p>
                            <p className='pb-[5px] text-right'>{value?.email ? value?.email : "Not Added yet"}</p>
                            <p className='pb-[5px] text-right'>{value?.mobileNumber ? value?.mobileNumber : "Not Added yet"}</p>
                            <p className='pb-[5px] text-right'>{moment(value?.createdAt).format("L")}</p>
                            <p className='text-right'>{value?.appId ? "Social" : "General"}</p>
                        </div>

                    </div>
                </div>
            </Modal>
        </>
    )
}

export default Artists