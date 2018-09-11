import 'normalize.css/normalize.css';
import 'styles/App.css';

import React from 'react';

class GameState {
  constructor(nrows, ncols) {
    this.board = [];
    for (let i = 0; i < nrows; i++) {
      let row = [];
      for (let j = 0; j < ncols; j++) {
        row.push(null);
      }
      this.board.push(row);
    }
  }
}

class AppComponent extends React.Component {
  constructor() {
    super();
    this.state = {
      game: new GameState(15, 15)
    };
  }
  click(i, j) {
    this.state.game.board[i][j] = true;
    this.forceUpdate();
  }
  render() {
    return (
      <table id="world">{this.state.game.board.map((row, i) => (
        <tr className="row" key={i}>{row.map((col, j) => (
          <td className="col" id={i + '-' + j} key={i + '-' + j}
            onClick={this.click.bind(this, i, j)}>{col ? 'o' : 'x'}</td>
        ))}</tr>
      ))}</table>
    );
  }
}

AppComponent.defaultProps = {
};

export default AppComponent;
