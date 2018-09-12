import React, { PropTypes } from 'react';
import GameState from '../core/state';

class World extends React.Component {
  click(i, j) {
    this.props.select(i, j);
  }
  render() {
    return (
      <table><tbody>{this.props.game.board.map((row, i) => (
        <tr key={i}>{row.map((col, j) => (
          <td key={i + '-' + j}
            onClick={this.click.bind(this, i, j)}>{col.representation}</td>
        ))}</tr>
      ))}</tbody></table>
    );
  }
}

World.propTypes = {
  game: PropTypes.instanceOf(GameState).isRequired,
  select: PropTypes.func.isRequired
};

export default World;
