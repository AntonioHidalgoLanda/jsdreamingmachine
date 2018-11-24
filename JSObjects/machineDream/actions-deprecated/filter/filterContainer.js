/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/* global Container, Actionable */

// ConContainsColl

FilterContainer.prototype = new Filter();
FilterContainer.prototype.constructor = FilterContainer;

function FilterContainer (containerRoleName,actionableRoleName) {
    this.containerRoleName = containerRoleName;
    this.actionableRoleName = actionableRoleName;
    this.container = null;
    this.actionable = null;
}

// Shouldn't be used 
FilterContainer.prototype.asign = function(roleName,target) {
    if (this.containerRoleName === roleName && container instanceof Container ){
        this.container = target;
    }
    if (this.actionableRoleName === roleName && target instanceof Actionable ){
        this.actionable = target;
    }
    return this;
};


// TODO, Add filters to check if contains similar actionables using composite

FilterContainer.prototype.isElegible = function() {
    return this.container.contains(this.actionable) !== null;    
};

