/* 
 * We are implementing the following functionality:
 *      move c-a 
 *      remove c-a 
 *      create c-a
 *      update (Act) (delete,=,*,+,-,/,concat)
 *      move scenario (OnGoing)
 *      
 * 
 * This needs the following files:
 * 
 * /js/machineDream/actions/filter/filter.js
 * /js/machineDream/actionable.js
 * /js/machineDream/container.js
 * 
 */


/* global Actionable, Container */

ModifierActionable.prototype = new Modifier();
ModifierActionable.prototype.constructor = ModifierActionable;

function ModifierActionable() {
    this.targetRoleName = "target";
    this.target = null;
}

ModifierActionableMove.prototype = new ModifierActionable();
ModifierActionableMove.prototype.constructor = ModifierActionableMove;

function ModifierActionableMove() {
    this.sourceRoleName = "source";
    this.source = null;
    this.destinationRoleName = "destination";
    this.destination = null;
}

ModifierActionableMove.prototype.asign = function (roleName, target) {
    if (this.targetRoleName === roleName && target instanceof Actionable ){
        this.target = target;
    }
    if (this.sourceRoleName === roleName && target instanceof Container ){
        this.source = target;
    }
    if (this.destinationRoleName === roleName && target instanceof Container ){
        this.destination = target;
    }
    return this;
};

ModifierActionableMove.prototype.run = function () {
    if (this.target !== null &&
            this.source !== null &&
            this.destination !== null &&
            this.target instanceof Actionable &&
            this.source instanceof Container &&
            this.destination instanceof Container){
        this.destination.push(this.target);
        this.source.remove(this.target);
    }
};


// remove c-a 

ModifierActionableRemove.prototype = new ModifierActionable();
ModifierActionableRemove.prototype.constructor = ModifierActionableRemove;

function ModifierActionableRemove() {
    this.containerRoleName = "container";
    this.container = null;
}

ModifierActionableRemove.prototype.asign = function (roleName, target) {
    if (this.targetRoleName === roleName && target instanceof Actionable ){
        this.target = target;
    }
    if (this.containerRoleName === roleName && target instanceof Container ){
        this.container = target;
    }
    return this;
};

ModifierActionableRemove.prototype.run = function () {
    if (this.target !== null &&
            this.container !== null &&
            this.target instanceof Actionable &&
            this.container instanceof Container){
        this.container.remove(this.target);
    }
};


// create c-a
/**
 * Creating a new Actionable in the Container as a copy of the target
 * The deviationToTarget shows how different the object will be of the parent
 * 
 */
ModifierActionableCreate.prototype = new ModifierActionable();
ModifierActionableCreate.prototype.constructor = ModifierActionableCreate;

function ModifierActionableCreate() {
    this.containerRoleName = "source";
    this.container = null;
    this.deviationToTarget = 0;
}

ModifierActionableCreate.prototype.asign = function (roleName, target) {
    if (this.targetRoleName === roleName && target instanceof Actionable ){
        this.target = target;
    }
    if (this.containerRoleName === roleName && target instanceof Container ){
        this.container = target;
    }
    return this;
};

ModifierActionableCreate.prototype.run = function () {
    if (this.target !== null &&
            this.container !== null &&
            this.target instanceof Actionable &&
            this.container instanceof Container){
        var newAct = this.target.clone(this.deviationToTarget);
        // This is on development; interesting to create to functions:
        //  mutate and cross
        this.source.remove(newAct);
    }
};


// move scenario
// Under Development
ModifierActionableScenario.prototype = new ModifierActionable();
ModifierActionableScenario.prototype.constructor = ModifierActionableScenario;

function ModifierActionableScenario() {
    throw new Error("Under development!");
}

ModifierActionableScenario.prototype.asign = function (roleName, target) {
    throw new Error("Under development!");
};

ModifierActionableScenario.prototype.run = function () {
    throw new Error("Under development!");
};
