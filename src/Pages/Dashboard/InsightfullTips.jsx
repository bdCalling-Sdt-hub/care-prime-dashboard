import React, { useState } from "react";
import { Table, Button, Modal, Form, Input, Upload, Avatar } from "antd";
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  UploadOutlined,
  UserOutlined,
} from "@ant-design/icons";
import {
  useGetAllInsightTipsQuery,
  useAddInsightTipMutation,
  useEditInsightTipMutation,
  useDeleteInsightTipMutation,
} from "../../redux/apiSlices/insightfullTipsSlice";
import { imageUrl } from "../../redux/api/baseApi";
import Swal from "sweetalert2";

const InsightfulTips = () => {
  // API Queries & Mutations
  const { data, isLoading } = useGetAllInsightTipsQuery();
  const [addInsightTip] = useAddInsightTipMutation();
  const [editInsightTip] = useEditInsightTipMutation();
  const [deleteInsightTip] = useDeleteInsightTipMutation();

  // Modal Control & State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTip, setEditingTip] = useState(null);
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [form] = Form.useForm();
  console.log(data)

  // Open Modal for Add/Edit
 const handleOpenModal = (tip = null) => {
   setEditingTip(tip);

   if (tip) {
     form.setFieldsValue({ name: tip.name });

     // Image preview সেট করা
     const imageSrc = tip?.image?.startsWith("https")
       ? tip.image
       : `${imageUrl}/${tip.image}`;

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
    setEditingTip(null);
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
    formData.append("image", image); // Send the image file itself, not the preview

    if (editingTip) {
      await editInsightTip({ id: editingTip._id, updatedTip: formData });
    } else {
      await addInsightTip(formData);
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
          await deleteInsightTip(id);

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
          className="w-20 h-16 rounded-md object-cover"
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
    <div className="p-4">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">All Insightful Tips</h2>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          className="bg-[#023F86]"
          onClick={() => handleOpenModal()}
        >
          + Add InsightTip
        </Button>
      </div>

      {/* Table */}
      <Table
        columns={columns}
        dataSource={data?.data || []}
        loading={isLoading}
        rowKey="_id"
      />

      {/* Modal */}
      <Modal
        title={editingTip ? "Edit Insight Tip" : "Add New Insight Tip"}
        open={isModalOpen}
        onCancel={handleCloseModal}
        onOk={() => form.submit()}
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
            <div className="flex items-center gap-4">
              <Avatar
                size={64}
                src={imagePreview || undefined}
                icon={!imagePreview ? <UserOutlined /> : null}
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
        </Form>
      </Modal>
    </div>
  );
};

export default InsightfulTips;
