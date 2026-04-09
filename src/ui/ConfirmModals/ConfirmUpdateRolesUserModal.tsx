import { useState, useEffect } from "react";
import { Button, Checkbox, Flex, Modal, Typography } from "antd";
import { Roles } from "../../types/admin/types.ts";

const { Text } = Typography;

interface ModalProps {
    openUpdateRolesUserModal: boolean;
    handleCancelUpdateRolesUser: () => void;
    confirmLoading: boolean;
    confirmUpdateRolesUser: (roles: Roles[]) => Promise<void>;
    roles: Roles[];
}

export function ConfirmUpdateRolesUserModal({openUpdateRolesUserModal, handleCancelUpdateRolesUser, confirmLoading, confirmUpdateRolesUser, roles}: ModalProps) {
    const [selectedRoles, setSelectedRoles] = useState<Roles[]>([]);
    const [isConfirmVisible, setIsConfirmVisible] = useState(false);

    useEffect(() => {
        if (openUpdateRolesUserModal) {
            setSelectedRoles(roles || []);
            setIsConfirmVisible(false);
        }
    }, [openUpdateRolesUserModal, roles]);

    const handleContinue = () => {
        setIsConfirmVisible(true);
    };

    const handleFinalConfirm = async () => {
        await confirmUpdateRolesUser(selectedRoles);
        setIsConfirmVisible(false);
    };

    const handleCancelConfirm = () => {
        setIsConfirmVisible(false);
    };

    return (
        <>
            <Modal
                title="Изменение прав пользователя"
                centered
                open={openUpdateRolesUserModal && !isConfirmVisible}
                onCancel={handleCancelUpdateRolesUser}
                confirmLoading={confirmLoading}
                footer={
                    <>
                        <Button onClick={handleCancelUpdateRolesUser}>Отмена</Button>
                        <Button
                            type="primary"
                            onClick={handleContinue}
                            disabled={selectedRoles.length === 0}
                        >
                            Продолжить
                        </Button>
                    </>
                }
            >
                <Flex vertical gap={12} style={{ padding: "8px 0" }}>
                    <Text type="secondary">
                        Выберите роли для пользователя:
                    </Text>
                    <Checkbox.Group
                        options={[
                            { label: "Admin", value: Roles.ADMIN },
                            { label: "Moderator", value: Roles.MODERATOR },
                            { label: "User", value: Roles.USER },
                        ]}
                        value={selectedRoles}
                        onChange={(checkedValues) => setSelectedRoles(checkedValues)}
                    />
                </Flex>
            </Modal>

            <Modal
                title="Подтвердите действие"
                centered
                open={isConfirmVisible}
                onCancel={handleCancelConfirm}
                onOk={handleFinalConfirm}
                confirmLoading={confirmLoading}
                okText="Да, изменить"
                cancelText="Отмена"
                okButtonProps={{ danger: true }}
            >
                <Flex vertical gap={8}>
                    <Text>
                        Вы действительно хотите обновить права пользователя?
                    </Text>

                    <Text type="warning" >
                        Это действие может повлиять на доступ пользователя к функционалу системы.
                    </Text>
                </Flex>
            </Modal>
        </>
    );
}