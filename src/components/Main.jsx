import 'normalize.css/normalize.css';
import 'styles/App.css';

import React from 'react';
import World from './World';
import GameState from '../core/state';

class AppComponent extends React.Component {
  constructor() {
    super();
    this.state = {
      game: new GameState()
    };
  }
  select(i, j) {
    this.state.game.board[i][j] = true;
    this.forceUpdate();
  }
  render() {
    return (<World game={this.state.game} select={this.select}/>)
  }
}

export default AppComponent;
