import React from 'react';
import './card.scss';

function card(props) {
    return (
        <div class={`card ${props.customClass}`} style={{...props.customStyle}}>
            {props.children}
        </div>
    );
}

export default card;