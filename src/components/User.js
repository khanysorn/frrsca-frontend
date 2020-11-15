import React from 'react';
import { Menu } from "antd";
import { UserOutlined, PoweroffOutlined } from '@ant-design/icons';
import MenuBarStyle from '../components/MenuBarStyle'
const { SubMenu } = Menu;

const User = () => {
    return(
    
    <Menu theme="light" mode="horizontal"  triggerSubMenuAction="click" style={{...MenuBarStyle, float: 'right'}}>
        <SubMenu icon={<UserOutlined />} title="คณิศร ชัยวิชาชาญ">
            <Menu.Item><PoweroffOutlined /> ออกจากระบบ</Menu.Item>
        </SubMenu>
    </Menu>
    
    )
}

export default User;