import {Link, useLocation} from 'react-router-dom'
import {useState} from 'react';
import {
    AppstoreAddOutlined,
    UserOutlined,
    TeamOutlined
} from '@ant-design/icons';
import {type MenuProps} from 'antd';
import { Layout, Menu } from 'antd';
import {useSelector} from "react-redux";
import type {RootState} from "../../store/store.ts";
import type {Role} from "../../types/auth/types.ts";


const { Sider } = Layout;

type MenuItem = Required<MenuProps>['items'][number];

const Sidebar = () => {
    const roles: Role[] = useSelector((state:RootState) => state.auth.roles);
    const [isCollapsed, setIsCollapsed] = useState<boolean>(false);
    const location = useLocation();
    const currentPath = location.pathname;

    const items: MenuItem[] = [
        { label: <Link to="/">TODO List</Link>, key: '/', icon: <AppstoreAddOutlined /> },
        { label: <Link to="/profile">Profile</Link>, key: '/profile', icon: <UserOutlined /> },
    ]

    if (roles.includes("MODERATOR") || roles.includes("ADMIN")) {
        items.push({ label: <Link to="/users">Users</Link>, key: '/users', icon: <TeamOutlined /> })
    }

    return (
        <Layout style={{ height: '100vh' }}>
            <Sider style={{backgroundColor: '#f1f7f9', borderRight: '1px solid grey'}} collapsible collapsed={isCollapsed} onCollapse={(value) => setIsCollapsed(value)}>
                <Menu style={{backgroundColor: '#f1f7f9'}} defaultSelectedKeys={[currentPath]} mode="inline" items={items} />
            </Sider>
        </Layout>
    );
};

export default Sidebar;