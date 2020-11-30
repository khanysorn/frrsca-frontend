import React from "react";
import { Layout, Breadcrumb, message } from 'antd';
import MenuBar from '../../components/teacher/Menu'
import User from '../../components/User'
import Footer from '../../components/Footer';
import AuthenProvider from '../../services/authen_provider'
const { Header, Content, Sider } = Layout;


class ClassDetail extends React.Component {

  async componentDidMount()  {
    if (localStorage.getItem("token")){
        const result = await AuthenProvider.fetchme()
        console.log(result.data)
        // const { user_type } = result.data
        const user = {name_th:result.data.name_th,userid:result.data.user_id}
        this.setState({name:result.data.name_th,userid:result.data.user_id})
        console.log(result.data.name_th)
        console.log(user.name)
        
        if(result.data.user_type === "inst_group") {
            this.getSubjectList(user.userid);
        } else{
            this.props.history.push("/Unauthorized")
        }
        
    } else {
      message.error('กรุณาเข้าสู่ระบบ')
      this.props.history.push("/Login")
    }
  }

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
        <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item>วิชาของคุณ</Breadcrumb.Item>
          <Breadcrumb.Item>{this.props.match.params.id}</Breadcrumb.Item>
          <Breadcrumb.Item>ภาพรวมของคุณ</Breadcrumb.Item>
        </Breadcrumb>
        <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
          Bill is a cat. 
        </div>
      </Content>
      <Footer/>
    </Layout>
  </Layout>
  );
  }
  }

export default ClassDetail;
