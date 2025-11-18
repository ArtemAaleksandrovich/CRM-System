import './ButtonList.scss'
import CardButton from '../CardButton/CardButton.jsx'
import React from "react";

function ButtonList({isEditing, onSave, onDel, edit, cancel}) {
    return (
        <div className="card__btns">
            {!isEditing ? (
                <>
                    <CardButton color={'#4ca3ec'} action={edit} text={"🖊️"}/>
                    <CardButton color={'#ef4242'} action={onDel} text={"🗑️"}/>
                </>
            ) : (
                <>
                    <CardButton color={'#4ca3ec'} action={onSave} text={"💾️"}/>
                    <CardButton color={'#ef4242'} action={cancel} text={"❌️"}/>
                </>
            )}
        </div>
    )
}
export default ButtonList;