import {Button, Modal} from "antd";

interface ModalProps {
    openBlockUserModal: boolean,
    handleCancelBlockUser(): void,
    confirmLoading: boolean,
    confirmBlockUser(): Promise<void>
}

export function ConfirmBlockUserModal({openBlockUserModal, handleCancelBlockUser, confirmLoading, confirmBlockUser}: ModalProps) {

    return <Modal
        title="Подтверждение блокировки пользователя"
        centered
        open={openBlockUserModal}
        footer={
            <>
                <Button type="default" onClick={handleCancelBlockUser}>
                    Отмена
                </Button>
                <Button danger loading={confirmLoading} onClick={confirmBlockUser} form="profileForm">
                    Подтвердить действие
                </Button>
            </>
        }
        confirmLoading={confirmLoading}
        onCancel={handleCancelBlockUser}
    >
        Вы уверены, что хотите заблокировать пользователя?
    </Modal>
}