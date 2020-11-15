import React from "react";
import { Layout, Breadcrumb, Table, Space } from 'antd';
import MenuBar from '../../components/teacher/Menu'
const { Header, Content, Footer, Sider } = Layout;

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
    title: 'เวลา',
    key: 'isontime',
    dataIndex: 'isontime'
  },
  {
    title: 'สถานที่',
    key: 'isontime',
    dataIndex: 'isontime'
  },
  {
    title: 'ตรงเวลา',
    key: 'isontime',
    dataIndex: 'isontime'
  },
  {
    title: 'สาย',
    key: 'isontime',
    dataIndex: 'isontime'
  },
  {
    title: 'ขาด',
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
      <Header className="site-layout-background" style={{ padding: 0 }} />
      <Content style={{ margin: '0 16px' }}>
        <h1 style={{fontSize: '28px', margin: '16px 0'}}>การเช็กชื่อ</h1>
        <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item>วิชาของคุณ</Breadcrumb.Item>
          <Breadcrumb.Item>INT305</Breadcrumb.Item>
          <Breadcrumb.Item>การเช็กชื่อ</Breadcrumb.Item>
        </Breadcrumb>
        <div className="site-layout-background">
          <Table columns={columns} dataSource={this.state.attendance} style={{width: "100%"}} bordered />
        </div>

      </Content>
      <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
    </Layout>
  </Layout>
  );
  }
  }

export default ClassDetail;
