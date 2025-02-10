import React, { useState } from "react";
import { Table, Button, Modal, Form, Input, Upload, Avatar } from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  UploadOutlined,
  UserOutlined,
} from "@ant-design/icons";
import Swal from "sweetalert2";
import {
  useAddNewBlogMutation,
  useDeleteBlogMutation,
  useEditBlogMutation,
  useGetAllBlogsQuery,
} from "../../../redux/apiSlices/blogsSlice";
import moment from "moment";

const BlogTable = () => {
  const { data: blogs, isLoading } = useGetAllBlogsQuery();
  const [addNewBlog] = useAddNewBlogMutation();
  const [editBlog] = useEditBlogMutation();
  const [deleteBlog] = useDeleteBlogMutation();
console.log(blogs)
  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBlog, setEditingBlog] = useState(null);
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const imageUrl = import.meta.env.VITE_IMAGE_URL;

  const openModal = (blog = null) => {
    setEditingBlog(blog);
    if (blog) {
      form.setFieldsValue({
        title: blog?.title,
        date: blog?.createAt,
        description: blog?.description,
        summary: blog?.summary,
        source: blog?.source,
      });
      setImagePreview( blog?.image?.startsWith("https")
                ? blog?.image
                : `${imageUrl}${blog?.image}`);
    } else {
      form.resetFields();
      setImagePreview(null);
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingBlog(null);
    setImage(null);
    setImagePreview(null);
  };

  const handleImageChange = (info) => {
    const file = info.file;
    setImage(file);

    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (values) => {
    const formData = new FormData();
    if (image) {
      formData.append("image", image);
    }
    formData.append("title", values.title);
    formData.append("description", values.description);
    formData.append("summary", values.summary);
    formData.append("source", values.source);

    console.log("🟢 Sending Update Request:", {
      id: editingBlog._id,
      formData: Object.fromEntries(formData), // Debugging
    });

    try {
      if (editingBlog) {
        const response = await editBlog({
          id: editingBlog._id,
          formData,
        }).unwrap();
        if (response?.success) {
          Swal.fire("Updated!", "Blog has been updated.", "success");
        } else {
          Swal.fire("Error!", "Update failed.", "error");
        }
      } else {
        const response = await addNewBlog(formData).unwrap();

        if (response?.success) {
          Swal.fire("Added!", "New blog added successfully.", "success");
        } else {
          Swal.fire("Error!", "Add failed.", "error");
        }
      }
      closeModal();
    } catch (error) {
      console.error("🔴 API Error:", error);
      Swal.fire("Error!", "Something went wrong.", "error");
    }
  };



  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this blog!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await deleteBlog(id).unwrap();
          Swal.fire("Deleted!", "Blog has been deleted.", "success");
        } catch (error) {
          Swal.fire("Error!", "Failed to delete blog.", "error");
        }
      }
    });
  };

  const columns = [
    {
      title: "Date",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (text) => <p>{moment(text).format("L")}</p>,
    },
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      render: (text) => (
        <img
          className="w-28 h-12 rounded-3xl"
          src={text?.startsWith("http") ? text : `${imageUrl}/${text}`}
          alt=""
        />
      ),
    },

    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Source",
      dataIndex: "source",
      width:140,
      key: "source",
    },
    {
      title: "Summary",
      dataIndex: "summary",
      key: "summary",
      width: 600,
      render: (text) => (text.length > 120 ? text.slice(0, 120) + "..." : text),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <div className="flex gap-2">
          <Button icon={<EditOutlined />} onClick={() => openModal(record)} />
          <Button
            icon={<DeleteOutlined />}
            danger
            onClick={() => {
              console.log("Record Data:", record);
              handleDelete(record._id);
            }}
          />
        </div>
      ),
    },
  ];

  return (
    <div>
      <Button
        type="primary"
        className="mb-4 bg-[#023F86]"
        onClick={() => openModal()}
      >
        + Add New Blog
      </Button>
      <Table
        columns={columns}
        dataSource={Array.isArray(blogs?.data?.blogs) ? blogs.data.blogs : []}
        loading={isLoading}
        rowKey="id"
      />
      <Modal
        title={editingBlog ? "Edit Blog" : "Add New Blog"}
        open={isModalOpen}
        onCancel={closeModal}
        onOk={() => form.submit()}
        okText={editingBlog ? "Update" : "Add"}
      >
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          {/* Title */}
          <Form.Item
            name="title"
            label="Title"
            rules={[{ required: true, message: "Please enter a title" }]}
          >
            <Input placeholder="Enter blog title" />
          </Form.Item>

          {/* Description */}
          <Form.Item
            name="description"
            label="Description"
            rules={[{ required: true, message: "Please enter a description" }]}
          >
            <Input.TextArea rows={3} placeholder="Enter blog description" />
          </Form.Item>

          {/* Summary */}
          <Form.Item
            name="summary"
            label="Summary"
            rules={[{ required: true, message: "Please enter a summary" }]}
          >
            <Input placeholder="Enter summary" />
          </Form.Item>

          {/* Source */}
          <Form.Item
            name="source"
            label="Source"
            rules={[{ required: true, message: "Please enter a source" }]}
          >
            <Input placeholder="Enter source" />
          </Form.Item>

          {/* Image Upload */}
          <Form.Item label="Image">
            <Upload
              beforeUpload={() => false}
              showUploadList={false}
              onChange={handleImageChange}
            >
              <div className="flex flex-col items-center gap-2 cursor-pointer">
                <Avatar
                  size={100}
                  icon={!imagePreview ? <UserOutlined /> : null}
                  src={imagePreview || "/default-profile.png"}
                />
                <Button icon={<UploadOutlined />}>Upload</Button>
              </div>
            </Upload>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default BlogTable;
