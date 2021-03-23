import React, { useEffect, useState } from 'react';
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

const gameStartBy = {
    'a' : "Alternative turn",
    'b':'Looser first',
    'c':'Winner first',
    'd':'Always Player1',
    'e':'Always Player2'
}

var gamesVal=5;
var startVal = "";

function TwoPlayerGame(props){

    var [modal, setModal] = useState(false);
    var [modal2, setModal2] = useState(false);
    var [totalGames, setTotalGames] = useState(5);
    var [startPlayer, setStartPlayer] = useState("a");
    var [player1Name, setPlayer1Name] = useState("David");
    var [player2Name, setPlayer2Name] = useState("Mario");
    var [player1Error, setPlayer1Error] = useState();
    var [player2Error, setPlayer2Error] = useState();
    var [player1Src, setPlayer1Src] = useState(player1);
    var [player2Src, setPlayer2Src] = useState(player2);
    var [disable, setButtonDisable] = useState(false);


    useEffect(()=>{
        if(player1Error || player2Error){
            setButtonDisable(true);
        }
        else{
            setButtonDisable(false);
        }
    }, [player1Error, player2Error]);

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

    const changeNameEvent = (e)=>{
        var {name, value} = e.target;
        if(value.length<10){
            if(name=="player1"){
                setPlayer1Name(value);
                if(value.length<3){
                    setPlayer1Error(true);
                }
                else{
                    setPlayer1Error(false);
                }
            }
            else{
                setPlayer2Name(value);
                if(value.length<3){
                    setPlayer2Error(true);
                }
                else{
                    setPlayer2Error(false);
                }
            }
        }
    }
    const handleClick = (e)=>{
        var {name, value} = e.target;
        
        if(name=="games"){
            setModal(true);
        }
        else{
            setModal2(true);
        }
    }

    const startGame = ()=>{
        props.history.push(`/game/${player1Name}/${player2Name}/${totalGames}/${startPlayer}`)
    }

    const getBase64 = (file) => {
        return new Promise((resolve,reject) => {
           const reader = new FileReader();
           reader.onload = () => resolve(reader.result);
           reader.onerror = error => reject(error);
           reader.readAsDataURL(file);
        });
      }

    const imageUpload=(event)=>{
        var {name, files} = event.target;
        getBase64(files[0]).then(base64 => {
            localStorage[name] = base64;
            if(name=="player1"){
                setPlayer1Src(localStorage.getItem(name));
            }
            else{
                setPlayer2Src(localStorage.getItem(name))
            }
        });

    }

    return (
        <>
        <div class="two-player-title">
            <h1>Two Player Game</h1>
        </div>
        <Card customClass="custom-players-card">
            <PlayerBox customInputFileClass={"player1InputFileClass"} upload={true} id={"player1"} name={"player1"} imageUpload={imageUpload} error={player1Error} inputCustomClass={"player1Input"} type={"text"} name={"player1"} value={player1Name} changeNameEvent={changeNameEvent} backgroundColor="#DCF6E4" src={player1Src} borderColor="#37AC5D" description="player 01"/>
            <PlayerBox customInputFileClass={"player2InputFileClass"} upload={true} id={"player2"} name={"player2"} imageUpload={imageUpload} error={player2Error} inputCustomClass={"player2Input"} type={"text"} name={"player2"} value={player2Name} changeNameEvent={changeNameEvent} backgroundColor="#F6EFD5" src={player2Src} borderColor="#F8D146" description="player 02"/>
            <PlayerBox inputCustomClass={"games"} type={"button"} name={"games"} value={`${totalGames} Games`} handleClick={handleClick} backgroundColor="#EFF3FF" src={win} borderColor="#00000029" description="Number of Games"/>
            <PlayerBox inputCustomClass={"whostarts"} type={"button"} name={"start"} value={gameStartBy[startPlayer]} handleClick={handleClick}  backgroundColor="#EFF3FF" src={run} borderColor="#00000029" description="Who starts"/>                        
            <div className="divider divider-margin"></div>
            <Button disable={disable} handleClickEvent={()=>startGame()} customStyle={startGameButton} backgroundColor="#4B7BFF">Start Game</Button>
        </Card>   

        <Modal customClass={modalClass} isModal={modal} title="Number of Games" disableModal={disableModal}>
            <div className="modal-content">
                <RadioButton id="2gmaes" value={2}  setValue={totalGames} handleClickEvent={(num)=>setRadioButton(num)} >2 Games</RadioButton>
                <RadioButton id="3gmaes" value={3} setValue={totalGames} handleClickEvent={(num)=>setRadioButton(num)} >3 Games</RadioButton>
                <RadioButton id="5gmaes" value={5} setValue={totalGames} handleClickEvent={(num)=>setRadioButton(num)} >5 Games</RadioButton>
                <RadioButton id="10gmaes" value={10} setValue={totalGames} handleClickEvent={(num)=>setRadioButton(num)} >10 Games</RadioButton>
            </div>
            <div className="modal-footer">
                <div className="row row-buttons">
                    <div className="button">
                        <Button customStyle={cancelButton} backgroundColor="#FFFFFF" handleClickEvent={()=>{disableModal()}}>Cancel</Button>
                    </div>
                    <div className="button">
                        <Button customStyle={okButton} name={"games"} backgroundColor="#4B7BFF" handleClickEvent={(event)=>{disableModal()}}>OK</Button>
                    </div>
                </div>
            </div>
        </Modal>

        <Modal customClass={modalClass2} isModal={modal2} title="Who Starts" disableModal={disableModal}>
            <div className="modal-content">
                <RadioButton id="alternative" setValue={startPlayer} value="a" handleClickEvent={(p)=>setStartPlayer(p)} >Alternative turn</RadioButton>
                <RadioButton id="looser" value="b" setValue={startPlayer} handleClickEvent={(p)=>setStartPlayer(p)} >Looser first</RadioButton>
                <RadioButton id="winner" value="c" setValue={startPlayer} handleClickEvent={(p)=>setStartPlayer(p)} >Winner first</RadioButton>
                <RadioButton id="Alwaysplayer1" value="d" setValue={startPlayer} handleClickEvent={(p)=>setStartPlayer(p)} >Always player 01</RadioButton>
                <RadioButton id="Alwaysplayer2" value="e" setValue={startPlayer} handleClickEvent={(p)=>setStartPlayer(p)} >Always player 02</RadioButton>
            </div>
            <div className="modal-footer">
                <div className="row row-buttons">
                    <div className="button">
                        <Button customStyle={cancelButton} backgroundColor="#FFFFFF" handleClickEvent={()=>{disableModal()}}>Cancel</Button>
                    </div>
                    <div className="button">
                        <Button customStyle={okButton} name={"whostarts"} backgroundColor="#4B7BFF" handleClickEvent={(event)=>{disableModal()}}>OK</Button>
                    </div>
                </div>
            </div>
        </Modal>     
        </>
    )
}


export default withRouter(TwoPlayerGame);