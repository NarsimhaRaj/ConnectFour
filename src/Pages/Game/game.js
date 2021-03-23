import React from 'react';
import Avatar from '../../components/Avatar/Avatar';
import Card from '../../components/card/card';
import './game.scss';
import player1 from '../../Assets/images/avatar01.png';
import player2 from '../../Assets/images/avatar02.png';
import PlayerBox from '../../components/PlayerBox/playerbox';
import Button from '../../components/buttons/Button';

var undo = [];
var winningPoisitons = [];
var winnerSrc = player1;
var winnerBorder = "#F8D146";

export class Game extends React.Component{
    constructor(props){
        super(props);
        var total = 1;
        var allGames = parseInt(this.props.match.params.totalGames);
        if(allGames%2==0){
            total = allGames/2+1;
        }
        else{
            total = Math.ceil(allGames/2);
        }
        var player = parseInt(this.props.match.params.startPlayer);

        var whoStarts = this.props.match.params.startPlayer;
        var currPlayer = 0;
        if(whoStarts=='a'){ 
            currPlayer = 0;
        }
        else if(whoStarts=='b'){
            currPlayer = currPlayer^1;
        }
        else if(whoStarts=='d'){
            currPlayer = 0;
        }
        else if(whoStarts=='e'){
            currPlayer = 1;
        }
        else{
            currPlayer=currPlayer;
        }

        this.state = {
            playerCounter: currPlayer,
            boardState: Array(8).fill().map(() => Array(8).fill(0)),
            win: false,
            player1WinCounter: 0,
            player2WinCounter: 0,
            totalWins: total,
            currentGame: 1,
            totalGames: allGames,
            currentColBoard: Array(8).fill(7),
            tournamentWinner: "", 
            player1Src: localStorage.getItem("player1") || player1,
            player2Src: localStorage.getItem("player2") || player2,
        };
    }

    handleClickEvent = (event, colIndex) => {
        if(this.state.win){
            return;
        }
        var rowIndex  = this.state.currentColBoard[colIndex];
        
        if(rowIndex<0){
            return;
        }
        undo.push({"x":colIndex, "y": rowIndex});
        event.stopPropagation();
        if(this.state.playerCounter===0) {
            let newBoardState = this.state.boardState;
            newBoardState[colIndex][rowIndex] = 1;
            let newCurrentColBoard = this.state.currentColBoard;
            newCurrentColBoard[colIndex]=newCurrentColBoard[colIndex]-1; 
            let newState = { 
                playerCounter: 1,
                boardState: newBoardState,
                win: this.state.win,
                currentColBoard: newCurrentColBoard
            }  
            this.setState(newState);
        }
        else{
            let newBoardState = this.state.boardState;
            newBoardState[colIndex][rowIndex] = 2;
            let newCurrentColBoard = this.state.currentColBoard;
            newCurrentColBoard[colIndex]=newCurrentColBoard[colIndex]-1; 
            let newState = { 
                playerCounter: 0,
                boardState: newBoardState,
                win: this.state.win,
                currentColBoard: newCurrentColBoard
            }  
            this.setState(newState);
        }    

        this.checkForWinningState(colIndex, rowIndex);
    }   
    checkForWinningState = (rowIndex, colIndex)=>{       
        if(this.checkVertically(rowIndex, colIndex) || this.checkHorizontally(rowIndex, colIndex) || this.checkDiagonally(rowIndex, colIndex)){
            if(this.state.playerCounter==0){
                winnerSrc = this.state.player1Src;                
                winnerBorder = "#37AC5D";
                let newBoardState = this.state.boardState;
                for(var i=0;i<4;i++){
                    newBoardState[winningPoisitons[i]["x"]][winningPoisitons[i]["y"]] = 3;
                }                
                if((this.state.player1WinCounter+1)>this.state.player2WinCounter){
                    let tournamentWinnerName = this.props.match.params.player1;
                    this.setState({...this.state, win: true, player1WinCounter: this.state.player1WinCounter+1, boardState: newBoardState, tournamentWinner: tournamentWinnerName});            
                }
                else{
                    this.setState({...this.state, win: true, player1WinCounter: this.state.player1WinCounter+1, boardState: newBoardState});            
                }
            }
            else{
                winnerSrc = this.state.player2Src;
                winnerBorder = "#F8D146";
                let newBoardState = this.state.boardState;
                for(var i=0;i<4;i++){
                    newBoardState[winningPoisitons[i]["x"]][winningPoisitons[i]["y"]] = 3;
                }
                if((this.state.player2WinCounter+1)>this.state.player1WinCounter){
                    let tournamentWinnerName = this.props.match.params.player2;
                    this.setState({...this.state, win: true, player2WinCounter: this.state.player2WinCounter+1, boardState: newBoardState, tournamentWinner: tournamentWinnerName});            
                }
                else{
                    this.setState({...this.state, win: true, player2WinCounter: this.state.player2WinCounter+1, boardState: newBoardState});            
                }
            }
        }

    }

    checkHorizontally = (rowIndex, colIndex)=>{
        var boardState = this.state.boardState;
        var currVal = boardState[rowIndex][colIndex];
        var x = rowIndex;
        var count = 0;
        while(count<4 && x<8){
            if(boardState[x][colIndex]!==currVal){
                break;
            }
            winningPoisitons.push({"x":x, "y": colIndex});
            x++;
            count++;
        }
        x = rowIndex-1;
        while(count<4 && x>=0){
            if(boardState[x][colIndex]!==currVal){
                break;
            }            
            winningPoisitons.push({"x":x, "y": colIndex});
            x--;            
            count++;
        }

        if(count==4){
            return true;
        }        
        winningPoisitons = [];
        return false;
    }

    checkVertically = (rowIndex, colIndex)=>{
        var boardState = this.state.boardState;
        var currVal = boardState[rowIndex][colIndex];
        var y = colIndex;
        var count = 0;

        while(count<4 && y<8){
            if(boardState[rowIndex][y]!==currVal){
                break;
            }
            winningPoisitons.push({"x":rowIndex, "y": y});
            y++;
            count++;
        }
        y = colIndex-1;
        while(count<4 && y>=0){
            if(boardState[rowIndex][y]!==currVal){
                break;
            }
            winningPoisitons.push({"x":rowIndex, "y": y});
            y--;
            count++;
        }

        if(count===4){
            return true;
        }
        winningPoisitons = [];
        return false;
    }

    checkDiagonally = (rowIndex, colIndex)=>{
        var boardState = this.state.boardState;
        var currVal = boardState[rowIndex][colIndex];
        var x = rowIndex;
        var y = colIndex;
        var count = 0;

        while(count<4 && x<8 && y<8){
            if(boardState[x][y]!==currVal){
                break;
            }
            winningPoisitons.push({"x":x, "y": y});
            x++;
            y++;
            count++;
        }
        x = rowIndex-1;
        y = colIndex-1;
        while(count<4 && x>=0 && y>=0){
            if(boardState[x][y]!==currVal){
                break;
            }
            winningPoisitons.push({"x":x, "y": y});
            x--;
            y--;
            count++;
        }

        if(count===4){
            return true;
        }
        winningPoisitons=[];
        x = rowIndex;
        y = colIndex;
        count = 0;

        while(count<4 && x<8 && y>=0){
            if(boardState[x][y]!==currVal){
                break;
            }
            winningPoisitons.push({"x":x, "y": y});
            x++;
            y--;
            count++;
        }
        x = rowIndex-1;
        y = colIndex+1;
        while(count<4 && x>=0 && y<8){
            if(boardState[x][y]!==currVal){
                break;
            }
            winningPoisitons.push({"x":x, "y": y});
            x--;
            y++;
            count++;
        }

        if(count===4){
            return true;
        }
        winningPoisitons = [];
        return false;
    }

    undoStep = ()=>{
        if(undo.length>0){
            let element = undo.pop();
            let newBoardState = this.state.boardState;
            newBoardState[element["x"]][element["y"]] = 0;
            let newCurrentColBoard = this.state.currentColBoard;
            console.log(element, newCurrentColBoard[element["x"]]);
            newCurrentColBoard[element["x"]]=newCurrentColBoard[element["x"]]+1;
            if(this.state.playerCounter==0){
                this.setState({...this.state, 
                    boardState: newBoardState, 
                    playerCounter: 1, 
                    currentColBoard: newCurrentColBoard
                });
            }
            else{
                this.setState({...this.state, 
                    boardState: newBoardState, 
                    playerCounter: 0,
                    currentColBoard: newCurrentColBoard
                });
            }
        }
    }

    startNewGame = ()=>{
        while(undo.length>0){
            undo.pop();
        }
        if((this.state.currentGame==this.state.totalGames)|| (this.state.player2WinCounter===this.state.totalWins || this.state.player1WinCounter===this.state.totalWins)){
            this.props.history.push("/");
        }
        else{
            var whoStarts = this.props.match.params.startPlayer;
            var currPlayer = this.state.playerCounter;
            if(whoStarts=='a'){ 
                currPlayer = this.state.currentGame%2;
            }
            else if(whoStarts=='b'){
                currPlayer = currPlayer^1;
            }
            else if(whoStarts=='d'){
                currPlayer = 0;
            }
            else if(whoStarts=='e'){
                currPlayer = 1;
            }
            else{
                currPlayer=currPlayer;
            }
            this.setState({...this.state, 
                win: 0, 
                currentGame: this.state.currentGame+1,
                playerCounter: currPlayer,
                boardState: Array(8).fill().map(() => Array(8).fill(0)),
                currentColBoard: Array(8).fill(7)
            });
        }
    }

    render(){

        return (
            <div className="game-cards">
                <Card customClass={"front-card"}>
                    <div className="background-mat-parent">
                        <div className="background-mat">
                        </div>
                    </div>
                    <div class="game-content"> 
                    {
                        this.state.boardState.map((rowElement, rowIndex)=>{
                            return (
                                <div key={rowIndex} className="game-col" onClick={(event)=>this.handleClickEvent(event, rowIndex)}>
                                    {
                                        rowElement.map((colElement, colIndex)=>{
                                            return (
                                                <React.Fragment key={colIndex}>{
                                                this.state.boardState[rowIndex][colIndex]===1 ?
                                                    <div className="avatar-circle">
                                                        <Avatar borderColor={"#37AC5D"} backgroundColor={"#DCF6E4"} src={this.state.player1Src}></Avatar>
                                                    </div>
                                                    :
                                                    this.state.boardState[rowIndex][colIndex]===2 ?
                                                    <div className="avatar-circle">
                                                        <Avatar borderColor={"#F8D146"} backgroundColor={"#F6EFD5"} src={this.state.player2Src}></Avatar>
                                                    </div> 
                                                    :                                                    
                                                    this.state.boardState[rowIndex][colIndex]===3 ?
                                                    <div className="avatar-circle avatar-winning-circle">
                                                        <Avatar borderColor={winnerBorder} backgroundColor={"#F6EFD5"} src={winnerSrc}></Avatar>
                                                    </div> 
                                                    :
                                                    <div key={colIndex} className={this.state.boardState[rowIndex][colIndex]===1?"circle-border blue" : this.state.boardState[rowIndex][colIndex]===2 ? "circle-border yellow" : "circle-border"} >
                                                        <div className="circle">                                                                                
                                                        </div>  
                                                    </div>
                                                }
                                                </React.Fragment>
                                            );
                                        })
                                    }
                                </div>
                            )
                        })
                    }
                    </div>
                </Card>
                <Card customClass={"backend-card"}>
                    <div className="tournament-board">
                        <div className="title">
                            <h2>{this.state.totalGames} Games Tournament</h2>
                            {!this.state.win && <p>{this.state.currentGame} game</p>}
                        </div>
                        {
                            (this.state.win && this.state.player2WinCounter!==this.state.totalWins && this.state.player1WinCounter!==this.state.totalWins)
                            ? <>
                                <div className="congratulations">Congratulations! </div>
                                <div> 
                                    {this.state.playerCounter===0? this.props.match.params.player1 : this.props.match.params.player2}, you Won Game {this.state.currentGame}
                                </div> 
                            </>
                            : 
                            (this.state.win && (this.state.player1WinCounter>=this.state.totalWins || this.state.player2WinCounter>=this.state.totalWins)) ? 
                            <>
                                <div className="congratulations">Congratulations! </div>
                                <div> 
                                    {this.state.tournamentWinner}, you Won Tournament
                                </div>
                            </> 
                            : 
                            this.state.win && this.state.currentGame===this.state.totalGames ?
                            <>
                                <div className="congratulations">Draw !</div>
                            </>
                            :
                            null
                        }
                        <div>
                        <PlayerBox  inputCustomClass={"player1GameInput"} value={this.props.match.params.player1} classNameSelected={this.state.playerCounter==0 ? "classNameSelected": null} score={this.state.player1WinCounter} backgroundColor="#DCF6E4" src={this.state.player1Src} borderColor="#37AC5D" name="David" description="player 1" backgroundColor={"#DCF6E4"}/>
                        <PlayerBox  inputCustomClass={"player2GameInput"} value={this.props.match.params.player2} classNameSelected={this.state.playerCounter==1 ? "classNameSelected": null} score={this.state.player2WinCounter} backgroundColor="#F6EFD5" src={this.state.player2Src} borderColor="#F8D146" name="Mario" description="player 2" backgroundColor={"#F6EFD5"}/>            
                        </div>
                        <div className="button-group">
                            <div className="button">
                                {
                                    this.state.win ? 
                                    <Button customClass={"savecancelButton"} backgroundColor="#4B7BFF" handleClickEvent={this.startNewGame} >Next Game</Button> 
                                    :
                                    <Button customClass={"savecancelButton"} backgroundColor="#4B7BFF" handleClickEvent={this.undoStep} >Undo Step</Button>
                                }
                            </div>
                            <div className="button">
                                <Button customClass={"end-tournament"} backgroundColor="#FFFFFF" handleClickEvent={()=>this.props.history.push('/')} >End Tournament</Button>
                            </div>
                        </div>
                    </div>
                </Card>
            </div>
        )
    }
}

