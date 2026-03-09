import {Link, useLocation} from 'react-router-dom'
import { useState } from 'react';
import {
    AppstoreAddOutlined,
    UserOutlined,
} from '@ant-design/icons';
import {Image, type MenuProps} from 'antd';
import { Layout, Menu } from 'antd';
import {useSelector} from "react-redux";
import type {RootState} from "../../store/store.tsx";
import authImage from "../../assets/auth.png"
const { Sider } = Layout;

type MenuItem = Required<MenuProps>['items'][number];

const Sidebar = () => {
    const isAuthenticated = useSelector((state:RootState) => state.auth.isAuthenticated);
    const [collapsed, setCollapsed] = useState<boolean>(false);
    const location = useLocation();
    const currentPath = location.pathname;

    const items: MenuItem[] = [
        { label: <Link to="/">TODO List</Link>, key: '/', icon: <AppstoreAddOutlined /> },
        { label: <Link to="/profile">Profile</Link>, key: '/profile', icon: <UserOutlined /> },
    ];

    return (
        isAuthenticated ?
            <Layout style={{ height: '100vh' }}>
                <Sider style={{backgroundColor: '#f1f7f9', borderRight: '1px solid grey'}} collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
                    <Menu style={{backgroundColor: '#f1f7f9'}} defaultSelectedKeys={[currentPath]} mode="inline" items={items} />
                </Sider>
            </Layout>
            :
            <Image preview={false} style={{width: '540px', height: '540px'}} src={authImage} />
    );
};

export default Sidebar;