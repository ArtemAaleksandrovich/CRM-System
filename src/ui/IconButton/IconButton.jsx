import styles from './IconButton.module.scss'
function IconButton({color, action, type, text}) {
    return <button className={`${styles.button} ${styles[color]}`} type={type} onClick={action}>{text}</button>
 }
 export default IconButton;