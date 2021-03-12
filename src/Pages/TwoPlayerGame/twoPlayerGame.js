import React from 'react';
import Card from '../../components/card/card';
import PlayerBox from '../../components/PlayerBox/playerbox';

function TwoPlayerGame(props){
    return (
        <>
        <div class="title">
            <h1>Two Player Game</h1>
        </div>
        <Card width="760px" height="892px">
            <PlayerBox backgroundColor="#DCF6E4" src="" borderColor="#37AC5D" name="David" description="player 01"/>
            <PlayerBox backgroundColor="#F6EFD5" src="" borderColor="#F8D146" name="Mario" description="player 02"/>
            <PlayerBox backgroundColor="#EFF3FF" src="" borderColor="#00000029" name="5 Games" description="Number of Games"/>
            <PlayerBox backgroundColor="#EFF3FF" src="" borderColor="#00000029" name="Alternative turn" description="Who starts"/>
        </Card>
        </>
    )
}


export default TwoPlayerGame;