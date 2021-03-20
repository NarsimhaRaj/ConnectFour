import React, { useState } from 'react';
import { withRouter } from 'react-router';
import Card from '../../components/card/card';
import PlayerBox from '../../components/PlayerBox/playerbox';
import player1 from '../../Assets/images/avatar01.png';
import player2 from '../../Assets/images/avatar02.png';
import run from '../../Assets/images/run.png';
import win from '../../Assets/images/winner.png';
import Button from '../../components/buttons/Button';
import Modal from '../../components/modal/modal';
import RadioButton from '../../components/RadioButton/RadioButton';
import './twoPlayerGame.scss';

var cancelButton = {
    backgroundColor:"#FFFFFF", 
    color: "#000000", 
    display: "flex", 
    justifyContent:"center", 
    alignItems: "center"
}

var okButton = {
    color: "#FFFFFF", 
    display: "flex", 
    justifyContent:"center", 
    alignItems: "center"
}

var startGameButton =  {
    width: "100%",
    height: "100px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
}

var modalClass = {
    height: "660px"
}

var modalClass2 = {
    height: "745px"
}

function TwoPlayerGame(props){

    var [modal, setModal] = useState(false);
    var [modal2, setModal2] = useState(false);
    var [totalGames, setTotalGames] = useState(10);
    var [startPlayer, setStartPlayer] = useState(1);

    var handleClickEvent = function(){
        //props.history.push("startgame");
        setModal(true);
    }

    var disableModal = function(){
        setModal(false);
        setModal2(false);
    }

    var setRadioButton = (num)=>{
        setTotalGames(num);
    }

    return (
        <>
        <div class="two-player-title">
            <h1>Two Player Game</h1>
        </div>
        <Card customClass="custom-players-card">
            <PlayerBox divider={true} backgroundColor="#DCF6E4" src={player1} borderColor="#37AC5D" name="David" description="player 01"/>
            <PlayerBox divider={true} backgroundColor="#F6EFD5" src={player2} borderColor="#F8D146" name="Mario" description="player 02"/>
            <PlayerBox divider={true} backgroundColor="#EFF3FF" src={win} borderColor="#00000029" name="5 Games" description="Number of Games"/>
            <PlayerBox divider={true} backgroundColor="#EFF3FF" src={run} borderColor="#00000029" name="Alternative turn" description="Who starts"/>                        
            <div className="divider divider-margin"></div>
            <Button handleClickEvent={()=>{handleClickEvent()}} customStyle={startGameButton} backgroundColor="#4B7BFF">Start Game</Button>
        </Card>   

        <Modal customClass={modalClass} isModal={modal} title="Number of Games" disableModal={disableModal}>
            <div className="modal-content">
                <RadioButton id="2gmaes" value="2" handleClickEvent={(num)=>setRadioButton(num)} >2 Games</RadioButton>
                <RadioButton id="3gmaes" value="3" handleClickEvent={(num)=>setRadioButton(num)} >3 Games</RadioButton>
                <RadioButton id="5gmaes" value="5" defaultChecked={"defaultChecked "} handleClickEvent={(num)=>setRadioButton(num)} >5 Games</RadioButton>
                <RadioButton id="10gmaes" value="10" handleClickEvent={(num)=>setRadioButton(num)} >10 Games</RadioButton>
            </div>
            <div className="modal-footer">
                <div className="row row-buttons">
                    <div className="button">
                        <Button customStyle={cancelButton} backgroundColor="#FFFFFF" handleClickEvent={()=>{disableModal()}}>Cancel</Button>
                    </div>
                    <div className="button">
                        <Button customStyle={okButton} backgroundColor="#4B7BFF" handleClickEvent={()=>{setModal2(true)}}>OK</Button>
                    </div>
                </div>
            </div>
        </Modal>

        <Modal customClass={modalClass2} isModal={modal2} title="Who Starts" disableModal={disableModal}>
            <div className="modal-content">
                <RadioButton id="alternative" defaultChecked={"defaultChecked "} value="a" handleClickEvent={(p)=>setStartPlayer(p)} >Alternative turn</RadioButton>
                <RadioButton id="looser" value="b" handleClickEvent={(p)=>setStartPlayer(p)} >Looser first</RadioButton>
                <RadioButton id="winner" value="c" handleClickEvent={(p)=>setStartPlayer(p)} >Winner first</RadioButton>
                <RadioButton id="player1" value="d" handleClickEvent={(p)=>setStartPlayer(p)} >Always player 01</RadioButton>
                <RadioButton id="player2" value="e" handleClickEvent={(p)=>setStartPlayer(p)} >Always player 02</RadioButton>
            </div>
            <div className="modal-footer">
                <div className="row row-buttons">
                    <div className="button">
                        <Button customStyle={cancelButton} backgroundColor="#FFFFFF" handleClickEvent={()=>{disableModal()}}>Cancel</Button>
                    </div>
                    <div className="button">
                        <Button customStyle={okButton} backgroundColor="#4B7BFF" handleClickEvent={()=>{props.history.push(`/game/${totalGames}/${startPlayer}`)}}>OK</Button>
                    </div>
                </div>
            </div>
        </Modal>     
        </>
    )
}


export default withRouter(TwoPlayerGame);