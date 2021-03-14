import React from 'react';
import Avatar from '../../components/Avatar/Avatar';
import Card from '../../components/card/card';
import './game.scss';
import player1 from '../../Assets/images/avatar01.png';
import player2 from '../../Assets/images/avatar02.png';
import PlayerBox from '../../components/PlayerBox/playerbox';
import Button from '../../components/buttons/Button';

var undo = [];

export class Game extends React.Component{
    constructor(props){
        super(props);
        var total = Math.ceil(this.props.match.params.totalGames/2);
        var player = this.props.match.params.startPlayer;
        this.state = {
            playerCounter: player,
            boardState: Array(8).fill().map(() => Array(8).fill(0)),
            win: false,
            player1WinCounter: 0,
            player2WinCounter: 0,
            totalWins: total,
            currentGame: 1,
            totalGames: this.props.match.params.totalGames
        };
    }

    componentDidMount(){

    }

    handleClickEvent = (event, rowIndex, colIndex) => {
        if(this.state.win){
            return;
        }
        undo.push({"x":rowIndex, "y": colIndex});
        event.stopPropagation();        
        if(this.state.playerCounter===0){
            let newBoardState = this.state.boardState;
            newBoardState[rowIndex][colIndex] = 1;
            let newState = { 
                playerCounter: 1,
                boardState: newBoardState,
                win: this.state.win
            }  
            this.setState(newState);
        }
        else{
            let newBoardState = this.state.boardState;
            newBoardState[rowIndex][colIndex] = 2;
            let newState = { 
                playerCounter: 0,
                boardState: newBoardState,
                win: this.state.win
            } 
            this.setState(newState);
        }
        this.checkForWinningState(rowIndex, colIndex);
    }   
    checkForWinningState = (rowIndex, colIndex)=>{       
        if(this.checkVertically(rowIndex, colIndex) || this.checkHorizontally(rowIndex, colIndex) || this.checkDiagonally(rowIndex, colIndex)){
            if(this.state.playerCounter==0){
                this.setState({...this.state, win: true, player1WinCounter: this.state.player1WinCounter+1});            
            }
            else{
                this.setState({...this.state, win: true, player2WinCounter: this.state.player2WinCounter+1});
            }
        }

    }

    undoStep = ()=>{
        var element = undo.pop();
        var newBoardState = this.state.boardState;
        newBoardState[element["x"]][element["y"]] = 0;
        if(this.state.playerCounter==0){
            this.setState({...this.state, boardState: newBoardState, playerCounter: 1});
        }
        else{
            this.setState({...this.state, boardState: newBoardState, playerCounter: 0});
        }
    }

    checkVertically = (rowIndex, colIndex)=>{
        var boardState = this.state.boardState;
        var currVal = boardState[rowIndex][colIndex];
        var x = rowIndex;
        var count = 0;

        while(count<4 && x<8){
            if(boardState[x][colIndex]!==currVal){
                break;
            }
            x++;
            count++;
        }
        x = rowIndex-1;
        while(count<4 && x>=0){
            if(boardState[x][colIndex]!==currVal){
                break;
            }
            x--;
            count++;
        }

        if(count==4){
            return true;
        }
        return false;
    }

    checkHorizontally = (rowIndex, colIndex)=>{
        var boardState = this.state.boardState;
        var currVal = boardState[rowIndex][colIndex];
        var x = colIndex;
        var count = 0;

        while(count<4 && x<8){
            if(boardState[rowIndex][x]!==currVal){
                break;
            }
            x++;
            count++;
        }
        x = rowIndex-1;
        while(count<4 && x>=0){
            if(boardState[rowIndex][x]!==currVal){
                break;
            }
            x--;
            count++;
        }

        if(count===4){
            return true;
        }
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
            x--;
            y--;
            count++;
        }

        if(count===4){
            return true;
        }
        x = rowIndex;
        y = colIndex;
        count = 0;

        while(count<4 && x<8 && y>=0){
            if(boardState[x][y]!==currVal){
                break;
            }
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
            x--;
            y++;
            count++;
        }

        if(count===4){
            return true;
        }
        return false;
    }

    startNewGame = ()=>{
        if((this.state.currentGame==this.state.totalGames)|| (this.state.player2WinCounter===this.state.totalWins && this.state.player1WinCounter===this.state.totalWins)){
            this.props.history.push("/");
        }
        else{
            this.setState({...this.state, 
                win: 0, 
                currentGame: this.state.currentGame+1,
                playerCounter: this.props.match.params.startPlayer,
                boardState: Array(8).fill().map(() => Array(8).fill(0))
            })
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
                                <div key={rowIndex} className="game-row">
                                    {
                                        rowElement.map((colElement, colIndex)=>{
                                            return (
                                                <React.Fragment key={colIndex}>{
                                                this.state.boardState[rowIndex][colIndex]===1 ?
                                                    <Avatar borderColor={"#37AC5D"} src={player1}></Avatar> 
                                                    :
                                                    this.state.boardState[rowIndex][colIndex]===2 ?
                                                    <Avatar borderColor={"#F8D146"} src={player2}></Avatar>                                                     
                                                    :
                                                    <div key={colIndex} className={this.state.boardState[rowIndex][colIndex]===1?"circle-border blue" : this.state.boardState[rowIndex][colIndex]===2 ? "circle-border yellow" : "circle-border"} onClick={(event)=>this.handleClickEvent(event, rowIndex, colIndex)}>
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
                            (this.state.win && this.state.player2WinCounter!==this.state.totalWins && this.state.player1WinCounter!==this.state.totalWins)? <>
                            <div style={{backgroundColor: "#FF6600"}}>Congratulations! </div>
                            <div> 
                                {this.state.playerCounter===0? "David": "Mario"}, you Won Game {this.state.currentGame}
                            </div> </>: null
                        }
                        {
                        (this.state.win && this.state.player1WinCounter==this.state.totalWins) && (<>
                            <div style={{bbackgroundColor: "#FF6600"}}>Congratulations! </div>
                            <div> 
                                {this.state.playerCounter===0? "David": "Mario"}, you Won Tournament
                            </div> </>)
                        }
                        {
                        (this.state.win && this.state.player2WinCounter!==this.state.totalWins && this.state.player1WinCounter!==this.state.totalWins && this.state.player2WinCounter==this.state.totalWins) && (<>
                            <div style={{bbackgroundColor: "#FF6600"}}>Congratulations! </div>
                            <div> 
                                {this.state.playerCounter===0? "David": "Mario"}, you Won Game {this.state.count}
                            </div> </>)
                        }
                        {
                        (this.state.win && this.state.currentGame==this.state.totalGames) && (<>
                            <div style={{bbackgroundColor: "#FF6600"}}>Draw</div>
                        </>)
                        }
                        <div>
                        <PlayerBox score={this.state.player1WinCounter} backgroundColor="#DCF6E4" src={player1} borderColor="#37AC5D" name="David" description="player 01" backgroundColor={"#DCF6E4"}/>
                        <PlayerBox score={this.state.player2WinCounter} backgroundColor="#F6EFD5" src={player2} borderColor="#F8D146" name="Mario" description="player 02" backgroundColor={"#F6EFD5"}/>            
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
                                <Button customClass={"end-tournament"} backgroundColor="#FFFFFF">End Tournament</Button>
                            </div>
                        </div>
                    </div>
                </Card>
            </div>
        )
    }
}

