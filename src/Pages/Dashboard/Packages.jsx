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
        <h2 className="text-2xl font-bold text-gray-800">Packages Plans</h2>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          className="bg-[#023F86] text-white px-5 py-2 rounded-lg shadow-lg hover:bg-[#012F60] transition-all"
          onClick={() => showModal()}
        >
          Add Package
        </Button>
      </div>

      {isLoading ? (
        <p>Loading packages...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {data?.data?.map((pkg) => (
            <Card
              key={pkg.id}
              title={<span className="text-lg font-semibold">{pkg.title}</span>}
              bordered={false}
              className="shadow-lg rounded-xl border border-gray-200 hover:shadow-2xl transition-all"
              extra={
                <div className="flex gap-3">
                  <EditOutlined
                    onClick={() => showModal(pkg)}
                    className="text-blue-600 text-xl cursor-pointer hover:text-blue-800 transition-all"
                  />
                  <DeleteOutlined
                    onClick={() => handleDelete(pkg._id)}
                    className="text-red-600 text-xl cursor-pointer hover:text-red-800 transition-all"
                  />
                </div>
              }
            >
              <p className="mb-2">
                <span>Price:</span>{" "}
                <strong className="text-green-600 font-semibold text-2xl">
                  ${pkg.price}
                </strong>
              </p>
              <p className="text-gray-700">{pkg.description}</p>

              <p>
                <span>Duration:</span> <strong>{pkg.duration}</strong>
              </p>
              <List
                size="small"
                className="mt-2"
                dataSource={pkg.features}
                renderItem={(feature) => (
                  <List.Item className="text-gray-600">✔ {feature}</List.Item>
                )}
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
        className="rounded-lg"
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
            <Button
              type="primary"
              htmlType="submit"
              className="bg-[#023F86] text-white px-4 py-2 rounded-lg hover:bg-[#012F60] transition-all"
            >
              {isEditing ? "Update Package" : "Add Package"}
            </Button>
          </div>
        </Form>
      </Modal>
    </div>
  );
};

export default PackagesPlans;
