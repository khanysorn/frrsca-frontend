import React from "react";
import { Menu, Button } from "antd";
import {
  DashboardOutlined,
  FormOutlined,
  UserOutlined,
  BookOutlined,
  SettingOutlined
} from '@ant-design/icons';
import { useLocation, Link } from "react-router-dom";

const MenuBar = () => {
    const location = useLocation();
    const path = location.pathname.split("/").reverse()[0]
    return(    
      <Menu theme="light" defaultSelectedKeys={[path]} mode="inline">
        <Button type="primary" shape="round" icon={<DashboardOutlined />} size={'normal'} style={{margin: '8px'}}>Real-time Dashboard</Button>
        <Menu.Item key="summary" icon={<DashboardOutlined />}><Link to="/teacher/class/summary">ภาพรวมรายวิชา</Link></Menu.Item>
        <Menu.Item key="attendance" icon={<FormOutlined />}><Link to="/teacher/class/student/attendance">การเช็กชื่อ</Link></Menu.Item>
        <Menu.Item key="list" icon={<UserOutlined />}><Link to="/teacher/class/student/list">รายชื่อนักศึกษา</Link></Menu.Item>
        <Menu.Item key="report" icon={<BookOutlined />}><Link to="/teacher/class/student/report">รายงาน</Link></Menu.Item>
        <Menu.Item key="setting" icon={<SettingOutlined />}><Link to="/teacher/class/setting">การตั้งค่า</Link></Menu.Item>
      </Menu>)
}
  
  export default MenuBar;