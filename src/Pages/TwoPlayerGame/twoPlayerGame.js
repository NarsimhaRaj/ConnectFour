import React from 'react';
import { withRouter } from 'react-router';
import Card from '../../components/card/card';
import PlayerBox from '../../components/PlayerBox/playerbox';
import player1 from '../../Assets/images/avatar01.png';
import player2 from '../../Assets/images/avatar02.png';
import run from '../../Assets/images/run.png';
import win from '../../Assets/images/winner.png';
import Button from '../../components/buttons/Button';


var startGameButton =  {
    width: "100%",
    height: "100px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
}

function TwoPlayerGame(props){

    // var [modal, setModal] = useState(false);
    var handleClickEvent = function(){
        props.history.push("startgame");
    }

    // var disableModal = function(){
    //     setModal(false);
    // }

    return (
        <>
        <div class="two-player-title">
            <h1>Two Player Game</h1>
        </div>
        <Card width="760px" height="892px">
            <PlayerBox backgroundColor="#DCF6E4" src={player1} borderColor="#37AC5D" name="David" description="player 01"/>
            <PlayerBox backgroundColor="#F6EFD5" src={player2} borderColor="#F8D146" name="Mario" description="player 02"/>
            <PlayerBox backgroundColor="#EFF3FF" src={win} borderColor="#00000029" name="5 Games" description="Number of Games"/>
            <PlayerBox backgroundColor="#EFF3FF" src={run} borderColor="#00000029" name="Alternative turn" description="Who starts"/>            
            <Button handleClickEvent={handleClickEvent} customClass={startGameButton} backgroundColor="#4B7BFF">Start Game</Button>
        </Card>        
        </>
    )
}


export default withRouter(TwoPlayerGame);