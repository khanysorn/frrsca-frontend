import React from "react";
import { Menu } from "antd";
import {
  DashboardOutlined,
  FormOutlined,
  UserOutlined,
  BookOutlined,
  SettingOutlined
} from '@ant-design/icons';
import { useLocation, useParams, Link } from "react-router-dom";

const { SubMenu } = Menu;

const MenuBar = () => {
    const location = useLocation();
    const params = useParams();
    console.log(params)
    // const path = location.pathname.split("/").reverse()[0]
    const path = location.pathname
    return(    
      <Menu theme="light" defaultSelectedKeys={[path]} mode="inline">
        <div className="logo" />
        {/* <Button type="primary" shape="round" icon={<DashboardOutlined />} size={'normal'} style={{margin: '8px'}}>Real-time Dashboard</Button> */}
        <Menu.Item key={`/teacher/class/${params.id}/${params.section}/summary`} icon={<DashboardOutlined />}><Link to={`/teacher/class/${params.id}/${params.section}/summary`}>ภาพรวมรายวิชา</Link></Menu.Item>
        <Menu.Item key={`/teacher/class/${params.id}/${params.section}/attendance`} icon={<FormOutlined />}><Link to={`/teacher/class/${params.id}/${params.section}/attendance`}>การเช็กชื่อ</Link></Menu.Item>
        <Menu.Item key={`/teacher/class/${params.id}/${params.section}/studentlist`} icon={<UserOutlined />}><Link to={`/teacher/class/${params.id}/${params.section}/studentlist`}>รายชื่อนักศึกษา</Link></Menu.Item>
        <SubMenu key="report" icon={<BookOutlined />} title={"รายงาน"}>
        <Menu.Item key={`/teacher/class/${params.id}/${params.section}/report/attendance`} icon={<UserOutlined />}><Link to={`/teacher/class/${params.id}/${params.section}/report/attendance`}>ตามรายการเช็กชื่อ</Link></Menu.Item>
        <Menu.Item key={`/teacher/class/${params.id}/${params.section}/report/student`} icon={<UserOutlined />}><Link to={`/teacher/class/${params.id}/${params.section}/report/student`}>ตามรายชื่อนักศึกษา</Link></Menu.Item>
        </SubMenu>
        <Menu.Item key={`/teacher/class/${params.id}/${params.section}/setting`} icon={<SettingOutlined />}><Link to={`/teacher/class/${params.id}/${params.section}/setting`}>การตั้งค่า</Link></Menu.Item>
      </Menu>)
}
  
  export default MenuBar;