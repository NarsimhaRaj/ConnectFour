import React from "react";
import Avatar from "../Avatar/Avatar";
import './playerbox.scss';

function PlayerBox(props){
    return (
        <>
            <div className="playerbox-container" style={{backgroundColor: props.backgroundColor}}>
                <Avatar borderColor={props.borderColor} src={props.src}></Avatar>
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