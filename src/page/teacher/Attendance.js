import React from "react";
import { Layout, Breadcrumb, Table, Space, Button, Modal, Form, DatePicker, TimePicker, Select, message } from 'antd';
import MenuBar from '../../components/teacher/Menu'
import User from '../../components/User'
import Footer from '../../components/Footer';
import AuthenProvider from '../../services/authen_provider'
import { getUser, setUser } from '../../helper'
import ClassProvider from '../../services/class_provider'
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

  constructor(props) {
    super(props)
        this.state = {
        user: {},
        data:{},
        subject: {
        course_code: this.props.match.params.id,
        course_name: "",
        section_name: "",
        },
        addattendance:{
          date:"",
          room_name: "",
          classtype: "",
          timestart: "",
          timeend: "",
          late1: "",
          late2: "",
          late3: ""
        },
        attendance: [],
        isLoading: false,
        collapsed: false,
        modalVisible: false
      };
  }

  async componentDidMount()  {
    this.setState({isLoading: true})
    if (localStorage.getItem("token")){
      try{
        const result = await AuthenProvider.fetchme()
        console.log(result.data)
        // const { user_type } = result.data
        const user = result.data
        // save data into local storage
        setUser(user)
        this.setState({ user: user })
        
        if(user.user_type !== "inst_group") {
          this.props.history.push("/Unauthorized")
        } 
      } catch(e) {
        console.log(e)
      } finally {
        this.setState({isLoading: false})
      }
        
    } else {
      message.error('กรุณาเข้าสู่ระบบ')
      this.props.history.push("/Login")
    }
    this.getData()
  }

  async getData () {
    this.setState({isLoading: true})
    try{
      const result = await ClassProvider.gettimeclass({
        section_name: this.props.match.params.section,
        course_code: this.props.match.params.id,
        semester: "1",
        academicyear: "2563"
      })
      this.setState({ data: result.data })
      console.log(this.state.data)
    }catch(e){
      console.log(e)
    } finally {
      this.setState({ isLoading: false})
    }
  };
  
  async addAttendance(data){
    try{
      const result = await ClassProvider.createchecklist({
        section_name: this.props.match.params.section,
        course_code: this.props.match.params.id,
        semester: "1",
        academicyear: "2563",
        lecturer_user: getUser().user_id,
        room_name: data.room_name,
        class_name: "",
        classtype: data.classtype,
        timestart: `${data.date} ${data.timestart}`,
        timeend: `${data.date} ${data.timeend}`,
        late: `${data.date} ${data.late1}`,
        late2: `${data.date} ${data.late2}`,
        late3: `${data.date} ${data.late3}`,
      })
      this.setState({ data: result.data })
      console.log(this.state.data)
    }catch(e){
      console.log(e)
    } finally {
      this.setState({ isLoading: false})
    }
  }

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
      <User user={this.state.user} />
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
                    <Option value="1">CB2301</Option>
                    <Option value="2">CB2304</Option>
                    <Option value="3">CB2305</Option>
                    <Option value="4">CB2306</Option>
                    <Option value="5">CB2308</Option>
                    <Option value="6">CB2312</Option>
                    <Option value="7">CB2313</Option>
                </OptGroup>
                <OptGroup label="อาคารเรียน SIT">
                    <Option value="8">Training 1/1</Option>
                    <Option value="9">Training 1/2</Option>
                    <Option value="10">Training 1/3</Option>
                    <Option value="11">Training 1/4</Option>
                    <Option value="12">Training 1/5</Option>
                    <Option value="13">Training 1/6</Option>
                    <Option value="14">Meeting 4/1</Option>
                    <Option value="15">Meeting 4/2</Option>
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
