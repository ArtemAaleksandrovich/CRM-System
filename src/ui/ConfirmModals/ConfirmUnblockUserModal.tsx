import {ConfirmModal} from "./ConfirmModal.tsx";

interface UnblockModalProps {
    isOpenUnblockUserModal: boolean,
    handleCancelUnblockUser(): void,
    isConfirmLoading: boolean,
    confirmUnblockUser(): Promise<void>
}

export function ConfirmUnblockUserModal(props: UnblockModalProps) {
    return <ConfirmModal
        isOpen={props.isOpenUnblockUserModal}
        title="Подтверждение разблокировки пользователя"
        children="Вы уверены, что хотите разблокировать пользователя?"
        confirmText="Подтвердить разблокировку"
        isConfirmLoading={props.isConfirmLoading}
        onCancel={props.handleCancelUnblockUser}
        onConfirm={props.confirmUnblockUser}
    />
}