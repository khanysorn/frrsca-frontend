import React from "react";
import { Layout, Menu, Card, Col, Row  } from "antd";
import { Link } from "react-router-dom";

const { Header, Content, Footer} = Layout;

function Class() {
  return (
    <>
      <Layout className="layout">
        <Header>
          <div className="logo" />
          <Menu theme="light" mode="horizontal" defaultSelectedKeys={["2"]}>
            <Menu.Item key="1"><h3>ห้องเรียนของฉัน</h3></Menu.Item>
            <Menu.Item key="2"><h3>ห้องเรียนของฉัน</h3></Menu.Item>
            <Menu.Item key="3"><h3>ห้องเรียนของฉัน</h3></Menu.Item>
          </Menu>
        </Header>
        <Content style={{ padding: "0 50px", minHeight: "calc(100vh - 134px)" }} >
          <h1 style={{ marginTop: "20px" }}>ห้องเรียนของฉัน</h1>
          
            <div className="site-card-wrapper">
              <Row gutter={[16,16]}>
                <Col xs={24} md={8} >
                  <Link href="#">
                  <Card bordered={false}>
                    <h2>INT 206</h2>
                    <h2>การบริหารโครงการซอฟต์แวร์</h2>
                    <p>กลุ่ม 1</p>
                    </Card>
                    </Link>
                </Col>
                <Col xs={24} md={8} >
                  <Card bordered={false}>
                    <h2>INT 206</h2>
                    <h2>การบริหารโครงการซอฟต์แวร์</h2>
                    <p>กลุ่ม 1</p>
                    </Card>
                </Col>
                <Col xs={24} md={8}>
                  <Card bordered={false}>
                    <h2>INT 206</h2>
                    <h2>การบริหารโครงการซอฟต์แวร์</h2>
                    <p>กลุ่ม 1</p>
                    </Card>
                </Col>
                <Col xs={24} md={8} >
                  <Card bordered={false}>
                    <h2>INT 206</h2>
                    <h2>การบริหารโครงการซอฟต์แวร์</h2>
                    <p>กลุ่ม 1</p>
                    </Card>
                </Col>
                <Col xs={24} md={8} >
                  <Card bordered={false}>
                    <h2>INT 206</h2>
                    <h2>การบริหารโครงการซอฟต์แวร์</h2>
                    <p>กลุ่ม 1</p>
                    </Card>
                </Col>
              </Row>
            </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          Ant Design ©2018 Created by Ant UED
        </Footer>
      </Layout>
    </>
  );
}

export default Class;
