import React, { useEffect, useRef } from 'react';
import './Avatar.scss';

function Avatar(props){

    var fileRef = useRef();

    var startDrag = (ev) => {
        ev.dataTransfer.setData("player", props.src);
    }

    return (
        <>
        {
            props.classNameSelected ? <div className={props.classNameSelected}>
                <div>
                    <div className="avatar" draggable onDragStart={startDrag} style={{borderColor: props.borderColor, backgroundColor: props.backgroundColor }}>
                        {
                            props.src ? props.upload ? <>
                                <input style={{display: "none"}} type={"file"} id={props.id} name={props.name} onChange={(event)=>props.imageUpload(event)} ref={fileRef}/>
                                <img src={props.src} for={props.id} alt="icon" onClick={()=>{ fileRef.current.click();}} />
                            </>
                            : 
                            <img src={props.src} alt="icon" />
                            : null 
                        }
                    </div>
                </div>
            </div>
            :
            <div>
                <div className="avatar" style={{borderColor: props.borderColor, backgroundColor: props.backgroundColor }}>
                    {
                        props.src ? props.upload ? <>
                            <input style={{display: "none"}} type={"file"} id={props.id} name={props.name} onChange={(event)=>props.imageUpload(event)} ref={fileRef}/>
                            <img src={props.src} for={props.id} alt="icon" onClick={()=>{ fileRef.current.click();}} />
                        </>
                        : 
                        <img src={props.src} alt="icon" />
                        : null 
                    }
                </div>
            </div>
        }
        </>
    );
}


export default Avatar;