import 'normalize.css/normalize.css';
import 'styles/App.css';

import React from 'react';
import GameState from '../core/state';

const COLORS = ['green', 'blue', 'purple'];
COLORS['-1'] = 'black';

class AppComponent extends React.Component {
  constructor() {
    super();
    this.state = {
      game: new GameState(),
      selected: { i: 0, j: 0 },
      inMove: false,
      inFire: false
    };
  }

  select(i, j) {
    if (this.state.inFire && this.state.inMove)
      throw new Error();
    if (this.state.inFire) {
      this.state.game.fire(this.state.selected, { i, j });
      this.setState({ inFire: false });
    } else if (this.state.inMove) {
      this.state.game.move(this.state.selected, { i, j });
      this.setState({ inMove: false });
    } else {
      this.setState({
        selected: { i, j },
        inMove: false,
        inFire: false
      });
    }
  }

  getSelectedUnit() {
    return this.state.game.getUnit(this.state.selected);
  }

  move() {
    this.setState({ inMove: true, inFire: false });
  }

  fire() {
    this.setState({ inMove: false, inFire: true });
  }

  endTurn() {
    this.state.game.endTurn();
    this.setState({ inMove: false, inFire: false });
  }

  isSelected(i, j) {
    return (this.state.selected.i === i && this.state.selected.j === j) ? 'selected' : '';
  }

  isReachable(i, j) {
    let di = Math.abs(this.state.selected.i - i);
    let dj = Math.abs(this.state.selected.j - j);
    let dd = -1;
    if (this.state.inMove) dd = this.getSelectedUnit().stepsThisTurn;
    if (this.state.inFire) dd = this.getSelectedUnit().fireRange;
    if (di + dj <= dd) return 'reachable';

    return '';
  }

  render() {
    return (<div>
      {/* World */}
      <table>
        <tbody>
          {this.state.game.board.map((row, i) => (
            <tr key={i}>{row.map((col, j) => (
              <td
                key={`${i}-${j}`}
                className={`${this.isSelected(i, j)} ${this.isReachable(i, j)}`}
                onClick={this.select.bind(this, i, j)}
                style={{ color: COLORS[this.state.game.getUnit({ i, j }).team] }}
              >
                {col.representation}
              </td>
            ))}</tr>
          ))}
        </tbody>
      </table>

      {/* Control */}
      <div id="control">
        <input className="button" type="button" value="move" onClick={this.move.bind(this)}
          disabled={
            this.state.game.currentPlayer !== this.getSelectedUnit().team ||
            this.state.inFire ||
            !this.getSelectedUnit().canMove ||
            this.getSelectedUnit().stepsThisTurn === 0
          }
        />
        <input className="button" type="button" value="attack" onClick={this.fire.bind(this)}
          disabled={
            this.state.game.currentPlayer !== this.getSelectedUnit().team ||
            this.state.inMove ||
            !this.getSelectedUnit().canFire ||
            this.getSelectedUnit().fired
          }
        />
        <input className="button" type="button" value="end turn" onClick={this.endTurn.bind(this)} />
      </div>

      {/* Information */}
      <div id="info">
        <ul>
          <li>Current Player:&nbsp;
            <span className="team" style={{ backgroundColor: COLORS[this.state.game.currentPlayer] }}>
              &nbsp;{this.state.game.currentPlayer}&nbsp;
            </span>
          </li>
          {!this.getSelectedUnit().isGrid &&
            <li>Team:&nbsp;
              <span className="team" style={{ backgroundColor: COLORS[this.getSelectedUnit().team] }}>
                &nbsp;{this.getSelectedUnit().team}&nbsp;
              </span>
            </li>}
          {!this.getSelectedUnit().isGrid &&
            <li>Health: {this.getSelectedUnit().health}</li>}
          {this.getSelectedUnit().canFire &&
            <li>Fired: {this.getSelectedUnit().fired ? 'true' : 'false'}</li>}
          {this.getSelectedUnit().canMove &&
            <li>StepsThisTurn: {this.getSelectedUnit().stepsThisTurn}</li>}
        </ul>
      </div>
    </div>);
  }
}

export default AppComponent;
