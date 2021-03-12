import React from 'react';
import Card from '../../components/card/card';
import Button from '../../components/buttons/Button';
import './home.scss';

import one from "../../Assets/images/one.png";
import two from "../../Assets/images/two.png";
import online from "../../Assets/images/online.png";    
import training from "../../Assets/images/training.png";


function Home(){

    return (
        <div className="home-body">
        <div className="connect-four-title">
            <h2>Connect Four</h2>
            <p>
               Play with other players<br/> 
               around the world.
            </p>
        </div>

        <Card width="800px" height="600px">
        <div className="row main-card-content">
            <div className="col-xl-6 col-md-6 col-sm-12 col-xs-12">
                <div className="play-button">
                <img src="" alt="play"/>
                <label>play</label>
                </div>
            </div>
            <div className="col-xl-6 col-md-6 col-sm-12 col-xs-12">
                <div className="playing-img"></div>
            </div>
        </div>
        <div className="button-group">
            <div className="row row-buttons">
                <div className="col-xl-6 col-md-6 col-sm-12 col-xs-12">
                    <Button src={one} backgroundColor="#4BABFF" altText="Cusotm Game" >Custom Game</Button>
                </div>
                <div className="col-xl-6 col-md-6 col-sm-12 col-xs-12">
                    <Button src={two} backgroundColor="#4B7BFF" altText="Two Players" >Two Players</Button>
                </div>
            </div>
            <div>
            <div className="row row-buttons">
                <div className="col-xl-6 col-md-6 col-sm-12 col-xs-12">
                        <Button src={online} backgroundColor="#4B4BFF" altText="Online Game" >Online Game</Button>
                    </div>
                    <div className="col-xl-6 col-md-6 col-sm-12 col-xs-12">
                        <Button src={training} backgroundColor="#6E4BFF" altText="Training Game" >Training Game</Button>
                    </div>
                </div>
            </div>
        </div>

      </Card>
      <div className="card-behind">
            
      </div>
      </div>
    );
}

export default Home;
