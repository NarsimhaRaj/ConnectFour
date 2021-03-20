import React from "react";
import Avatar from "../Avatar/Avatar";
import './playerbox.scss';

function PlayerBox(props){
    return (
        <>
            <div className="playerbox-container" style={{backgroundColor: props.backgroundColor}}>
                <Avatar classNameSelected={props.classNameSelected} borderColor={props.borderColor} src={props.src}></Avatar>
                <div className="description">
                    <p>
                        {props.description}
                    </p>
                    <h2>
                        {props.name}
                    </h2>
                </div>
                {
                    props.score!=undefined ?
                        <div className="description">
                            <p>
                                score
                            </p>
                            <h2>
                                {props.score}
                            </h2>
                        </div>
                        :
                        null
                }
                {
                    props.divider ? <div className="playerbox-divider"></div>: null
                }
            </div>
        </>
    )
}


export default PlayerBox;