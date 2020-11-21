import React from "react";
import { Layout, Breadcrumb, Form, Input, Button } from 'antd';
// import { FormInstance } from 'antd/lib/form';
import MenuBar from '../../components/teacher/Menu'
import User from '../../components/User'
import Footer from '../../components/Footer';
const { Header, Content, Sider } = Layout;

// const { Option } = Select;

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

class Setting extends React.Component {

  state = {
    collapsed: false,
  };

  onCollapse = collapsed => {
    console.log(collapsed);
    this.setState({ collapsed });
  };

  handleSizeChange = e => {
    this.setState({ size: e.target.value });
  };


  render() {
    const { collapsed } = this.state;
    return (
    <Layout style={{ minHeight: '100vh' }}>
    <Sider collapsible collapsed={collapsed} onCollapse={this.onCollapse} theme="light">
      <div className="logo" />
      <MenuBar  />
    </Sider>
    <Layout className="site-layout">
        <Header className="site-layout-background" style={{ padding: 0 }} >
          <User/>
          </Header>
      <Content style={{ margin: '0 16px' }}>
        <h1 style={{fontSize: '28px', margin: '16px 0'}}>การตั้งค่า</h1>
        <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item>วิชาของคุณ</Breadcrumb.Item>
          <Breadcrumb.Item>INT305</Breadcrumb.Item>
          <Breadcrumb.Item>การตั้งค่า</Breadcrumb.Item>
        </Breadcrumb>
        <div className="site-layout-background" style={{ padding: 24 }}>
        <Form {...layout} ref={this.formRef} name="control-ref" onFinish={this.onFinish}>
        <Form.Item name="note" label="ชื่อวิชา (ภาษาไทย)" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="note" label="Subject Title (English)" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        
        <Form.Item
          noStyle
          shouldUpdate={(prevValues, currentValues) => prevValues.gender !== currentValues.gender}
        >
          {({ getFieldValue }) => {
            return getFieldValue('gender') === 'other' ? (
              <Form.Item
                name="customizeGender"
                label="Customize Gender"
                rules={[{ required: true }]}
              >
                <Input />
              </Form.Item>
            ) : null;
          }}
        </Form.Item>
        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit">
            บันทึกข้อมูล
          </Button>
        </Form.Item>
      </Form>
      </div>
      </Content>
      <Footer/>
    </Layout>
  </Layout>
  );
  }
  }

export default Setting;
