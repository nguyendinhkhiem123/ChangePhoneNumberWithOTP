import React, { useState } from "react";
import { Modal } from "antd";
import { Form, Input, Button, message } from "antd";

import OtpInput from "react-otp-input";

import {
  forceTextInputEnterNumber,
  toPhoneNumberWith84,
} from "../../../common/function";
import { getOTP, updatePhoneNumberWithOTP } from "../../../services/member";

const INPUT_OTP = "INPUT_OTP";
const INPUT_PHONE_NUMBER = "INPUT_PHONE_NUMBER";

export default function Dialog({ buttonMenu, onSuccess }) {
  const [isLoading, setIsLoading] = useState(false);
  const [isVisible, seIsVisible] = useState(false);
  const [OTP, setOTP] = useState("");
  const [option, setOption] = useState(INPUT_PHONE_NUMBER);
  const [newPhoneNumber, setNewPhoneNumber] = useState("");

  const onFinish = async (values) => {
    try {
      setIsLoading(true);
      const phoneNumberFormat = toPhoneNumberWith84(values.phoneNumber);
      await getOTP(phoneNumberFormat);
      setNewPhoneNumber(phoneNumberFormat);
      setOption(INPUT_OTP);
      onSuccess();
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  const onHandleSubmitOTP = async () => {
    try {
      if (OTP === "") {
        message.warning("OTP is require", 3);
        return;
      }
      setIsLoading(true);
      await updatePhoneNumberWithOTP({
        code: OTP,
        phoneNumber: newPhoneNumber,
      });
      message.success("Update phone number success", 3);
      onHandleClose();
      onSuccess();
    } catch (err) {
      console.log(err);
      message.error("OTP in correct", 3);
    } finally {
      setIsLoading(false);
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const handleOTPChange = (otp) => {
    setOTP(otp);
  };

  const onHandleClose = () => {
    seIsVisible(false);
    setOTP("");
    setNewPhoneNumber("");
    setOption(INPUT_PHONE_NUMBER);
  };

  return (
    <>
      <div onClick={() => seIsVisible(true)}>{buttonMenu}</div>
      <Modal
        title={
          option === INPUT_PHONE_NUMBER ? "Input phone number" : "Input OTP"
        }
        visible={isVisible}
        onCancel={onHandleClose}
        footer={[
          option === INPUT_PHONE_NUMBER ? (
            <Button
              type="default"
              htmlType="submit"
              form="my_form"
              loading={isLoading}
            >
              Submit
            </Button>
          ) : (
            <Button
              type="default"
              onClick={onHandleSubmitOTP}
              loading={isLoading}
            >
              Submit
            </Button>
          ),

          <Button type="" htmlType="submit" onClick={onHandleClose}>
            Cancel
          </Button>,
        ]}
      >
        {option === INPUT_PHONE_NUMBER ? (
          <Form
            id="my_form"
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item
              label="Phone number"
              name="phoneNumber"
              rules={[
                {
                  required: true,
                  message: "Please input your new phone number!",
                },
              ]}
            >
              <Input addonBefore="+84" onKeyPress={forceTextInputEnterNumber} />
            </Form.Item>
          </Form>
        ) : (
          <div className="w-full">
            <div className="flex items-center justify-center">
              <OtpInput
                value={OTP}
                onChange={handleOTPChange}
                numInputs={5}
                separator={<span> - </span>}
                className="font-bold text-3xl"
                shouldAutoFocus
              />
            </div>
          </div>
        )}
      </Modal>
    </>
  );
}
