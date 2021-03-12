import React from 'react';
import './button.scss';

function Button(props){

    return (
        <>
            <button onClick={(event)=>{ props.handleClick(event); }} style={{backgroundColor: props.backgroundColor}}>
                <img src={props.src} alt={props.altText}/>
                {props.children}
            </button>
        </>
    );

}

export default Button;