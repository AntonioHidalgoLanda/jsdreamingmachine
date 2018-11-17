/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
/* global Actionable */

// Act has feature
// Act.featur (>,<,=) to 



FilterActionable.prototype = new Filter();
FilterActionable.prototype.constructor = FilterActionable;

function FilterActionable (roleName,featureName) {
    this.targetRoleName = roleName;
    this.featureName = featureName;
    this.target = null;
    
    this.operator = '=';
    this.comparator = null; // literal, Actionable.feature, Arithmetic ()
}

// Shouldn't be used 
FilterActionable.prototype.asign = function(roleName,target) {
    if (this.targetRoleName === roleName && target instanceof Actionable ){
        this.target = target;
    }
    return this;
};


// TODO, Add filters to check the #items, weight and space in the inventory

FilterActionable.prototype.isElegible = function() {
    return this.target.getInventory() !== null;    
};

