import React, { useState } from "react";
import {
  Table,
  Button,
  Modal,
  Form,
  Input,
  Upload,
  Avatar,
  message,
  Image,
} from "antd";
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  UploadOutlined,
  UserOutlined,
} from "@ant-design/icons";

import Swal from "sweetalert2";
import { imageUrl } from "../../../redux/api/baseApi";
import {
  useCategoryQuery,
  useCreateCategoryMutation,
  useDeleteCategoryMutation,
  useUpdateCategoryMutation,
} from "../../../redux/apiSlices/categorySlice";
import { useGetIdSymptomCategoryQuery } from "../../../redux/apiSlices/symptomSlice";
import SymptomModal from "../../../components/common/SymptomModal";
import { useNavigate, useParams } from "react-router-dom";
// import SymptomModal from "./SymptomModal"; // Import the SymptomModal component

const MedicalHistory = () => {
  const [page,setPage]=useState(1)
  const { data, isLoading } = useCategoryQuery(page);
  const [createCategory] = useCreateCategoryMutation();
  const [updateCategory] = useUpdateCategoryMutation();
  const [deleteCategory] = useDeleteCategoryMutation();
  const { data: get } = useGetIdSymptomCategoryQuery();
console.log(page)
  // Modal Control & State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSymptomModalOpen, setIsSymptomModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [form] = Form.useForm();
  const navigate = useNavigate();

  // Open Category Modal
  const handleOpenCategoryModal = (category = null) => {
    setEditingCategory(category);

    if (category) {
      form.setFieldsValue({ name: category.name });

      const imageSrc = category?.image?.startsWith("https")
        ? category.image
        : `${imageUrl}/${category.image}`;

      setImagePreview(imageSrc);
    } else {
      form.resetFields();
      setImagePreview(null);
    }

    setIsModalOpen(true);
  };

  // Close Category Modal
  const handleCloseCategoryModal = () => {
    setIsModalOpen(false);
    setEditingCategory(null);
    setImage(null);
    setImagePreview(null);
  };

  // Open Symptom Modal (for Add/Edit)
  const handleOpenSymptomModal = (record, edit = false) => {
    setSelectedRecord(record);
    setIsSymptomModalOpen(true);
  };

  // Close Symptom Modal
  const handleCloseSymptomModal = () => {
    setIsSymptomModalOpen(false);
    setSelectedRecord(null);
  };

  // Handle Image Upload Preview
   const handleImageChange = (info) => {
     const file = info.file;
     if (file.type !== "image/png") {
       message.error("Only PNG images are allowed!"); 
       return; 
     }
     
     setImage(file);
     const reader = new FileReader();
     reader.onloadend = () => {
       setImagePreview(reader.result);
     };
     reader.readAsDataURL(file);
   };

  // Handle Add/Edit Submit
  const handleSubmit = async (values) => {
    try {
      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("image", image);

      if (editingCategory) {
        const response = await updateCategory({
          id: editingCategory._id,
          updateCategory: formData,
        });
        if (response) {
          message.success("Category updated successfully");
        }
      } else {
        const response = await createCategory(formData);
        if (response) {
          message.success("Category added successfully");
        }
      }

      handleCloseCategoryModal();
      form.resetFields();
    } catch (error) {
      message.error("Operation failed");
      console.error("Error:", error);
    }
  };

  // Handle Delete
  const handleDelete = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this category!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#023F86",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
           try {
             await deleteCategory(id);
             Swal.fire({
               title: "Deleted!",
               text: "The insight tip has been deleted.",
               icon: "success",
               showConfirmButton: false, 
               timer: 1500, 
             });
     
             
             setTimeout(() => {
               handleCloseModal();
             }, 1000);
           } catch (error) {
             Swal.fire("Error!", "Failed to delete the insight tip.", "error");
           }
         }
    });
  };

  // Table Columns
  const columns = [
    {
      title: "Serial No",
      dataIndex: "serial",
      key: "serial",
      render: (_, __, index) => index + 1,
    },
    {
      title: "Icon",
      dataIndex: "image",
      key: "image",
      render: (text) => (
        <div className="w-12 h-12 py-1 bg-[#023F86] rounded-md">
          <Avatar
            className=" w-10 h-10 flex items-center justify-center mx-auto object-cover rounded-md"
            src={text?.startsWith("http") ? text : `${imageUrl}/${text}`}
            icon={<UserOutlined />}
          />
        </div>
      ),
    },
    {
      title: "Category Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Symptom",
      key: "symptom",
      render: (_, record) => (
        <div>
          <button
            className="bg-[#023F86] text-white rounded-lg w-fit px-3 py-1"
            onClick={() => navigate(`/category/${record._id}`)}
          >
            {record.symptom ? "Edit Symptoms" : "Add Symptoms"}
          </button>
        </div>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <div className="flex gap-2">
          <Button
            icon={<EditOutlined />}
            onClick={() => handleOpenCategoryModal(record)}
          />
          <Button
            icon={<DeleteOutlined />}
            danger
            onClick={() => handleDelete(record._id)}
          />
        </div>
      ),
    },
  ];
  console.log(data);

  return (
    <div>
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">All Category</h2>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          className="bg-[#023F86]"
          onClick={() => handleOpenCategoryModal()}
        >
          Add Category
        </Button>
      </div>

      {/* Table */}
      <Table
        columns={columns}
        dataSource={data?.data.categories || []}
        loading={isLoading}
        rowKey="_id"
        pagination={{
          total: data?.data.pagination?.total,
          pageSize: data?.data.pagination?.limit,
          onChange: (page) => setPage(page),
        }}
      />

      {/* Category Modal */}
      <Modal
        title={editingCategory ? "Edit Category" : "Add Category"}
        open={isModalOpen}
        onCancel={handleCloseCategoryModal}
        footer={null}
      >
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          <Form.Item
            name="name"
            label="Category Name"
            rules={[{ required: true, message: "Please enter a name" }]}
          >
            <Input placeholder="Enter category name" />
          </Form.Item>

          {/* Image Upload & Preview */}
          <Form.Item name="image" label="Image">
            <div className="flex items-center gap-4">
              <Avatar
                size={64}
                src={imagePreview || undefined}
                icon={!imagePreview ? <UserOutlined /> : null}
                className="bg-[#023F86]"
              />
              <Upload
                beforeUpload={(file) => {
                  // Return false to prevent automatic upload since we're manually handling the file
                  return false;
                }}
                showUploadList={false}
                onChange={handleImageChange}
              >
                <Button icon={<UploadOutlined />}>Upload</Button>
              </Upload>
            </div>
          </Form.Item>

          <div className="flex justify-end gap-2 mt-4">
            <Button onClick={handleCloseCategoryModal}>Cancel</Button>
            <Button type="primary" htmlType="submit" className="bg-[#023F86]">
              {editingCategory ? "Update Category" : "Add Category"}
            </Button>
          </div>
        </Form>
      </Modal>

      {/* Symptom Modal */}
      {isSymptomModalOpen && (
        <SymptomModal
          visible={isSymptomModalOpen}
          onClose={handleCloseSymptomModal}
          record={selectedRecord}
          isEdit={!!selectedRecord?.symptom}
        />
      )}
    </div>
  );
};

export default MedicalHistory;
