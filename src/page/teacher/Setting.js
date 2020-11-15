import React from "react";
import { Layout, Breadcrumb } from 'antd';
import MenuBar from '../../components/teacher/Menu'
import User from '../../components/User'
const { Header, Content, Footer, Sider } = Layout;


class ClassDetail extends React.Component {

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
          <h1 style={{fontSize: '24px'}}>INT307</h1>
          <h2 style={{fontSize: '18px'}}>ประเด็นทางสังคมและจริยธรรมสำหรับนักเทคโนโลยีสารสนเทศ</h2>
        </div>

      </Content>
      <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
    </Layout>
  </Layout>
  );
  }
  }

export default ClassDetail;
