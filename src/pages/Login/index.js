import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Input, Button, message } from "antd";

import LayoutLogin from "../../layout/Login";
import { login } from "../../services/member";

import { KEY_TOKEN } from "../../common/constant/key";

export default function LoginComponents() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const onFinish = async (values) => {
    try {
      setIsLoading(true);
      const result = await login(values);
      localStorage.setItem(KEY_TOKEN, result.data);
      navigate("/change-phone-number");
      message.success("Login is success", 3 );
    } catch (err) {
      console.log(err);
      message.error("Username and Password in correct", 3);
    } finally {
      setIsLoading(false);
    }
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <LayoutLogin>
      <div className="flex flex-col gap-5 w-full">
        <p className="font-bold text-lg text-center">Welcome to login page</p>
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 8, span: 20 }} className="w-full">
            <Button type="default" htmlType="submit" loading={isLoading}>
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </LayoutLogin>
  );
}
