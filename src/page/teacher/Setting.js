import React from "react";
import { Layout, Breadcrumb, Form, Input, Button, message } from 'antd';
// import { FormInstance } from 'antd/lib/form';
import MenuBar from '../../components/teacher/Menu'
import User from '../../components/User'
import Footer from '../../components/Footer';
import AuthenProvider from '../../services/authen_provider'
import ClassProvider from '../../services/class_provider'
import { getUser, setUser } from '../../helper'
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
  formRef = React.createRef();

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
        attendance: [],
        isLoading: false,
        collapsed: false,
      };
  }

  async componentDidMount()  {
    if (localStorage.getItem("token")){
      const result = await AuthenProvider.fetchme()
      console.log(result.data)
      const user = result.data
      setUser(user)
      this.setState({ user: user })
      console.log(result.data.name_th)
      console.log(user.name_th)
        
        if(result.data.user_type === "inst_group") {

        } else{
            this.props.history.push("/Unauthorized")
        }
        
    } else {
      message.error('กรุณาเข้าสู่ระบบ')
      this.props.history.push("/Login")
    }
    this.getOverview()
  }

  async getOverview () {
    this.setState({isLoading: true})
    try{
      const result = await ClassProvider.classOverviewforLecturer({
        course_code: this.props.match.params.id,
        section: this.props.match.params.section,
        lecturer_user: getUser().user_id
      })
      this.setState({ data: result.data })
      this.formRef.current.setFieldsValue({
        coursename_th: this.state.data.coursename_th,
        coursename_en: this.state.data.coursename_en,
        
      })
      console.table(this.state.data);
    }catch(e){
      console.log(e)
    } finally {
      this.setState({ isLoading: false})
    }
  }

  onSubmit = async(value)=> {
    console.log(value)

    try{
      const result = await ClassProvider.classSetting({
        course_code: this.props.match.params.id,
        lecturer_username: getUser().user_id,
        coursename_th: value.coursename_th,
        coursename_en: value.coursename_en
      })
      console.log(result)
      message.success("บันทึกข้อมูลสำเร็จ")
    }catch(e){
      console.log(e)
      message.error("ไม่สามารถอัปเดตได้")
    } finally {
      this.setState({ isLoading: false})
    }

  }


  onCollapse = collapsed => {
    console.log(collapsed);
    this.setState({ collapsed });
  };

  handleSizeChange = e => {
    this.setState({ size: e.target.value });
  };


  render() {
    console.log(this.state.data.coursename_th)
    const { collapsed, data } = this.state;
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
        <h1 style={{fontSize: '28px', margin: '16px 0'}}>การตั้งค่า</h1>
        <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item>วิชาของคุณ</Breadcrumb.Item>
          <Breadcrumb.Item>INT305</Breadcrumb.Item>
          <Breadcrumb.Item>การตั้งค่า</Breadcrumb.Item>
        </Breadcrumb>
        <div className="site-layout-background" style={{ padding: 24 }}>
        <Form {...layout} ref={this.formRef} name="control-ref" onFinish={this.onSubmit}>
          <Form.Item name="coursename_th" label="ชื่อวิชา (ภาษาไทย)" rules={[{ required: true }]} >
            <Input />
          </Form.Item>
          <Form.Item name="coursename_en" label="Subject Title (English)" rules={[{ required: true }]}>
            <Input />
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
