import { Button, Form, Input } from "antd";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import { useChangePasswordMutation } from "../../redux/apiSlices/authSlice";

const ChangePassword = () => {
  const [changePassword, { isLoading }] = useChangePasswordMutation();
  const [form] = Form.useForm();


const validatePasswordChange = (values) => {
  let errors = {};

  if (values?.currentPass === values.newPass) {
    errors.newPassError = "The New password is similar to the old Password";
  }

  if (values?.newPass !== values.confirmPass) {
    errors.conPassError = "New Password and Confirm Password Don't Match";
  }

  return errors; 
};



  const onFinish = async (values) => {
const data = {
  currentPassword: values.currentPass,
  newPassword: values.newPass,
  confirmPassword: values.confirmPass,
};
    
    try {
      const res = await changePassword(data).unwrap(); 
console.log(res)
     
      if (res?.status) {
        toast.success(res.message); 
        form.resetFields(); 
      }
    } catch (error) {
      
      toast.error(error?.data?.message || "Something is wrong!");

      const errors = validatePasswordChange(values);
      if (Object.keys(errors).length > 0) {
        form.setFields([
          { name: "newPass", errors: [errors.newPassError] },
          { name: "confirmPass", errors: [errors.conPassError] },
        ]);
        toast.error(Object.values(errors).join("\n")); 
      }
    }
  };





  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold flex items-center gap-1">
          <IoArrowBackCircleOutline size={26} className="font-medium" />
          Change Password
        </h1>
      </div>
      <Form
        layout="vertical"
        form={form}
        onFinish={onFinish}
        className="w-[50%] mx-auto mt-20"
      >
        <Form.Item
          name="currentPassword"
          label={<p>Current Password</p>}
          rules={[
            { required: true, message: "Please enter your current password!" },
          ]}
        >
          <Input.Password
            placeholder="Enter current password"
            className="h-12"
          />
        </Form.Item>

        <Form.Item
          name="newPassword"
          label={<p>New Password</p>}
          rules={[{ required: true, message: "Please enter a new password!" }]}
        >
          <Input.Password placeholder="Enter new password" className="h-12" />
        </Form.Item>
        {newPassError && <p className="text-red-500">{newPassError}</p>}

        <Form.Item
          name="confirmPassword"
          label={<p>Confirm Password</p>}
          rules={[
            { required: true, message: "Please confirm your new password!" },
          ]}
        >
          <Input.Password placeholder="Confirm new password" className="h-12" />
        </Form.Item>
        {conPassError && <p className="text-red-500">{conPassError}</p>}

        <Form.Item className="text-center">
          <Button
            htmlType="submit"
            loading={isLoading}
            className="w-full h-12 bg-blue-600 text-white"
          >
            {isLoading ? "Changing..." : "Update Password"}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default ChangePassword;
