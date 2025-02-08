import { Button, Form, Typography, message } from "antd";
import React, { useState } from "react";
import OTPInput from "react-otp-input";
import { useNavigate } from "react-router-dom";
import { useOtpVerifyMutation } from "../../redux/apiSlices/authSlice";
const { Text } = Typography;

const VerifyOtp = () => {
  const navigate = useNavigate();
  const [otp, setOtp] = useState("");
  const email = new URLSearchParams(location.search).get("email");
  const [otpVerify, { isLoading }] = useOtpVerifyMutation();
  // console.log(otp);

  const onFinish = async (values) => {
    console.log(values);
    if (!email || !otp) {
      return message.error("Please enter OTP!");
    }

    const otpNumber = Number(otp);
    console.log(otpNumber);
    if (isNaN(otpNumber)) {
      return message.error("Invalid OTP format! Please enter a valid number.");
    }

    const data = {
      email,
      oneTimeCode: otpNumber,
    };

    try {
      const res = await otpVerify(data);
      console.log("Response:", res);

      if (res?.data?.success) {
        message.success("OTP Verified Successfully!");

        // Save the token to localStorage
        localStorage.setItem("reset_token", res?.data?.data);

        navigate(`/auth/reset-password?email=${email}`);
      } else {
        message.error(res?.error?.data?.message || "Invalid OTP!");
      }
    } catch (error) {
      message.error("Something went wrong!");
    }
  };


  const handleResendEmail = async () => {
    // Here you can call an API to resend OTP
    message.info("Resend OTP functionality is not implemented yet.");
  };

  return (
    <div>
      <div className="text-center mb-6">
        <h1 className="text-[25px] font-semibold mb-6">Verify OTP</h1>
        <p className="w-[80%] mx-auto">
          We'll send a verification code to your email. Check your inbox and
          enter the code here.
        </p>
      </div>

      <Form layout="vertical" onFinish={onFinish}>
        <div className="flex items-center justify-center mb-6">
          <OTPInput
            value={otp}
            onChange={setOtp}
            numInputs={4}
            inputStyle={{
              height: 50,
              width: 50,
              borderRadius: "8px",
              margin: "16px",
              fontSize: "20px",
              border: "1px solid #007BA5",
              color: "#2B2A2A",
              outline: "none",
              marginBottom: 10,
            }}
            renderInput={(props) => <input {...props} />}
          />
        </div>

        <div className="flex items-center justify-between mb-6">
          <Text>Didn't receive code?</Text>

          <p
            onClick={handleResendEmail}
            className="login-form-forgot"
            style={{ color: "#007BA5", cursor: "pointer" }}
          >
            Resend
          </p>
        </div>

        <Form.Item style={{ marginBottom: 0 }}>
          <Button
            htmlType="submit"
            loading={isLoading}
            style={{
              width: "100%",
              height: 40,
              border: "1px solid #d9d9d9",
              outline: "none",
              boxShadow: "none",
              background: "#007BA5",
              color: "white",
            }}
          >
            Verify
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default VerifyOtp;
