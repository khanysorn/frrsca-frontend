import React from "react";
import { Menu } from "antd";
import MenuBarStyle from '../MenuBarStyle'
import { UserOutlined, PoweroffOutlined } from '@ant-design/icons';
import { Link, useLocation } from "react-router-dom";
const { SubMenu } = Menu;

const MenuBar = () =>  {
  const location = useLocation();
  const path = location.pathname.split("/").reverse()[0]
    return(    
        <>
        <Menu theme="light" mode="horizontal" defaultSelectedKeys={[path]} style={MenuBarStyle} triggerSubMenuAction="click">
            <Menu.Item key="class"><Link to="/student/class">ห้องเรียนของฉัน</Link></Menu.Item>
            <Menu.Item key="upload"><Link to="/student/upload">อัปโหลดรูปภาพของคุณ</Link></Menu.Item>
            <SubMenu icon={<UserOutlined />} title="คณิศร ชัยวิชาชาญ" style={{float: 'right'}}>
                <Menu.Item><PoweroffOutlined /> ออกจากระบบ</Menu.Item>
            </SubMenu>
        </Menu>
        
        </>)
  }
  
  export default MenuBar;