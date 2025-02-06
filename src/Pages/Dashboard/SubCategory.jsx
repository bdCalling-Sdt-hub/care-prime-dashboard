import { ColorPicker, Form, Input, Modal, Select, Table, Upload } from 'antd';
import React, { useEffect, useState } from 'react'
import { FiDelete, FiEdit, FiImage } from 'react-icons/fi';
import { MdDelete } from "react-icons/md";
import { useCategoryQuery, useCreateCategoryMutation, useUpdateCategoryMutation, useDeleteCategoryMutation } from '../../redux/apiSlices/categorySlice';
import toast from 'react-hot-toast';
import { imageUrl } from '../../redux/api/baseApi';
import Spinner from '../../components/common/Spinner';
import { useCreateSubCategoryMutation, useDeleteSubCategoryMutation, useGetSubCategoriesQuery, useUpdateSubCategoryMutation } from '../../redux/apiSlices/subCategorySlice';

const SubCategory = () => {
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const {data: categories}=useCategoryQuery();
    const {data: subCategories, refetch}=useGetSubCategoriesQuery();

    const [updateSubCategory, {isLoading}] = useUpdateSubCategoryMutation();
    const [createSubCategory, {isLoading:createLoading}] = useCreateSubCategoryMutation();
    const [deleteSubCategory] = useDeleteSubCategoryMutation();

    const [showUploadButton, setShowUploadButton] = useState(true);
    const [form] = Form.useForm();
    const [colors, setColors] = useState({ colors1: "", colors2: "" });

    useEffect(() => {
        setColors({ colors1: value?.colors[0], colors2: value?.colors[1] });
        if (value) {
            form.setFieldsValue({
                name: value?.name,
                category: value?.category,
                colors1: value?.colors[0], 
                colors2: value?.colors[1],
                image: [
                    {
                        uid: '-1',
                        name: value?.image?.split("/")[2],
                        status: 'done',
                        url: `${imageUrl}${value?.image}`,
                    }
                ],
            });
            setShowUploadButton(false);
        }
    }, [value, form]);
    


    const handleSubmit = async (values) => {
        try {
            const formData = new FormData();

            const {image, colors1, colors2, ...othersValue} = values;

            const colors = [
                colors1,
                colors2
            ]
            
            colors.forEach(color => {
                formData.append("colors[]", color);
            });

            if(image){
                formData?.append("image", image[0]?.originFileObj)
            }
    
            Object.keys(othersValue).forEach((key) => {
                formData.append(key, othersValue[key]);
            });
            
            if(value){
                await updateSubCategory({id: value?._id, updatedData: formData}).unwrap().then(({ status, message }) => {
                    if (status) {
                        toast.success(message);
                        setOpen(false);
                        refetch();
                        setValue(null);
                        form.resetFields();
                        setShowUploadButton(true)
                    }
                });
                return;
            }

            await createSubCategory(formData).unwrap().then(({ status, message }) => {
                if (status) {
                    toast.success(message);
                    setOpen(false);
                    refetch();
                    setValue(null);
                    form.resetFields();
                    setShowUploadButton(true)
                }
            });
        } catch (error) {
            toast.error(error?.data?.message || "Something went wrong");
        }
    };
    

    const handleDelete=async(id)=>{
        console.log(id)
        try {
            await deleteSubCategory(id).unwrap().then(({status, message})=>{
                if (status) {
                    toast.success(message);
                    refetch()
                }

            })
        } catch (error) {
            toast.error(error?.data?.message || "Something Wrong");
        }
    }


    const columns= [
        {
            title: "Serial No.",
            dataIndex: "index",
            key: "index",
            render: (_,record, index) =><p>{index + 1}</p>
        },
        {
            title: "Image",
            dataIndex: "image",
            key: "image",
            render: (_,record, index) =><img style={{width: 40, height: 40}} src={`${imageUrl}${record?.image}`} />
        },
        {
            title: "Name",
            dataIndex: "name",
            key: "name",
            render: (_,record, index) =><p>{record?.name}</p>
        },
        {
            title: "Primary Color",
            dataIndex: "colors",
            key: "colors",
            render: (_,record, index) => <div className='h-10 w-10 rounded' style={{background: record?.colors[0]}} />
        },
        {
            title: "Secondary Color",
            dataIndex: "colors",
            key: "colors",
            render: (_,record, index) => <div className='h-10 w-10 rounded' style={{background: record?.colors[1]}} />
        },
        {
            title: "Action",
            dataIndex: "action",
            key: "action",
            render: (_,record) => <div className='flex items-center gap-2'>
                <FiEdit onClick={()=>(setValue(record), setOpen(true))} className='cursor-pointer' size={20}/>
                <MdDelete onClick={()=>handleDelete(record?._id)} className='cursor-pointer'  size={20}/>
            </div> 
        },
    ]
    return (
        <div>
            
            {/* header */}
            <div className='flex items-center justify-between mb-6'>
                <h1 className='text-xl font-semibold'>Sub Categories</h1>
                <button onClick={()=> setOpen(true)} className='bg-primary text-white h-10 px-4 rounded-md'>Add Sub Category</button>
            </div>

            <Table dataSource={subCategories?.data} pagination={false} columns={columns}  />
            
            <Modal
                title={value ? "Edit Sub Category" : "Add Sub Category"}
                open={open}
                onCancel={()=>(setOpen(false), setValue(null), setShowUploadButton(true), form.resetFields())}
                width={500}
                footer={false}
            >
                <Form form={form} onFinish={handleSubmit} layout='vertical' className='pt-6'>
                    <Form.Item
                        name="image"
                        valuePropName="fileList"
                        getValueFromEvent={(e) => e?.fileList}
                        rules={[
                            {
                                required: true,
                                message: "Please upload an category image!",
                            },
                        ]}
                        className="w-full flex items-center justify-center"
                    >
                        <Upload
                            maxCount={1}
                            listType="picture-card"
                            onChange={({ fileList }) => {
                                if (fileList.length > 0) {
                                    setShowUploadButton(false);
                                } else {
                                    setShowUploadButton(true);
                                }
                            }}
                            onRemove={() => setShowUploadButton(true)}
                        >
                            {showUploadButton && (
                                <div className="mx-auto">
                                    <FiImage color="#1D75F2" style={{ margin: "0 auto" }} size={24} />
                                    <div style={{ marginTop: 8 }}>Upload</div>
                                </div>
                            )}
                        </Upload>
                    </Form.Item>

                    <Form.Item
                        name="category"
                        rules={[
                            {
                                required: true,
                                message: "Please Select Category"
                            }
                        ]}
                        label={<p>Category</p>}
                    >
                        <Select
                            placeholder={<p className='text-black'>Select Category</p>}
                            className='w-full h-10 '
                            disabled={value?.category}
                        >
                            {
                                categories?.data?.map((category, index)=>{
                                    return(
                                        <Select.Option 
                                            key={index}
                                            value={category.name}
                                        >
                                            {category?.name}
                                        </Select.Option>
                                    )
                                })
                            }
                        </Select>
                        {/* <Input
                            className='w-full h-10 border-[1px] border-primary rounded-lg outline-none px-[11px] placeholder:text-[#ddddd] placeholder:font-normal'
                            placeholder="Enter Category name"
                        /> */}
                    </Form.Item>

                    <Form.Item
                        name="name"
                        rules={[
                            {
                                required: true,
                                message: "Please Enter Sub Category Name!"
                            }
                        ]}
                        label={<p>Sub Category Name</p>}
                    >
                        <Input
                            className='w-full h-10 border-[1px] border-primary rounded-lg outline-none px-[11px] placeholder:text-[#ddddd] placeholder:font-normal'
                            placeholder="Enter Category name"
                        />
                    </Form.Item>


                    <Form.Item
                        name="colors1"
                        rules={[
                            {
                                required: true,
                                message: "Please Pick Primary Color!"
                            }
                        ]}
                        label={<p>Category Primary Color</p>}
                        valuePropName='colors'
                        getValueFromEvent={(e)=> {return e.toHexString()}}
                    >
                        <ColorPicker
                            format='hex'
                            allowClear
                            value={colors.colors1}
                            onChange={(e) => setColors({ ...colors, colors1: e.toHexString() })}
                        />
                    </Form.Item>

                    <Form.Item
                        name="colors2"
                        rules={[
                            {
                                required: true,
                                message: "Please Pick Secondary Color!"
                            }
                        ]}
                        label={<p>Category Secondary Color!</p>}
                        valuePropName='colors'
                        getValueFromEvent={(e)=> {return e.toHexString()}}
                    >
                        <ColorPicker
                            format='hex'
                            allowClear
                            value={colors.colors2}
                            onChange={(e) => setColors({ ...colors, colors2: e.toHexString() })}
                        />
                    </Form.Item>

                    <Form.Item className='flex items-center justify-center pt-4'>
                        <button className='bg-primary flex items-center justify-center text-white w-[200px] h-10 rounded-lg'>
                            {createLoading || isLoading ? <Spinner/> : "Save"}
                        </button>
                    </Form.Item>
                </Form>                
            </Modal>

        </div>
    )
}

export default SubCategory