import React from "react";
import { Menu } from "antd";
import {
  DashboardOutlined,
  FormOutlined,
  UserOutlined,
  BookOutlined,
  SettingOutlined
} from '@ant-design/icons';
import { useLocation, Link } from "react-router-dom";

const { SubMenu } = Menu;

const MenuBar = () => {
    const location = useLocation();
    // const path = location.pathname.split("/").reverse()[0]
    const path = location.pathname
    return(    
      <Menu theme="light" defaultSelectedKeys={[path]} mode="inline">
        <div className="logo" />
        {/* <Button type="primary" shape="round" icon={<DashboardOutlined />} size={'normal'} style={{margin: '8px'}}>Real-time Dashboard</Button> */}
        <Menu.Item key="/teacher/class/summary" icon={<DashboardOutlined />}><Link to="/teacher/class/summary">ภาพรวมรายวิชา</Link></Menu.Item>
        <Menu.Item key="/teacher/class/attendance" icon={<FormOutlined />}><Link to="/teacher/class/attendance">การเช็กชื่อ</Link></Menu.Item>
        <Menu.Item key="/teacher/class/studentlist" icon={<UserOutlined />}><Link to="/teacher/class/studentlist">รายชื่อนักศึกษา</Link></Menu.Item>
        <SubMenu key="report" icon={<BookOutlined />} title={"รายงาน"}>
        <Menu.Item key="/teacher/class/report/attendance" icon={<UserOutlined />}><Link to="/teacher/class/report/attendance">ตามรายการเช็กชื่อ</Link></Menu.Item>
        <Menu.Item key="/teacher/class/report/student" icon={<UserOutlined />}><Link to="/teacher/class/report/student">ตามรายชื่อนักศึกษา</Link></Menu.Item>
        </SubMenu>
        <Menu.Item key="/teacher/class/setting" icon={<SettingOutlined />}><Link to="/teacher/class/setting">การตั้งค่า</Link></Menu.Item>
      </Menu>)
}
  
  export default MenuBar;