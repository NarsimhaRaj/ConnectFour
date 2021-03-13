import React from 'react';
import './RadioButton.scss';

function RadioButton({children, number}){

    return (
        <>
            <div className="radioButton">
                <input type="radio" name="games" id={`${number}games`} value="2" checked="true"/>
                <label for={`${number}games`}>{children}</label>
            </div>
        </>
    );
}

export default RadioButton;