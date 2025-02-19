import { Button, Form, Typography, message } from "antd";
import React, { useState } from "react";
import OTPInput from "react-otp-input";
import { useNavigate } from "react-router-dom";
import {
  useOtpVerifyMutation,
  useResendOtpMutation,
} from "../../redux/apiSlices/authSlice";
const { Text } = Typography;

const VerifyOtp = () => {
  const navigate = useNavigate();
  const [otp, setOtp] = useState("");
  const email = new URLSearchParams(location.search).get("email");
  const [otpVerify, { isLoading }] = useOtpVerifyMutation();
  const [resendOtp, { isLoading: isResending }] = useResendOtpMutation();
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

  // Resend OTP function
 const handleResendEmail = async () => {
   if (!email) {
     return message.error("Invalid email. Please try again.");
   }

   try {
     const res = await resendOtp({ email }).unwrap(); // ✅ Corrected object format
     console.log(res);
     if (res?.success) {
       message.success("OTP has been resent to your email!");
     } else {
       message.error(res?.message || "Failed to resend OTP. Try again!");
     }
   } catch (error) {
     message.error(error?.data?.message || "Something went wrong!");
   }
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
