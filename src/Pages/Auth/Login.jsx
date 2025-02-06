import { Button, Checkbox, Form, Input, message } from "antd";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import FormItem from "../../components/common/FormItem";
import { useLoginMutation } from "../../redux/apiSlices/userSlice";


const Login = () => {
  const navigate = useNavigate();
  // const [loading, setLoading] = useState(false);
  const [login, { isLoading:loading }] = useLoginMutation();

 const onFinish = async (values) => {
   try {
     const { data, error } = await login(values); // Redux API Call

     if (data) {
       localStorage.setItem("token", data.token);
       message.success("Login successful!");
       navigate("/");
     } else {
       message.error(error?.data?.message || "Invalid credentials!");
     }
   } catch (err) {
     message.error("Something went wrong. Please try again.");
   }
 };

  return (
    <div>
      <div className="text-center mb-8">
        <h1 className="text-[25px] font-semibold mb-6">Login</h1>
        <p>Please enter your email and password to continue</p>
      </div>

      <Form onFinish={onFinish} layout="vertical">
        <FormItem name={"email"} label={"Email"} />

        <Form.Item
          name="password"
          label={<p>Password</p>}
          rules={[{ required: true, message: "Please input your Password!" }]}
        >
          <Input.Password
            placeholder="Enter your password"
            style={{
              height: 40,
              border: "1px solid #d9d9d9",
              outline: "none",
              boxShadow: "none",
            }}
          />
        </Form.Item>

        <div className="flex items-center justify-between">
          <Form.Item
            style={{ marginBottom: 0 }}
            name="remember"
            valuePropName="checked"
          >
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <a
            className="login-form-forgot text-primary font-semibold"
            href="/auth/forgot-password"
          >
            Forgot password?
          </a>
        </div>

        <Form.Item style={{ marginBottom: 0 }}>
          <button
            type="submit"
            style={{
              width: "100%",
              height: 45,
              color: "white",
              fontWeight: "400px",
              fontSize: "18px",
              marginTop: 20,
            }}
            className="flex items-center justify-center bg-primary rounded-lg"
            disabled={loading}
          >
            {loading ? "Signing in..." : "Sign in"}
          </button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Login;
