import {Button,
    ConfigProvider, Dropdown, Flex, Input, Layout, type MenuProps, notification,
    Radio, Space, Spin, Table, type TableProps, Tag, Typography,} from "antd";
import { DownOutlined, SearchOutlined } from '@ant-design/icons';
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../../store/store.ts";
import { type NavigateFunction, useNavigate } from "react-router-dom";
import { blockUser, deleteUser, getUsersByFilter, unblockUser, updateUserRights } from "../../api/admin/api.ts";
import { Roles, type User, type UserFilters} from "../../types/admin/types.ts";
import { fetchProfile } from "../../utils/fetchProfile.ts";
import type { Profile } from "../../types/auth/types.ts";
import { ConfirmDeleteUserModal } from "../../ui/ConfirmModals/ConfirmDeleteUserModal.tsx";
import { ConfirmBlockUserModal } from "../../ui/ConfirmModals/ConfirmBlockUserModal.tsx";
import { ConfirmUnblockUserModal } from "../../ui/ConfirmModals/ConfirmUnblockUserModal.tsx";
import { ConfirmUpdateRolesUserModal } from "../../ui/ConfirmModals/ConfirmUpdateRolesUserModal.tsx";

const theme = {
    token: {
        fontSizeHeading1: 50,
        fontFamily: 'Roboto sans, sans-serif',
    },
};

const { Title } = Typography;

const layoutStyle = {
    backgroundColor: '#f1f7f9',
    width: '1200px',
    height: '100vh',
    overflow: 'auto',
    display: 'flex',
    alignItems: 'center'
};

function UserListPage() {
    const isAuthenticated: boolean = useSelector((state: RootState) => state.auth.isAuthenticated);
    const [users, setUsers] = useState<User[]>([])
    const [profile, setProfile] = useState<Profile | null>(null)
    const [api, contextHolder] = notification.useNotification();

    const [selectedRoles, setSelectedRoles] = useState<Roles[]>([]);
    const [currentUserId, setCurrentUserId] = useState<number | null>(null);

    const navigate: NavigateFunction = useNavigate();

    const [openDeleteUserModal, setOpenDeleteUserModal] = useState<boolean>(false);
    const [openBlockUserModal, setOpenBlockUserModal] = useState<boolean>(false);
    const [openUnblockUserModal, setOpenUnblockUserModal] = useState<boolean>(false);
    const [openUpdateRolesUserModal, setOpenUpdateRolesUserModal] = useState<boolean>(false);

    const [confirmLoading, setConfirmLoading] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true);

    const [filtersConfig, setFiltersConfig] = useState<UserFilters>({});
    const [sorterState, setSorterState] = useState<{
        field?: string;
        order?: 'ascend' | 'descend' | null;
    }>({});
    const [total, setTotal] = useState<number>(0);

    const [searchValue, setSearchValue] = useState<string>('');

    useEffect(() => {
        if (isAuthenticated) {
            fetchProfile(setProfile, api)
        } else {
            navigate("/auth");
        }
    }, [isAuthenticated]);

    useEffect(() => {
        if (isAuthenticated) {
            getUsers(filtersConfig);
        }
    }, [isAuthenticated, filtersConfig]);

    const getUsers: (filtersConfig: UserFilters) => Promise<void> = async () => {
        setLoading(true);
        try {
            const response = await getUsersByFilter(filtersConfig)
            setUsers(response.data);
            setTotal(response.meta?.totalAmount || 0);
        } catch (error) {
            if (error instanceof Error) {
                api['error']({
                    title: 'Ошибка!',
                    description: "Ошибка при получении списка пользователей! " + error.message,
                });
            } else {
                api['error']({
                    title: 'Ошибка!',
                    description: "Неизвестная ошибка при получении списка пользователей! " + error,
                });
            }
        } finally {
            setLoading(false);
        }
    }

    const confirmDeleteUser = async () => {
        if (!currentUserId) return;
        setConfirmLoading(true);
        try {
            await deleteUser(currentUserId);
            getUsers(filtersConfig);
            setOpenDeleteUserModal(false);
        } catch (error) {
            if (error instanceof Error) {
                api['error']({
                    title: 'Ошибка!',
                    description: 'Ошибка при удалении пользователя! ' + error.message,
                });
            } else {
                api['error']({
                    title: 'Ошибка!',
                    description: "Неизвестная ошибка при удалении пользователя! " + error,
                });
            }
        } finally {
            setConfirmLoading(false);
        }
    }

    const confirmBlockUser = async () => {
        if (!currentUserId) return;
        setConfirmLoading(true);
        try {
            await blockUser(currentUserId);
            getUsers(filtersConfig);
            setOpenBlockUserModal(false);
        } catch (error) {
            if (error instanceof Error) {
                api['error']({
                    title: 'Ошибка!',
                    description: 'Ошибка при блокировании пользователя! ' + error.message,
                });
            } else {
                api['error']({
                    title: 'Ошибка!',
                    description: "Неизвестная ошибка при блокировании пользователя! " + error,
                });
            }
        } finally {
            setConfirmLoading(false);
        }
    }

    const confirmUnblockUser = async () => {
        if (!currentUserId) return;
        setConfirmLoading(true);
        try {
            await unblockUser(currentUserId);
            getUsers(filtersConfig);
            setOpenUnblockUserModal(false);
        } catch (error) {
            if (error instanceof Error) {
                api['error']({
                    title: 'Ошибка!',
                    description: 'Ошибка при разблокировке пользователя! ' + error.message,
                });
            } else {
                api['error']({
                    title: 'Ошибка!',
                    description: "Неизвестная ошибка при разблокировке пользователя! " + error,
                });
            }
        } finally {
            setConfirmLoading(false);
        }
    }

    const confirmUpdateRolesUser = async (roles: Roles[]) => {
        if (!currentUserId) return;
        setConfirmLoading(true);
        try {
            await updateUserRights(currentUserId, { roles: roles });
            getUsers(filtersConfig);
            setOpenUpdateRolesUserModal(false);
        } catch (error) {
            if (error instanceof Error) {
                api['error']({
                    title: 'Ошибка!',
                    description: 'Ошибка при обновлении прав пользователя! ' + error.message,
                });
            } else {
                api['error']({
                    title: 'Ошибка!',
                    description: "Неизвестная ошибка при обновлении прав пользователя! " + error,
                });
            }
        } finally {
            setConfirmLoading(false);
        }
    }

    const handleCancelDeleteUser = () => {
        setOpenDeleteUserModal(false);
    };

    const handleCancelBlockUser = () => {
        setOpenBlockUserModal(false);
    };

    const handleCancelUnblockUser = () => {
        setOpenUnblockUserModal(false);
    };

    const handleCancelUpdateRolesUser = () => {
        setOpenUpdateRolesUserModal(false);
    };

    const handleGlobalSearch = (value: string) => {
        setSearchValue(value);
        setFiltersConfig(prev => {
            const { page, ...rest } = prev;
            return { ...rest, search: value };
        });
    };

    const handleGlobalSearchReset = () => {
        setSearchValue('');
        setFiltersConfig(prev => {
            const { search, page, ...rest } = prev;
            return rest;
        });
    };

    const columns: TableProps<User>['columns'] = [
        {
            title: 'Username',
            dataIndex: 'username',
            align: 'center',
            width: 150,
            ellipsis: true,
            sorter: true,
            sortOrder: sorterState.field === 'username' ? sorterState.order : undefined,
            key: 'username',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            align: 'center',
            width: 150,
            ellipsis: true,
            sorter: true,
            sortOrder: sorterState.field === 'email' ? sorterState.order : undefined,
            key: 'email',
        },
        {
            title: 'Date',
            dataIndex: 'date',
            align: 'center',
            width: 100,
            key: 'date',
            render: (text) => {
                const date = new Date(text);
                return <Flex>{new Intl.DateTimeFormat('ru-RU', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                    timeZone: 'Europe/Moscow'
                }).format(date)}</Flex>;
            },
        },
        {
            title: 'Status',
            dataIndex: 'isBlocked',
            align: 'center',
            width: 100,
            key: 'isBlocked',
            filteredValue: filtersConfig.isBlocked !== undefined ? [String(filtersConfig.isBlocked)] : [],
            filterDropdown: ({ setSelectedKeys, selectedKeys, confirm}) => (
                <Flex style={{padding: 8}} vertical gap={5}>
                    <Radio.Group
                        options={[
                            { label: 'Blocked', value: 'true' },
                            { label: 'Active', value: 'false' },
                        ]}
                        value={selectedKeys[0]}
                        onChange={(e) => setSelectedKeys([e.target.value])}
                    />
                    <Flex vertical gap={5}>
                        <Button
                            type="primary"
                            onClick={() => confirm()}
                            size="small"
                            block
                        >
                            Применить
                        </Button>
                        <Button
                            onClick={() => {
                                setSelectedKeys([]);
                                confirm();
                            }}
                            size="small"
                            block
                        >
                            Сброс
                        </Button>
                    </Flex>
                </Flex>
            ),
            render: (value) => (
                <Tag color={!value ? 'success' : 'error'}>
                    {!value ? 'Active' : 'Blocked'}
                </Tag>
            ),
        },
        {
            title: 'Roles',
            dataIndex: 'roles',
            align: 'center',
            width: 200,
            key: 'roles',
            render: (_, { roles }) => (
                <Flex gap="small" align="center" justify="center" wrap>
                    {roles.map((role) => {
                        let color;
                        switch (role) {
                            case 'USER': color = 'blue'; break;
                            case 'ADMIN': color = 'red'; break;
                            case 'MODERATOR': color = 'yellow'; break;
                            default: return null;
                        }
                        return <Tag color={color} key={role}>{role.toUpperCase()}</Tag>;
                    })}
                </Flex>
            ),
        },
        {
            title: 'Phone Number',
            dataIndex: 'phoneNumber',
            align: 'center',
            width: 150,
            key: 'phoneNumber',
        },
        {
            title: 'Actions',
            align: 'center',
            width: 200,
            key: 'action',
            render: (_, record) => {
                const isAvailableRole: boolean = (!profile?.roles.includes(Roles.ADMIN) && !profile?.roles.includes(Roles.MODERATOR))
                const items: MenuProps['items'] = [
                    {
                        key: '1',
                        label:
                            <Button
                                disabled={isAvailableRole}
                                onClick={() => navigate(`/users/user/${record.id}`)}
                            >
                                Перейти к профилю
                            </Button>,
                    },
                    {
                        key: '2',
                        disabled: record.isBlocked,
                        label: (
                            <Button
                                disabled={record.isBlocked || isAvailableRole}
                                onClick={() => {
                                    setCurrentUserId(record.id);
                                    setOpenBlockUserModal(true);
                                }}
                            >
                                Заблокировать
                            </Button>
                        ),
                    },
                    {
                        key: '3',
                        disabled: !record.isBlocked,
                        label: (
                            <Button
                                disabled={!record.isBlocked || isAvailableRole}
                                onClick={() => {
                                    setCurrentUserId(record.id);
                                    setOpenUnblockUserModal(true);
                                }}
                            >
                                Разблокировать
                            </Button>
                        ),
                    },
                    {
                        key: '4',
                        label: (
                            <Button
                                disabled={!profile?.roles.includes(Roles.ADMIN)}
                                onClick={() => {
                                    setCurrentUserId(record.id);
                                    setSelectedRoles(record.roles || []);
                                    setOpenUpdateRolesUserModal(true);
                                }}
                            >
                                Изменить роли
                            </Button>
                        ),
                    },
                    {
                        key: '5',
                        label: (
                            <Button
                                danger
                                disabled={isAvailableRole}
                                onClick={() => {
                                    setCurrentUserId(record.id);
                                    setOpenDeleteUserModal(true);
                                }}
                            >
                                Удалить
                            </Button>
                        ),
                    },
                ];
                return (
                    <Dropdown menu={{ items }}>
                        <a onClick={(e) => e.preventDefault()}>
                            <Space>
                                Hover me <DownOutlined />
                            </Space>
                        </a>
                    </Dropdown>
                );
            },
        },
    ];

    const handleTableChange: TableProps<User>['onChange'] = (pagination, filters, sorter) => {
        const sorters = Array.isArray(sorter) ? sorter : [sorter];
        const activeSort = sorters[0];

        if (activeSort) {
            setSorterState({
                field: activeSort.field as string,
                order: activeSort.order,
            });
        } else {
            setSorterState({});
        }

        setFiltersConfig(prev => {
            const newConfig: UserFilters = { ...prev };
            if (pagination.current !== undefined) {
                newConfig.page = pagination.current - 1;
            }
            if (filters.isBlocked != null && filters.isBlocked.length > 0) {
                newConfig.isBlocked = filters.isBlocked[0] === 'true';
            } else {
                delete newConfig.isBlocked;
            }

            if (activeSort?.field && activeSort.order) {
                newConfig.sortBy = String(activeSort.field);
                newConfig.sortOrder = activeSort.order === 'ascend' ? 'asc' : 'desc';
            } else {
                delete newConfig.sortBy;
                delete newConfig.sortOrder;
            }
            return newConfig;
        });
    }

    return (
        <>
            <Layout style={layoutStyle}>
                {contextHolder}
                <ConfigProvider theme={theme}>
                    <Title level={1}>Users</Title>
                    {loading ? (
                        <Layout style={{ height: "250px", justifyContent: "center" }}>
                            <Spin size="large" />
                        </Layout>
                    ) : (
                        <Space style={{ display: 'flex', alignItems: 'center' }} orientation="vertical">
                            <Flex gap={8} align="center">
                                <Input.Search
                                    placeholder="Поиск в имени и почте..."
                                    value={searchValue}
                                    onChange={(e) => setSearchValue(e.target.value)}
                                    onSearch={handleGlobalSearch}
                                    onPressEnter={() => handleGlobalSearch(searchValue)}
                                    allowClear
                                    onClear={handleGlobalSearchReset}
                                    style={{ width: 300 }}
                                    enterButton={<SearchOutlined />}
                                />
                            </Flex>
                            <Table<User>
                                rowKey="id"
                                columns={columns}
                                onChange={handleTableChange}
                                dataSource={users}
                                pagination={{
                                    current: (filtersConfig.page ?? 0) + 1,
                                    pageSize: 20,
                                    total: total,
                                    showSizeChanger: false
                                }}
                            />
                        </Space>
                    )}
                </ConfigProvider>
            </Layout>

            <ConfirmDeleteUserModal
                openDeleteUserModal={openDeleteUserModal}
                confirmDeleteUser={confirmDeleteUser}
                confirmLoading={confirmLoading}
                handleCancelDeleteUser={handleCancelDeleteUser}
            />

            <ConfirmBlockUserModal
                openBlockUserModal={openBlockUserModal}
                confirmBlockUser={confirmBlockUser}
                confirmLoading={confirmLoading}
                handleCancelBlockUser={handleCancelBlockUser}
            />

            <ConfirmUnblockUserModal
                openUnblockUserModal={openUnblockUserModal}
                confirmUnblockUser={confirmUnblockUser}
                confirmLoading={confirmLoading}
                handleCancelUnblockUser={handleCancelUnblockUser}
            />

            <ConfirmUpdateRolesUserModal
                openUpdateRolesUserModal={openUpdateRolesUserModal}
                handleCancelUpdateRolesUser={handleCancelUpdateRolesUser}
                confirmLoading={confirmLoading}
                confirmUpdateRolesUser={confirmUpdateRolesUser}
                roles={selectedRoles}
            />
        </>
    )
}
export default UserListPage;