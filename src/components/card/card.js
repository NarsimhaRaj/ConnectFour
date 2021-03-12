import React from 'react';
import './card.scss';

function card(props) {
    return (
        <div class="card" style={{"width": props.width, "height":props.height}}>
            {props.children}
        </div>
    );
}

export default card;