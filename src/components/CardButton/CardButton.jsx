import './CardButton.scss'
function CardButton({color, action, text}) {
     return <button className={"card__btns__btn"} style={{backgroundColor: color}} onClick={action}>{text}</button>
 }
 export default CardButton;