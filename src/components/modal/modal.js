import React from 'react';
import { withRouter } from 'react-router';
import './modal.scss';

function Modal(props) {

    return (
        <>
        { 
        props.isModal ?
            <div class="modal-overlay" onClick={(event)=>{event.stopPropagation(); props.disableModal()}}>
                <div class="modal-card" style={{...props.customClass}} onClick={(e)=>{e.stopPropagation();}}>
                <div className="modal-title">
                    <h2>{props.title}</h2>
                </div>
                    {props.children}
                </div>
            </div>            
            :null
        }
        </>

    );
}

export default withRouter(Modal);