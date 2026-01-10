import {Link, useLocation} from 'react-router-dom'
import {type Key, type ReactNode, useState} from 'react';
import {
    AppstoreAddOutlined,
    UserOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Layout, Menu } from 'antd';

const { Sider } = Layout;

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
    label: ReactNode,
    key: Key,
    icon?: ReactNode,
    children?: MenuItem[],
): MenuItem {
    return {
        key,
        icon,
        children,
        label,
    } as MenuItem;
}




const Sidebar = () => {
    const [collapsed, setCollapsed] = useState(false);
    const location = useLocation();
    const currentPath = location.pathname;


    const items: MenuItem[] = [
        getItem(<Link to="/">TODO List</Link>, '/', <AppstoreAddOutlined />),
        getItem(<Link to="/profile">Profile</Link>, '/profile', <UserOutlined />),
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