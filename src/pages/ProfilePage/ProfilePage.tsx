import {ConfigProvider, Layout, Space, Typography} from "antd";

const { Title } = Typography;

function ProfilePage() {
    const theme = {
        token: {
            fontSizeHeading1: 50,
            fontFamily: 'Roboto sans, sans-serif',
        },
    };

    const layoutStyle = {
        backgroundColor: '#f1f7f9',
        width: '600px',
        height: '100vh',
        overflow: 'auto',
    };

    return (
        <Layout style={layoutStyle}>
            <ConfigProvider theme={theme}>
                <Space
                    style={{ display: 'flex', alignItems: 'center'}}
                    size={200}
                    orientation="vertical"
                >
                    <Title level={1}> Profile </Title>
                    <Title level={2}> Привет! </Title>
                </Space>
            </ConfigProvider>
        </Layout>
    )
}
export default ProfilePage;