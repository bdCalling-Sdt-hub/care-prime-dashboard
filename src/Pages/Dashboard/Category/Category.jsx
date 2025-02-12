import React, { useState } from "react";
import { Table, Button, Modal, Form, Input, Upload, Avatar } from "antd";
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  UploadOutlined,
  UserOutlined,
} from "@ant-design/icons";

import Swal from "sweetalert2";
import { imageUrl } from "../../../redux/api/baseApi";
import { useCategoryQuery, useCreateCategoryMutation, useDeleteCategoryMutation, useUpdateCategoryMutation } from "../../../redux/apiSlices/categorySlice";

const MedicalHistory = () => {
  // API Queries & Mutations
  const { data, isLoading } = useCategoryQuery();
  const [createCategory] = useCreateCategoryMutation();
  const [updateCategory] = useUpdateCategoryMutation();
  const [deleteCategory] = useDeleteCategoryMutation();

  // Modal Control & State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [form] = Form.useForm();
  console.log(data);

  // Open Modal for Add/Edit
  const handleOpenModal = (category = null) => {
    setEditingCategory(category);

    if (category) {
      form.setFieldsValue({ name: category.name });

      // Image preview সেট করা
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

  // Close Modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingCategory(null);
    setImage(null);
    setImagePreview(null);
  };

  // Handle Image Upload Preview
  const handleImageChange = (info) => {
    const file = info.file;
    setImage(file);

    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  // Handle Add/Edit Submit
  const handleSubmit = async (values) => {
    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("image", image);

    if (editingCategory) {
      await updateCategory({
        id: editingCategory._id,
        updateCategory: formData,
      });
    } else {
      await createCategory(formData);
    }

    handleCloseModal();
  };

  // Handle Delete
  const handleDelete = async (id) => {
    // SweetAlert Confirmation
    Swal.fire({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this tip!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#023F86",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          // Delete the Insight Tip
          await deleteCategory(id);

          // Show success message
          Swal.fire("Deleted!", "The insight tip has been deleted.", "success");

          // Close the modal after 1 second
          setTimeout(() => {
            handleCloseModal();
          }, 1000); // 1 second delay
        } catch (error) {
          // Show error message in case of failure
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
      title: "Image",
      dataIndex: "image",
      key: "image",
      render: (text) => (
        <Avatar
          className="w-20 h-16 rounded-md object-cover bg-[#023F86]"
          src={text?.startsWith("http") ? text : `${imageUrl}/${text}`}
          icon={<UserOutlined />}
        />
      ),
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Symptom",
      key: "symptom",
      render: (text, record) =>
        record.symptom ? (
          <Button type="link" onClick={() => handleEditSymthoms(record)}>
            Edit Symthoms
          </Button>
        ) : (
          <Button type="link" onClick={() => handleAddSymthoms(record)}>
            Add Symthoms
          </Button>
        ),
    },

    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <div className="flex gap-2">
          <Button
            icon={<EditOutlined />}
            onClick={() => handleOpenModal(record)}
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

  return (
    <div className="">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">All Medical History</h2>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          className="bg-[#023F86]"
          onClick={() => handleOpenModal()}
        >
          Add Medical History
        </Button>
      </div>

      {/* Table */}
      <Table
        columns={columns}
        dataSource={data?.data.categories || []}
        loading={isLoading}
        rowKey="_id"
      />

      {/* Modal */}
      <Modal
        title={editingCategory ? "Edit Category" : "Add Category"}
        open={isModalOpen}
        onCancel={handleCloseModal}
        footer={null}
      >
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          <Form.Item
            name="name"
            label="Name"
            rules={[{ required: true, message: "Please enter a name" }]}
          >
            <Input placeholder="Enter name" />
          </Form.Item>

          {/* Image Upload & Preview */}
          <Form.Item name="image" label="Image">
            <div className="flex items-center gap-4 ">
              <Avatar
                size={64}
                src={imagePreview || undefined}
                icon={!imagePreview ? <UserOutlined /> : null}
                className="bg-[#023F86]"
              />
              <Upload
                beforeUpload={() => false}
                showUploadList={false}
                onChange={handleImageChange}
              >
                <Button icon={<UploadOutlined />}>Upload</Button>
              </Upload>
            </div>
          </Form.Item>

          <div className="flex justify-end gap-2 mt-4">
            <Button onClick={handleCloseModal}>Cancel</Button>
            <Button type="primary" htmlType="submit" className="bg-[#023F86]">
              {editingCategory ? "Update Category" : "Add Category"}
            </Button>
          </div>
        </Form>
      </Modal>
    </div>
  );
};

export default MedicalHistory;
