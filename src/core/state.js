/* RA3 Game State */

import { Grid } from './units';

import { PeaceKeeper } from './soldiers';
import { Buggy } from './vehicles';
import { LightTank } from './panzers';

const DAMAGE_RATIO = {
  'SMALL_ARMS' : { 'CONCRETE': 1, 'INFANTRY': 1, 'VEHICLE': 1, 'ARMOR': 1 },
  'MACHINE_GUN': { 'CONCRETE': 1, 'INFANTRY': 1, 'VEHICLE': 1, 'ARMOR': 1 },
  'ARTILLERY'  : { 'CONCRETE': 1, 'INFANTRY': 1, 'VEHICLE': 1, 'ARMOR': 1 },
  'ANTI_TANK'  : { 'CONCRETE': 1, 'INFANTRY': 1, 'VEHICLE': 1, 'ARMOR': 1 },
  'FLAME'      : { 'CONCRETE': 1, 'INFANTRY': 1, 'VEHICLE': 1, 'ARMOR': 1 }
};

class GameState {
  constructor() {
    this.board = [];
    for (let i = 0; i < 11; i++) {
      let row = [];
      for (let j = 0; j < 11; j++) {
        row.push(new Grid());
      }
      this.board.push(row);
    }
    this.currentPlayer = 0;
    this.numPlayers = 2;

    /* TODO: experiments only */
    this.board[0][0] = new PeaceKeeper(0);
    this.board[0][1] = new LightTank(0);
    this.board[0][2] = new Buggy(0);
    this.board[10][10] = new PeaceKeeper(1);
    this.board[10][9] = new LightTank(1);
    this.board[10][8] = new Buggy(1);
  }

  getUnit({i, j}) {
    return this.board[i][j];
  }

  cleanUp({i, j}) {
    this.board[i][j] = new Grid();
  }

  move(from, to) {
    let dist = Math.abs(from.i - to.i) + Math.abs(from.j - to.j);
    let mover = this.getUnit(from);
    if (mover.team == this.currentPlayer && mover.canMove && dist <= mover.stepsThisTurn && this.getUnit(to).isGrid) {
      mover.stepsThisTurn -= dist;
      this.board[to.i][to.j] = mover;
      this.board[from.i][from.j] = new Grid();
    }
  }

  fire(from, to) {
    let attacker = this.getUnit(from);
    let defender = this.getUnit(to);
    let dist = Math.abs(from.i - to.i) + Math.abs(from.j - to.j);
    if (attacker.team == this.currentPlayer && attacker.canFire && attacker.team != defender.team && dist <= attacker.fireRange) {
      let ratio = DAMAGE_RATIO[attacker.attackType][defender.defenseType];
      defender.health -= attacker.attack * ratio / defender.defense;
      attacker.fired = true;
      if (defender.health <= 0) this.cleanUp(to);
    }
  }

  endTurn() {
    for (let row of this.board)
      for (let col of row)
        col.endTurn(this.currentPlayer);
    this.currentPlayer = (this.currentPlayer + 1) % this.numPlayers;
  }
}

export default GameState;
