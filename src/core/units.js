/* Basic Units */

class Unit {
  constructor() {
    this.stepThisTurn = 0;
    this.fired = false;
    this.spawn = null;
    this.progress = 0;
    this.rallyPoint = null;
  }

  endTurn() {
    this.stepThisTurn = 0;
    this.fired = false;
    if (this.spawn != null) {
      this.progress += 1;
    }
  }

  get representation() { return ''; }

  get canMove() { return false; }
  get stepsPerTurn() { throw new Error(); }
  
  get canFire() { return false; }
  get fireRange() { throw new Error(); }
  get attack() { throw new Error(); }
  get attackType() { throw new Error(); }
  
  get canSpawn() { return false; }
  
  get turnsToSpawn() { throw new Error(); }
  get cost() { throw new Error(); }
  get health() { throw new Error(); }
  get defense() { throw new Error(); }
  get defenseType() { throw new Error(); }
}

export class Grid {
  get representation() { return ''; }
}

export class Building extends Unit {
  get canSpawn() { return true; }
  get defenseType() { return 'CONCRETE'; }
}

export class Soldier extends Unit {
  get canMove() { return true; }
  get canFire() { return true; }
  get defenseType() { return 'INFANTRY'; }
}

export class Vehicle extends Unit {
  get canMove() { return true; }
  get canFire() { return true; }
  get defenseType() { return 'VEHICLE' }
}

export class Panzer extends Unit {
  get canMove() { return true; }
  get canFire() { return true; }
  get defenseType() { return 'ARMOR'; }
}

export let DAMAGE_RATIO = {
  'SMALL_ARMS' : { 'CONCRETE': 1, 'INFANTRY': 1, 'VEHICLE': 1, 'ARMOR': 1 },
  'MACHINE_GUN': { 'CONCRETE': 1, 'INFANTRY': 1, 'VEHICLE': 1, 'ARMOR': 1 },
  'ARTILLERY'  : { 'CONCRETE': 1, 'INFANTRY': 1, 'VEHICLE': 1, 'ARMOR': 1 },
  'ANTI_TANK'  : { 'CONCRETE': 1, 'INFANTRY': 1, 'VEHICLE': 1, 'ARMOR': 1 },
  'FLAME'      : { 'CONCRETE': 1, 'INFANTRY': 1, 'VEHICLE': 1, 'ARMOR': 1 }
};
