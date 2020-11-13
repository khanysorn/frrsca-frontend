import React from "react";
import { Menu } from "antd";
import MenuBarStyle from './MenuBarStyle'
import { Link } from "react-router-dom";

function MenuBar() {
    return(    
    <Menu theme="light" mode="horizontal" defaultSelectedKeys={["1"]} style={MenuBarStyle}>
    <Menu.Item key="1"><Link to="/student/class">ห้องเรียนของฉัน</Link></Menu.Item>
    </Menu>)
  }
  
  export default MenuBar;