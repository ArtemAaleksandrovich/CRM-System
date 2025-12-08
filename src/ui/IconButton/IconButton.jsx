import styles from './IconButton.module.scss'
function IconButton({color, action, type, children}) {
    return <button className={`${styles.button} ${styles[color]}`} type={type} onClick={action}>{children}</button>
 }
 export default IconButton;