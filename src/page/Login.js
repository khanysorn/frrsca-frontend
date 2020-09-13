import React from "react";
import { Form, Input, Button, Row, Col, Card, Space } from "antd";

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};

const onFinish = (values) => {
  console.log("Success:", values);
};

const onFinishFailed = (errorInfo) => {
  console.log("Failed:", errorInfo);
};

function Login() {
  return (
    <>
      <div className="background">
      <Space align="center">
      <Row>
      <Col aligh="middle" offset={6} md={24}>
      <Card>
      <h1>เข้าสู่ระบบ</h1>
        <h3>ลงชื่อเข้าใช้ด้วยบัญชีผู้ใช้ของคณะเทคโนโลยีสารสนเทศ</h3>
        <h3>มหาวิทยาลัยเทคโนโลยีพระจอมเกล้าธนบุรี</h3>
        <Form
          {...layout}
          name="basic"
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item
            label="ชื่อผู้ใช้งาน"
            name="username"
            rules={[
              {
                required: true,
                message: "กรุณาใส่ชื่อผู้ใช้งาน",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="รหัสผ่าน"
            name="password"
            rules={[
              {
                required: true,
                message: "กรุณาใส่รหัสผ่าน",
              },
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Button type="primary" htmlType="submit">
            ลงชื่อเข้าใช้
          </Button>
        </Form>
      </Card>
      </Col>
    </Row>
    </Space>
    </div>
    </>
  );
}

export default Login;
