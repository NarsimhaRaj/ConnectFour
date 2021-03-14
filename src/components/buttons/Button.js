import React from 'react';
import './button.scss';

function Button(props){

    return (
        <>
            <button onClick={()=>{ props.handleClickEvent(); }} className={props.customClass} style={{...props.customStyle, backgroundColor: props.backgroundColor}}>
                {
                    props.src ? <img src={props.src} alt={props.altText}/> : null
                }
                {props.children}
            </button>
        </>
    );

}

export default Button;