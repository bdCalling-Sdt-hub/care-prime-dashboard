import { Button, Form, Input, message } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useResetPasswordMutation } from "../../redux/apiSlices/authSlice";

const ResetPassword = () => {
  const [resetPassword] = useResetPasswordMutation();
  const email = new URLSearchParams(location.search).get("email");
  const navigate = useNavigate();

  const onFinish = async (values) => {
    try {
      
     console.log(values)

      // Send reset request to the backend with the token and new password
      const res = await resetPassword(values).unwrap();
      

      console.log(res);

      if (res?.success) {
        message.success("Password updated successfully!");
        navigate("/auth/login");
      } else {
        message.error(res?.message || "Failed to update password.");
      }
    } catch (error) {
      message.error(error?.data?.message || "Something went wrong!");
    }
  };


  return (
    <div>
      <div className="text-center mb-12">
        <h1 className="text-[25px] font-semibold mb-6">Reset Password</h1>
      </div>

      <Form layout="vertical" onFinish={onFinish}>
        {/* New Password */}
        <Form.Item
          name="newPassword"
          label={<p className="font-semibold text-gray-600">New Password</p>}
          rules={[
            { required: true, message: "Please input your new Password!" },
            { min: 6, message: "Password must be at least 6 characters long!" },
          ]}
        >
          <Input.Password placeholder="Enter New Password" className="mb-6" />
        </Form.Item>

        {/* Confirm Password */}
        <Form.Item
          name="confirmPassword"
          label={
            <p className="font-semibold text-gray-600">Confirm Password</p>
          }
          dependencies={["newPassword"]}
          hasFeedback
          rules={[
            { required: true, message: "Please confirm your password!" },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("newPassword") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error("Passwords do not match!"));
              },
            }),
          ]}
        >
          <Input.Password
            placeholder="Enter Confirm Password"
            className="mb-6"
          />
        </Form.Item>

        {/* Submit Button */}
        <Form.Item>
          <Button
            htmlType="submit"
            
            className="w-full h-12 bg-[#007BA5] text-white text-lg font-medium"
          >
            Update Password
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default ResetPassword;
