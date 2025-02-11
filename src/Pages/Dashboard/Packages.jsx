import React, { useState } from "react";
import { Card, Button, Modal, Form, Input, List, message, Select } from "antd";
import { EditOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import {
  useAddPackageMutation,
  useDeletePackageMutation,
  useGetAllPackagesQuery,
  useUpdatePackageMutation,
} from "../../redux/apiSlices/packagesSlice";
import FeaturedInput from "../../components/common/PackegeFearuedInput";
import Swal from "sweetalert2";

const { Option } = Select;

const PackagesPlans = () => {
  const { data, isLoading } = useGetAllPackagesQuery();
  const [addPackage] = useAddPackageMutation();
  const [updatePackage] = useUpdatePackageMutation();
  const [deletePackage] = useDeletePackageMutation();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentPackage, setCurrentPackage] = useState(null);
  const [form] = Form.useForm();

  const showModal = (pkg = null) => {
    setIsEditing(!!pkg);
    setCurrentPackage(pkg);
    setIsModalOpen(true);

    if (pkg) {
      form.setFieldsValue({
        title: pkg.title,
        description: pkg.description,
        price: Number(pkg.price),
        duration: pkg.duration,
        features: pkg.features || [],
      });
    } else {
      form.resetFields();
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    form.resetFields();
  };

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
          await deletePackage(id);

          // Show success message
          Swal.fire("Deleted!", "The insight tip has been deleted.", "success");

          // Close the modal after 1 second
          setTimeout(() => {
            handleCancel();
          }, 1000); // 1 second delay
        } catch (error) {
          // Show error message in case of failure
          Swal.fire("Error!", "Failed to delete the insight tip.", "error");
        }
      }
    });
  };

  const handleSubmit = async (values) => {
    console.log("sfdhgds", values);
    try {
      const formattedData = {
        title: values.title,
        description: values.description,
        price: Number(values.price), // ✅ Price কে সংখ্যায় রূপান্তর
        duration: values.duration,
        features: values.features.filter((f) => f.trim() !== ""), // ✅ ফাঁকা ফিচার বাদ দেয়া
      };

      if (isEditing) {
        await updatePackage({
          id: currentPackage._id,
          updatedData: formattedData,
        }).unwrap();
        message.success("Package updated successfully");
      } else {
        await addPackage(formattedData).unwrap();
        message.success("Package added successfully");
      }

      setIsModalOpen(false);
      form.resetFields();
    } catch (error) {
      message.error("Operation failed");
      console.error("Error:", error);
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Packages Plans</h2>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => showModal()}
        >
          Add Package
        </Button>
      </div>

      {isLoading ? (
        <p>Loading packages...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data?.data?.map((pkg) => (
            <Card
              key={pkg.id}
              title={pkg.title}
              extra={
                <div>
                  <EditOutlined
                    onClick={() => showModal(pkg)}
                    className="text-blue-500 mr-2 cursor-pointer"
                  />

                  <DeleteOutlined
                    onClick={() => handleDelete(pkg._id)}
                    className="text-red-500 cursor-pointer"
                  />
                </div>
              }
              bordered={true}
            >
              <p>{pkg.description}</p>
              <p>
                <strong>Price:</strong> ${pkg.price}
              </p>
              <p>
                <strong>Duration:</strong> {pkg.duration}
              </p>
              <List
                size="small"
                dataSource={pkg.features}
                renderItem={(feature) => <List.Item>- {feature}</List.Item>}
              />
            </Card>
          ))}
        </div>
      )}

      <Modal
        title={isEditing ? "Edit Package" : "Add Package"}
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
      >
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          <Form.Item
            name="title"
            label="Title"
            rules={[{ required: true, message: "Title is required" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="description"
            label="Description"
            rules={[{ required: true, message: "Description is required" }]}
          >
            <Input.TextArea />
          </Form.Item>
          <Form.Item
            name="price"
            label="Price"
            rules={[{ required: true, message: "Price is required" }]}
          >
            <Input type="number" />
          </Form.Item>
          <Form.Item
            name="duration"
            label="Duration"
            rules={[{ required: true, message: "Duration is required" }]}
          >
            <Select>
              <Select.Option value="1 month">1 Month</Select.Option>
              <Select.Option value="3 months">3 Months</Select.Option>
              <Select.Option value="6 months">6 Months</Select.Option>
              <Select.Option value="1 year">1 Year</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="features"
            label="Features"
            rules={[
              { required: true, message: "At least two features are required" },
            ]}
          >
            <FeaturedInput />
          </Form.Item>

          <div className="flex justify-end gap-2 mt-4">
            <Button onClick={handleCancel}>Cancel</Button>
            <Button type="primary" htmlType="submit" className="bg-[#023F86]">
              {isEditing ? "Update Package" : "Add Package"}
            </Button>
          </div>
        </Form>
      </Modal>
    </div>
  );
};

export default PackagesPlans;
