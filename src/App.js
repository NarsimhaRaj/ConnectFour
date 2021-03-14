import TwoPlayerGame from './Pages/TwoPlayerGame/twoPlayerGame';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom'
import Home from './Pages/home/home';
import "react-bootstrap/dist/react-bootstrap.min.js";
import './App.scss';
import 'react-bootstrap';
import { Game } from './Pages/Game/game';

function App() {
  return (
    <div class="body-class">
      <Router >
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/twoPlayerGame" component={TwoPlayerGame} />
          <Route exact path="/game" component={Game} />          
          <Route path="*" component={Home} />
        </Switch>
    </Router>
    </div>
  );
}

export default App;
