import React from "react";
import { Layout, Breadcrumb, Table, Space, Button, Modal, Form, DatePicker, TimePicker, Select } from 'antd';
import MenuBar from '../../components/teacher/Menu'
import User from '../../components/User'
import Footer from '../../components/Footer';
const { Header, Content, Sider } = Layout;
const { Option, OptGroup } = Select;

const columns = [
  {
    title: 'ครั้งที่',
    dataIndex: 'runningnumber',
    key: 'runningnumber',
  },
  {
    title: 'วันที่',
    dataIndex: 'timestamp',
    key: 'timestamp',
  },
  {
    title: 'เวลาเริ่มเรียน',
    key: 'isontime',
    dataIndex: 'isontime'
  },
  {
    title: 'เวลาเลิกเรียน',
    key: 'isontime',
    dataIndex: 'isontime'
  },
  {
    title: 'สถานที่',
    key: 'isontime',
    dataIndex: 'isontime'
  },
  {
    title: 'ดำเนินการ',
    render: (text, record) => (
      <Space size="middle">
        <p>รายละเอียด</p>
        <p>แก้ไข</p>
        <p>ลบ</p>
      </Space>
    )
  }
];

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

//const tailLayout = {
//  wrapperCol: { offset: 8, span: 16 },
//};



class ClassDetail extends React.Component {


  
  showModal = () => {
    this.setState({
      modalVisible: true,
    });
  };

  handleOk = e => {
    console.log(e);
    this.setState({
      modalVisible: false,
    });
  };

  handleCancel = e => {
    console.log(e);
    this.setState({
      modalVisible: false,
    });
  };


  state = {
    collapsed: false,
    modalVisible: false
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
        <h1 style={{fontSize: '28px', margin: '16px 0'}}>การเช็กชื่อ</h1>
        <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item>วิชาของคุณ</Breadcrumb.Item>
          <Breadcrumb.Item>INT305</Breadcrumb.Item>
          <Breadcrumb.Item>การเช็กชื่อ</Breadcrumb.Item>
        </Breadcrumb>
        <Button type="primary" size={'normal'} style={{ margin: '16px 0' }} onClick={this.showModal}>สร้างรายการเช็กชื่อ</Button>
        <Modal title="สร้างรายการเช็กชื่อ" visible={this.state.modalVisible} onOk={this.handleOk} onCancel={this.handleCancel}>
        {/* <Form {...layout} name="basic" onFinish={onFinish} onFinishFailed={onFinishFailed}> */}
        <Form {...layout} name="createattendance">
            <Form.Item label="วันที่" name="username" rules={[{ required: true, message: 'Please input your username!' }]}> <DatePicker style={{ width: 250 }} /> </Form.Item>
            <Form.Item label="สถานที่" name="room" rules={[{ required: true, message: 'Please input your username!' }]}> 
            {/* <Select defaultValue="lucy" style={{ width: 120 }} onChange={handleChange}> */}
            <Select style={{ width: 250 }} >
                <OptGroup label="อาคารเรียน 2">
                    <Option value="CB2301">CB2301</Option>
                    <Option value="CB2304">CB2304</Option>
                    <Option value="CB2305">CB2305</Option>
                    <Option value="CB2306">CB2306</Option>
                    <Option value="CB2308">CB2308</Option>
                    <Option value="CB2312">CB2312</Option>
                    <Option value="CB2313">CB2313</Option>
                </OptGroup>
                <OptGroup label="อาคารเรียน SIT">
                    <Option value="Training 1/1">Training 1/1</Option>
                    <Option value="Training 1/2">Training 1/2</Option>
                    <Option value="Training 1/3">Training 1/3</Option>
                    <Option value="Training 1/4">Training 1/4</Option>
                    <Option value="Training 1/5">Training 1/5</Option>
                    <Option value="Training 1/6">Training 1/6</Option>
                    <Option value="Meeting 4/1">Meeting 4/1</Option>
                    <Option value="Meeting 4/2">Meeting 4/2</Option>
                </OptGroup>
            </Select>
            </Form.Item>
            <Form.Item label="ประเภทห้องเรียน" name="type" rules={[{ required: true, message: 'Please input your username!' }]}>
            <Select style={{ width: 250 }} >
                <Option value="Lecture">ทฤษฏี (Lecture)</Option>
                <Option value="Lab">ปฏิบัติ (Lab)</Option>
            </Select>
            </Form.Item>
            <Form.Item label="เวลาเข้าเรียนตรง" name="username" rules={[{ required: true, message: 'Please input your username!' }]}> <TimePicker style={{ width: 250 }}/> </Form.Item>
            <Form.Item label="เวลามาสายครั้งที่ 1" name="username" rules={[{ required: true, message: 'Please input your username!' }]}> <TimePicker style={{ width: 250 }}/> </Form.Item>
            <Form.Item label="เวลามาสายครั้งที่ 2" name="username" rules={[{ required: true, message: 'Please input your username!' }]}> <TimePicker style={{ width: 250 }}/> </Form.Item>
            <Form.Item label="เวลามาสายครั้งที่ 3" name="username" rules={[{ required: true, message: 'Please input your username!' }]}> <TimePicker style={{ width: 250 }}/> </Form.Item>
            <Form.Item label="เวลาเลิกเรียน" name="username" rules={[{ required: true, message: 'Please input your username!' }]}> <TimePicker style={{ width: 250 }}/> </Form.Item>
        </Form>
        </Modal>
        <div className="site-layout-background">
          <Table columns={columns} dataSource={this.state.attendance} style={{width: "100%"}} bordered />
        </div>

      </Content>
      <Footer/>
    </Layout>
  </Layout>
  );
  }
  }

export default ClassDetail;
