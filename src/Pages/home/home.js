import React, { useState } from 'react';
import Card from '../../components/card/card';
import Button from '../../components/buttons/Button';
import './home.scss';

import one from "../../Assets/images/one.png";
import two from "../../Assets/images/two.png";
import online from "../../Assets/images/online.png";    
import training from "../../Assets/images/training.png";
import { withRouter } from 'react-router';
import Modal from '../../components/modal/modal';


var cardCustomStyle = {
    width: "75%",
    height: "660px"
}

function Home(props){

    var [isModal, setModal] = useState(false);

    var handleClickEvent = (path) =>{
        // props.history.push(path);
        setModal(true);
    }

    return (
        <div className="home-body">
        <div className="connect-four-title">
            <h2>Connect Four</h2>
            <p>
               Play with other players<br/> 
               around the world.
            </p>
        </div>

        <Card customStyle={cardCustomStyle}>
        <div className="main-card-content">
            <div className="">
                <div className="play-button">
                <img src="" alt="play"/>
                <label>play</label>
                </div>
            </div>
            <div className="">
                <div className="playing-img"></div>
            </div>
        </div>
        <div className="button-group">
            <div className="row-buttons">
                <div className="button">
                    <Button handleClickEvent={()=>{handleClickEvent("/commingSoon")}} src={one} backgroundColor="#4BABFF" altText="Cusotm Game" >Custom Game</Button>
                </div>
                <div className="button">
                    <Button src={two} backgroundColor="#4B7BFF" handleClickEvent={()=>{ props.history.push("/twoPlayerGame")}} altText="Two Players" >Two Players</Button>
                </div>
            </div>
            <div>
            <div className="row-buttons">
                <div className="button">
                        <Button handleClickEvent={()=>{handleClickEvent("/commingSoon")}}  src={online} backgroundColor="#4B4BFF" altText="Online Game" >Online Game</Button>
                    </div>
                    <div className="button">
                        <Button handleClickEvent={()=>{handleClickEvent("/commingSoon")}}  src={training} backgroundColor="#6E4BFF" altText="Training Game" >Training Game</Button>
                    </div>
                </div>
            </div>
        </div>

      </Card>
      <div className="card-behind">
      </div>

      <Modal isModal={isModal} disableModal={()=>{ setModal(false); }}>
          <h2 style={{width: "100%", height:"100%", textAlign: "center"}}>Comming Soon</h2>
      </Modal>
      </div>
    );
}

export default withRouter(Home);
