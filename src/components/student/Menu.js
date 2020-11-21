import React from "react";
import { Menu } from "antd";
import MenuBarStyle from '../MenuBarStyle'
import { UserOutlined, PoweroffOutlined } from '@ant-design/icons';
import { Link, useLocation, withRouter } from "react-router-dom";
const { SubMenu } = Menu;

const MenuBar = (props) =>  {
  const location = useLocation();
  const path = location.pathname.split("/").reverse()[0]
  const logout = () => {
    localStorage.removeItem("user");  
    props.history.push("/Login")
  }
    return(    
        <>
        <Menu theme="light" mode="horizontal" defaultSelectedKeys={[path]} style={MenuBarStyle} triggerSubMenuAction="click">
            <Menu.Item key="class"><Link to="/student/class">ห้องเรียนของฉัน</Link></Menu.Item>
            <Menu.Item key="upload"><Link to="/student/upload">อัปโหลดรูปภาพของคุณ</Link></Menu.Item>
            <SubMenu icon={<UserOutlined />} title={`${props.name} ${props.surname}`} style={{float: 'right'}}>
                <Menu.Item onClick={()=>logout()}><PoweroffOutlined /> ออกจากระบบ</Menu.Item>
            </SubMenu>
        </Menu>
        
        </>)
  }
  
  export default withRouter(MenuBar);