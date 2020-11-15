import React from "react";
import { Menu, Button } from "antd";
import {
  DashboardOutlined,
  FormOutlined,
  UserOutlined,
  BookOutlined,
  SettingOutlined
} from '@ant-design/icons';
import { useLocation } from "react-router-dom";

const MenuBar = () => {
    const location = useLocation();
    const path = location.pathname.split("/").reverse()[0]
    return(    
      <Menu theme="light" defaultSelectedKeys={[path]} mode="inline">
      <Button type="primary" shape="round" icon={<DashboardOutlined />} size={'normal'} style={{margin: '8px'}}>Real-time Dashboard</Button>
        <Menu.Item key="summary" icon={<DashboardOutlined />} >ภาพรวมรายวิชา</Menu.Item>
        <Menu.Item key="attendance" icon={<FormOutlined />} >การเช็กชื่อ</Menu.Item>
        <Menu.Item key="list" icon={<UserOutlined />}>รายชื่อนักศึกษา</Menu.Item>
        <Menu.Item key="report" icon={<BookOutlined />}>รายงาน</Menu.Item>
        <Menu.Item key="setting" icon={<SettingOutlined />}>การตั้งค่า</Menu.Item>
      </Menu>)
}
  
  export default MenuBar;