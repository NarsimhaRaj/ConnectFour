import React from 'react';
import { withRouter } from 'react-router';
import './modal.scss';

function Modal(props) {

    return (
        <>
        { 
        props.isModal ?
            <div class="modal-overlay" onClick={props.disableModal}>
                <div class="modal-card">
                    {props.children}
                </div>
            </div>            
            :null
        }
        </>

    );
}

export default withRouter(Modal);