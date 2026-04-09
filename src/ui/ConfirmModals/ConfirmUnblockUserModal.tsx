import {Button, Modal} from "antd";

interface ModalProps {
    openUnblockUserModal: boolean,
    handleCancelUnblockUser(): void,
    confirmLoading: boolean,
    confirmUnblockUser(): Promise<void>
}

export function ConfirmUnblockUserModal({openUnblockUserModal, handleCancelUnblockUser, confirmLoading, confirmUnblockUser}: ModalProps) {

    return <Modal
        title="Подтверждение разблокировки пользователя"
        centered
        open={openUnblockUserModal}
        footer={
            <>
                <Button type="default" onClick={handleCancelUnblockUser}>
                    Отмена
                </Button>
                <Button danger loading={confirmLoading} onClick={confirmUnblockUser} form="profileForm">
                    Подтвердить действие
                </Button>
            </>
        }
        confirmLoading={confirmLoading}
        onCancel={handleCancelUnblockUser}
    >
        Вы уверены, что хотите разблокировать пользователя?
    </Modal>
}