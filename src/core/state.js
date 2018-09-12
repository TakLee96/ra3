/* RA3 Game State */
import { Grid } from './units';

class GameState {
  constructor() {
    this.board = [];
    for (let i = 0; i < 15; i++) {
      let row = [];
      for (let j = 0; j < 15; j++) {
        row.push(new Grid());
      }
      this.board.push(row);
    }
  }
}

export default GameState;
