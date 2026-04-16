import { useState, useEffect } from "react";
import { Button, Checkbox, Flex, Modal, Typography } from "antd";
import { Role } from "../../types/admin/types.ts";

const { Text } = Typography;

interface ModalProps {
    isOpenUpdateRolesUserModal: boolean;
    handleCancelUpdateRolesUser: () => void;
    isConfirmLoading: boolean;
    confirmUpdateRolesUser: (roles: Role[]) => Promise<void>;
    roles: Role[];
}

export function ConfirmUpdateRolesUserModal({isOpenUpdateRolesUserModal, handleCancelUpdateRolesUser, isConfirmLoading, confirmUpdateRolesUser, roles}: ModalProps) {
    const [selectedRoles, setSelectedRoles] = useState<Role[]>([]);
    const [isConfirmVisible, setIsConfirmVisible] = useState(false);

    useEffect(() => {
        if (isOpenUpdateRolesUserModal) {
            setSelectedRoles(roles || []);
            setIsConfirmVisible(false);
        }
    }, [isOpenUpdateRolesUserModal, roles]);

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
                open={isOpenUpdateRolesUserModal && !isConfirmVisible}
                onCancel={handleCancelUpdateRolesUser}
                confirmLoading={isConfirmLoading}
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
                            { label: "Admin", value: Role.ADMIN },
                            { label: "Moderator", value: Role.MODERATOR },
                            { label: "User", value: Role.USER },
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
                confirmLoading={isConfirmLoading}
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