/* Panzers */
/* eslint-disable no-magic-numbers */

import { Panzer } from './units';

export class LightTank extends Panzer {
  constructor(team) {
    super(team, 40);
  }

  get representation() { return 'LT'; }

  get stepsPerTurn() { return 1; }
  get fireRange() { return 1; }
  get attack() { return 10; }
  get attackType() { return 'ARTILLERY'; }
  get turnsToSpawn() { return 1; }
  get cost() { return 1500; }
  get defense() { return 2; }
}
