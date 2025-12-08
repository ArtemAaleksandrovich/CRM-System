import styles from './CheckBox.module.scss'
import React from "react";

function CheckBox({onChange, isChecked, isHidden}) {
    return (
        <label className={`${styles.checkbox} ${isHidden ? styles.hidden : ''}`}>
            <input onChange={onChange} type={'checkbox'} checked={isChecked} />
            <div className={`${styles.checkmark} ${isChecked ? styles.checked : ''} `}></div>
        </label>
    )
}
export default CheckBox;