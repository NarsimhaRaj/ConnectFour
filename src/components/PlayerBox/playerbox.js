import React from "react";
import './playerbox.scss';

function PlayerBox(props){
    return (
        <>
            <div className="row playerbox-container" style={{backgroundColor: props.backgroundColor}}>
                <div className="col-md-2 col-xl-2 col-sm-2 col-xs-2 avatar" style={{borderColor: props.borderColor }}>
                    {
                        props.src ?<img src={props.src} alt="icon" />: null 
                    }
                </div>
                <div className="col-md-10 col-xl-10 col-sm-10 col-xs-10 description">
                    <p>
                        {props.description}
                    </p>
                    <h2>
                        {props.name}
                    </h2>
                </div>
            </div>
        </>
    )
}


export default PlayerBox;