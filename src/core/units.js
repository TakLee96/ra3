/* Basic Units */

class Unit {
  constructor(team=-1, health=0) {
    this._team = team;
    this.health = health;
    this.endTurn();
  }
  endTurn(team=-1) { /* pass */ }

  get team() { return this._team; }
  get isGrid() { return false; }
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
  get defense() { throw new Error(); }
  get defenseType() { throw new Error(); }
}

export class Grid extends Unit {
  get isGrid() { return true; }
  get representation() { return ''; }
}

export class Building extends Unit {
  get canSpawn() { return true; }
  get defenseType() { return 'CONCRETE'; }
}

class MobileAssaultUnit extends Unit {
  endTurn(team=-1) {
    super.endTurn(team);
    if (team == -1 || this.team == team) {
      this.stepsThisTurn = this.stepsPerTurn;
      this.fired = false;
    }
  }
  get canMove() { return true; }
  get canFire() { return true; }
}

export class Soldier extends MobileAssaultUnit {
  get defenseType() { return 'INFANTRY'; }
}

export class Vehicle extends MobileAssaultUnit {
  get defenseType() { return 'VEHICLE' }
}

export class Panzer extends MobileAssaultUnit {
  get defenseType() { return 'ARMOR'; }
}
