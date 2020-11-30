import React from 'react';
import { Menu } from "antd";
import { UserOutlined, PoweroffOutlined } from '@ant-design/icons';
import MenuBarStyle from '../components/MenuBarStyle'
import {Link} from 'react-router-dom'
const { SubMenu } = Menu;

const User = ({ user = {} }) => {
    console.table(user)
    

    return(
    
    <Menu theme="light" mode="horizontal"  triggerSubMenuAction="click" style={{...MenuBarStyle, float: 'right'}}>
        <SubMenu icon={<UserOutlined />} title={`${user.name_th}`}>
            <Menu.Item><PoweroffOutlined /><Link to="/Logout"> ออกจากระบบ</Link></Menu.Item>
        </SubMenu>
    </Menu>
    
    )
}

export default User;