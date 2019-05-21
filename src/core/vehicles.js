/* Vehicles */
/* eslint-disable no-magic-numbers */

import { Vehicle } from './units';

export class Buggy extends Vehicle {
  constructor(team) {
    super(team, 30);
  }

  get representation() { return 'Buggy'; }

  get stepsPerTurn() { return 2; }
  get fireRange() { return 1; }
  get attack() { return 10; }
  get attackType() { return 'MACHINE_GUN'; }
  get turnsToSpawn() { return 2; }
  get cost() { return 1000; }
  get defense() { return 2; }
}
