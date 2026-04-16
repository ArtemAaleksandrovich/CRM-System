import {ConfirmModal} from "./ConfirmModal.tsx";

interface BlockModalProps {
    isOpenBlockUserModal: boolean,
    handleCancelBlockUser(): void,
    isConfirmLoading: boolean,
    confirmBlockUser(): Promise<void>
}

export function ConfirmBlockUserModal(props: BlockModalProps) {
    return <ConfirmModal
        isOpen={props.isOpenBlockUserModal}
        title="Подтверждение блокировки пользователя"
        children="Вы уверены, что хотите заблокировать пользователя?"
        confirmText="Подтвердить блокировку"
        isConfirmLoading={props.isConfirmLoading}
        onCancel={props.handleCancelBlockUser}
        onConfirm={props.confirmBlockUser}
    />
}