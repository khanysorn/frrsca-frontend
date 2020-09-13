import React from "react";
import { Layout, Menu, Card, Col, Row, Avatar, Table  } from "antd";
import { UserOutlined } from "@ant-design/icons";
const { Header, Content, Footer } = Layout;

const columns = [
  {
    title: 'ครั้งที่',
    dataIndex: 'runningnumber',
    key: 'runningnumber',
  },
  {
    title: 'เวลาที่เข้าเรียน',
    dataIndex: 'timestamp',
    key: 'timestamp',
  },
  {
    title: 'สถานะการเข้าเรียน',
    key: 'status',
    dataIndex: 'status',
  }
];

const data = [
  {
    runningnumber: '1',
    timestamp: '08:20:21',
    status: '101'
  },
  {
    key: '2',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
    tags: ['loser'],
  },
  {
    key: '3',
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
    tags: ['cool', 'teacher'],
  },
];

function ClassDetail() {
  return (
    <>
      <Layout className="layout">
        <Header>
          <div className="logo" />
          <Menu theme="light" mode="horizontal" defaultSelectedKeys={["2"]}>
            <Menu.Item key="1">
              <h3>ห้องเรียนของฉัน</h3>
            </Menu.Item>
            <Menu.Item key="2">
              <h3>ห้องเรียนของฉัน</h3>
            </Menu.Item>
            <Menu.Item key="3">
              <h3>ห้องเรียนของฉัน</h3>
            </Menu.Item>
          </Menu>
        </Header>
        <Content
          style={{ padding: "0 50px", minHeight: "calc(100vh - 134px)" }}
        >
          <Row style={{ marginTop: "20px" }}>
            <Col span={18}>
              <Card>
                <h1>INT307</h1>
                <h3>ประเด็นทางสังคมและจริยธรรมสำหรับนักเทคโนโลยีสารสนเทศ</h3>
                <h3>กลุ่มเรียน: 1</h3>
                <h3>
                  อาจารย์ผู้สอน: <Avatar size="small" icon={<UserOutlined />} />{" "}
                  อ.คณิศร ชัยวิชาชาญ
                </h3>
              </Card>
            </Col>
            <Col>
              <Card span={6} style={{height: "100%", textAlign:"center"}}>
                <h3 style={{textAlign: "center"}}>ภาพรวมในรายวิชา</h3>
                <h1 style={{textAlign: "center"}}>
                  ดี
                </h1>
              </Card>
            </Col>
          </Row>
          <Row style={{ marginTop: "20px" }}>
            <h3>
            ประวัติการเข้าเรียน
            </h3>
            </Row>
            <Row span={24}>
            <Table columns={columns} dataSource={data} />
          </Row>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          Ant Design ©2018 Created by Ant UED
        </Footer>
      </Layout>
    </>
  );
}

export default ClassDetail;
