import React from 'react';
import './card.scss';

function card(props) {
    return (
        <div class="card" style={{...props.customStyle}}>
            {props.children}
        </div>
    );
}

export default card;