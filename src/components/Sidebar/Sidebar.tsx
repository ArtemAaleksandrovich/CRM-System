import { Link } from 'react-router-dom'
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

const items: MenuItem[] = [
    getItem(<Link to="/">TODO List</Link>, '1', <AppstoreAddOutlined />),
    getItem(<Link to="/profile">Profile</Link>, 'sub1', <UserOutlined />),
];


const Sidebar = () => {
    const [collapsed, setCollapsed] = useState(false);

    return (
        <Layout>
            <Sider style={{backgroundColor: '#f1f7f9', borderRight: '1px solid grey'}} collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
                <Menu style={{backgroundColor: '#f1f7f9'}} defaultSelectedKeys={['1']} mode="inline" items={items} />
            </Sider>
        </Layout>
    );
};

export default Sidebar;