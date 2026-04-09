import {Button, Modal} from "antd";

interface ModalProps {
    openDeleteUserModal: boolean,
    handleCancelDeleteUser(): void,
    confirmLoading: boolean,
    confirmDeleteUser(): Promise<void>
}

export function ConfirmDeleteUserModal({openDeleteUserModal, handleCancelDeleteUser, confirmLoading, confirmDeleteUser}: ModalProps) {

    return <Modal
        title="Подтверждение удаления пользователя"
        centered
        open={openDeleteUserModal}
        footer={
            <>
                <Button type="default" onClick={handleCancelDeleteUser}>
                    Отмена
                </Button>
                <Button danger loading={confirmLoading} onClick={confirmDeleteUser} form="profileForm">
                    Подтвердить удаление
                </Button>
            </>
        }
        confirmLoading={confirmLoading}
        onCancel={handleCancelDeleteUser}
    >
        Вы уверены, что хотите удалить пользователя? Отменить действие будет невозможно!
    </Modal>
}