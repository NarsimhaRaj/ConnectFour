import TwoPlayerGame from './Pages/TwoPlayerGame/twoPlayerGame';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom'
import Home from './Pages/home/home';
import './App.scss';
import { Game } from './Pages/Game/game';

function App() {
  return (
    <div class="body-class">
      <Router >
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/twoPlayerGame" component={TwoPlayerGame} />
          <Route exact path="/game/:totalGames/:startPlayer" component={Game} />          
          <Route path="*" component={Home} />
        </Switch>
    </Router>
    </div>
  );
}

export default App;
