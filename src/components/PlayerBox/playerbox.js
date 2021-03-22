import React, { useEffect, useState } from "react";
import Avatar from "../Avatar/Avatar";
import './playerbox.scss';

function PlayerBox(props){

    var [textInputValue, setTextInputVal] = useState(props.value);

    useEffect(()=>{
        setTextInputVal(props.value);
    }, [props.value])
    return (
        <>
            <div className={`playerbox-container ${props.inputCustomClass}`} style={{backgroundColor: props.backgroundColor}}>
                <Avatar customInputFileClass={props.customInputFileClass} upload={props.upload} id={props.id} name={props.name} imageUpload={props.imageUpload} classNameSelected={props.classNameSelected} borderColor={props.borderColor} src={props.src}></Avatar>
                <div className="description">
                    <p>
                        {props.description}
                    </p>
                    {
                        props.type=="text" ? <>
                        <input type={props.type} name={props.name} value={textInputValue} onChange={(event)=>props.changeNameEvent(event)} />
                        { props.error?<div className="error">Enter min of 3 Characters</div>: null }
                        </>
                        :
                        <input type={props.type} name={props.name} value={props.value} onClick={(event)=>props.handleClick(event)} />
                    }
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
            </div>
        </>
    )
}


export default PlayerBox;