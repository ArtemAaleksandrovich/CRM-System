import styles from './CheckBox.module.scss'

interface CheckBoxProps {
    onChange(): void;
    isChecked: boolean;
    isHidden: boolean;
}

function CheckBox({onChange, isChecked, isHidden}: CheckBoxProps) {
    return (
        <label className={`${styles.checkbox} ${isHidden ? styles.hidden : ''}`}>
            <input onChange={onChange} type={'checkbox'} checked={isChecked} />
            <div className={`${styles.checkmark} ${isChecked ? styles.checked : ''} `}></div>
        </label>
    )
}
export default CheckBox;