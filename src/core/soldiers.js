/* Soldiers */

import { Soldier } from './units';

export class PeaceKeeper extends Soldier {
  constructor(team) {
    super(team, 20);
  }

  get representation() { return 'Peace'; }

  get stepsPerTurn() { return 1; }
  get fireRange() { return 1; }
  get attack() { return 10; }
  get attackType() { return 'SMALL_ARMS'; }
  get turnsToSpawn() { return 1; }
  get cost() { return 500; }
  get defense() { return 1; }
}
