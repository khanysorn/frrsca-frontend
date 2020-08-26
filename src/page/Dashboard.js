import React from "react";
import { Layout, Menu, Breadcrumb, Card, Col, Row  } from "antd";

const { Header, Content, Footer} = Layout;

function Dashboard() {
  return (
    <>
      <Layout className="layout">
        <Header>
          <div className="logo" />
          <Menu theme="light" mode="horizontal" defaultSelectedKeys={["2"]}>
            <Menu.Item key="1">nav 1</Menu.Item>
            <Menu.Item key="2">nav 2</Menu.Item>
            <Menu.Item key="3">nav 3</Menu.Item>
          </Menu>
        </Header>
        <Content style={{ padding: "0 50px" }}>
          <Breadcrumb style={{ margin: "16px 0" }}>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>List</Breadcrumb.Item>
            <Breadcrumb.Item>App</Breadcrumb.Item>
          </Breadcrumb>
          
            <div className="site-card-wrapper">
              <Row gutter={16}>
                <Col span={8}>
                  <Card title="Card title" bordered={false}>
                    Card content
                  </Card>
                </Col>
                <Col span={8}>
                  <Card title="Card title" bordered={false}>
                    Card content
                  </Card>
                </Col>
                <Col span={8}>
                  <Card title="Card title" bordered={false}>
                    Card content
                  </Card>
                </Col>
              </Row>
            </div>
            ,
          
        </Content>
        <Footer style={{ textAlign: "center" }}>
          Ant Design ©2018 Created by Ant UED
        </Footer>
      </Layout>
    </>
  );
}

export default Dashboard;
