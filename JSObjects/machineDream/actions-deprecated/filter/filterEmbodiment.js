/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/* global Embodiment */

// EmContainsInv
FilterEmbodiment.prototype = new Filter();
FilterEmbodiment.prototype.constructor = FilterEmbodiment;

function FilterEmbodiment (roleName,inventoryName) {
    this.targetRoleName = roleName;
    this.inventoryName = inventoryName;
    this.target = null;
}

// Shouldn't be used 
FilterEmbodiment.prototype.asign = function(roleName,target) {
    if (this.targetRoleName === roleName && target instanceof Embodiment ){
        this.target = target;
    }
    return this;
};


// TODO, Add filters to check the #items, weight and space in the inventory

FilterEmbodiment.prototype.isElegible = function() {
    return this.target.getInventory() !== null;    
};
