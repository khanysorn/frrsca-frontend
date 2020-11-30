import React from "react";
import { Menu } from "antd";
import MenuBarStyle from '../MenuBarStyle'
import { UserOutlined, PoweroffOutlined } from '@ant-design/icons';
import { Link, useLocation, withRouter } from "react-router-dom";
const { SubMenu } = Menu;

const MenuBar = ({ user = {} }) =>  {
    console.log(user)
  const location = useLocation();
  const path = location.pathname.split("/").reverse()[0]
    return(    
        <>
        <Menu theme="light" mode="horizontal" defaultSelectedKeys={[path]} style={MenuBarStyle} triggerSubMenuAction="click">
            <Menu.Item key="class"><Link to="/student/class">ห้องเรียนของฉัน</Link></Menu.Item>
            <Menu.Item key="upload"><Link to="/student/upload">อัปโหลดรูปภาพของคุณ</Link></Menu.Item>
            <SubMenu icon={<UserOutlined />} title={`${user.name_th}`} style={{float: 'right'}}>
                <Menu.Item><PoweroffOutlined /><Link to="/Logout"> ออกจากระบบ</Link></Menu.Item>
            </SubMenu>
        </Menu>
        
        </>)
  }
  
  export default withRouter(MenuBar);