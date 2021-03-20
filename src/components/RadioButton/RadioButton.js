import React from 'react';
import './RadioButton.scss';

function RadioButton({children,id, value, handleClickEvent, defaultChecked}){

    return (
        <>
            <div className="radioButton">
                <input type="radio" name="games" id={id} defaultChecked={defaultChecked ? true : false} value={value} onClick={(event)=>handleClickEvent(event.target.value)}/>
                <label for={id}>{children}</label>
            </div>
        </>
    );
}

export default RadioButton;