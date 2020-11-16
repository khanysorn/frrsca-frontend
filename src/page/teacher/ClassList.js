import React from "react";
import { Layout, Card, Col, Row  } from "antd";
import { Link } from "react-router-dom";
import User from '../../components/User'
import Footer from '../../components/Footer';
const { Header, Content} = Layout;

function TeacherClassList() {
  return (
    <>
      <Layout className="layout">
        <Header>
            <User/>
        </Header>
        <Content style={{ padding: "0 50px", minHeight: "calc(100vh - 134px)" }} >
          <h1 style={{ marginTop: "20px" }}>ห้องเรียนของคุณ</h1>
            <div className="site-card-wrapper">
              <Row gutter={[32,32]}>
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
        <Footer/>
      </Layout>
    </>
  );
}

export default TeacherClassList;
