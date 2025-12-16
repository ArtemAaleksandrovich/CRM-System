import styles from './IconButton.module.scss'
import type {MouseEventHandler, ReactNode} from "react";

interface IconButtonProps {
    color: "primary" | "secondary" | "success" | "danger",
    action?: MouseEventHandler<HTMLButtonElement> | undefined,
    type: "button" | "submit",
    children?: ReactNode,
}

function IconButton({color, action, type, children}: IconButtonProps) {
    return <button className={`${styles.button} ${styles[color]}`} type={type} onClick={action}>{children}</button>
}
export default IconButton;