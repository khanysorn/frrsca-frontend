import React from "react";
import { Layout, Breadcrumb, message } from 'antd';
import MenuBar from '../../components/teacher/Menu'
import User from '../../components/User'
import Footer from '../../components/Footer';
import AuthenProvider from '../../services/authen_provider';
import ClassProvider from '../../services/class_provider'
import { getUser, setUser } from '../../helper'
const { Header, Content, Sider } = Layout;


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
      console.table(this.state.data)
    }catch(e){
      console.log(e)
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
    const { collapsed } = this.state;
    console.log(this.state.user)
    return (
    <Layout style={{ minHeight: '100vh' }}>
    <Sider collapsible collapsed={collapsed} onCollapse={this.onCollapse} theme="light">
      <div className="logo" />
      <MenuBar />
    </Sider>
    <Layout className="site-layout">
      <Header className="site-layout-background" style={{ padding: 0 }} >
        <User user={this.state.user} />
        </Header>
      <Content style={{ margin: '0 16px' }}>
        <h1 style={{fontSize: '28px', margin: '16px 0'}}>ภาพรวมรายวิชา</h1>
        <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item>วิชาของคุณ</Breadcrumb.Item>
          <Breadcrumb.Item></Breadcrumb.Item>
          <Breadcrumb.Item>ภาพรวมรายวิชา</Breadcrumb.Item>
        </Breadcrumb>
        <div className="site-layout-background" style={{ padding: 24 }}>
                    <h1 style={{fontSize: '24px'}}>{this.state.data.course_code}</h1>
                    <h2 tyle={{fontSize: '18px'}}>{this.state.data.coursename_th}</h2>
                    <h2 tyle={{fontSize: '18px'}}>{this.state.data.coursename_en}</h2>
                    <p>กลุ่มเรียน: {this.state.data.section_name}</p>
        </div>

      </Content>
      <Footer/>
    </Layout>
  </Layout>
  );
  }
  }

export default ClassDetail;
