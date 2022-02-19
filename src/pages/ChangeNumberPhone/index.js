import React, { useEffect, useState } from "react";
import { Form, Input, Button } from "antd";

import LayoutLogin from "../../layout/Login";

import { getPhoneNumberOfMember } from "../../services/member";
import { toPhoneNumberWithout84 } from "../../common/function";

import Dialog from "./Dialog";

export default function ChangeNumberPhone() {
  const [currentPhoneNumber, setCurrentPhoneNumber] = useState("");
  useEffect(() => {
    getPhoneNumber();
  }, []);
  const getPhoneNumber = async () => {
    try {
      const result = await getPhoneNumberOfMember();
      setCurrentPhoneNumber(toPhoneNumberWithout84(result.data));
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <LayoutLogin>
      <div className="flex flex-col gap-5 w-full">
        <p className="font-bold text-lg text-center">Change phone number</p>
        <div className="flex flex-col">
          <Form.Item
            label="Phone number"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
          >
            <Input addonBefore="+84" value={currentPhoneNumber} />
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 8, span: 20 }}>
            <Dialog
              buttonMenu={<Button>Edit</Button>}
              onSuccess={getPhoneNumber}
            />
          </Form.Item>
        </div>
      </div>
    </LayoutLogin>
  );
}
