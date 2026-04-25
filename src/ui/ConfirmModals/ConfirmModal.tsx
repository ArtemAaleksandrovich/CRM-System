import { Button, Modal } from "antd";
import type {ReactNode} from "react";

interface ConfirmModalProps {
    isOpen: boolean;
    title: string;
    children: ReactNode;
    confirmText: string;
    isConfirmLoading: boolean;
    onConfirm(): Promise<void>;
    onCancel(): void;
}

export function ConfirmModal({isOpen, title, children, confirmText, isConfirmLoading, onConfirm, onCancel}: ConfirmModalProps) {
    return (
        <Modal
            title={title}
            centered
            open={isOpen}
            footer={
                <>
                    <Button type="default" onClick={onCancel}>
                        Отмена
                    </Button>
                    <Button danger loading={isConfirmLoading} onClick={onConfirm}>
                        {confirmText}
                    </Button>
                </>
            }
            confirmLoading={isConfirmLoading}
            onCancel={onCancel}
        >
            {children}
        </Modal>
    );
}