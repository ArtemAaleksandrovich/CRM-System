import {Link, useLocation} from 'react-router-dom'
import { useState } from 'react';
import {
    AppstoreAddOutlined,
    UserOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Layout, Menu } from 'antd';

const { Sider } = Layout;

type MenuItem = Required<MenuProps>['items'][number];

const Sidebar = () => {
    const [collapsed, setCollapsed] = useState<boolean>(false);
    const location = useLocation();
    const currentPath = location.pathname;


    const items: MenuItem[] = [
        { label: <Link to="/">TODO List</Link>, key: '/', icon: <AppstoreAddOutlined /> },
        { label: <Link to="/profile">Profile</Link>, key: '/profile', icon: <UserOutlined /> },
    ];

    return (
        <Layout>
            <Sider style={{backgroundColor: '#f1f7f9', borderRight: '1px solid grey'}} collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
                <Menu style={{backgroundColor: '#f1f7f9'}} defaultSelectedKeys={[currentPath]} mode="inline" items={items} />
            </Sider>
        </Layout>
    );
};

export default Sidebar;