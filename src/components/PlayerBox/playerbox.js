import React from "react";


function PlayerBox(props){
    return (
        <>
            <div className="box-container" style={{backgroundColor: props.backgroundColor}}>
                <div class="col-md-2 col-xl-2 col-sm-2 col-xs-2 avatar" style={{borderColor: props.borderColor, }}>
                    <img src="" alt="" />
                </div>
                <div className="col-md-10 col-xl-10 col-sm-10 col-xs-10 description">
                    <p className="">
                        {props.description}
                    </p>
                    <h3>
                        {props.name}
                    </h3>
                </div>
            </div>
        </>
    )
}


export default PlayerBox;