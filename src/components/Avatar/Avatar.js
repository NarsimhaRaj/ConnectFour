import React from 'react';
import './Avatar.scss';

function Avatar(props){

    return (
        <>
        <div className="avatar" style={{borderColor: props.borderColor, backgroundColor: props.backgroundColor }}>
            {
                props.src ?<img src={props.src} alt="icon" />: null 
            }
        </div>
        </>
    );
}


export default Avatar;