import {ConfirmModal} from "./ConfirmModal.tsx";

interface DeleteModalProps {
    isOpenDeleteUserModal: boolean,
    handleCancelDeleteUser(): void,
    isConfirmLoading: boolean,
    confirmDeleteUser(): Promise<void>
}

export function ConfirmDeleteUserModal(props: DeleteModalProps) {
    return <ConfirmModal
        isOpen={props.isOpenDeleteUserModal}
        title="Подтверждение удаления пользователя"
        children="Вы уверены, что хотите удалить пользователя? Отменить действие будет невозможно!"
        confirmText="Подтвердить удаление"
        isConfirmLoading={props.isConfirmLoading}
        onCancel={props.handleCancelDeleteUser}
        onConfirm={props.confirmDeleteUser}
    />
}