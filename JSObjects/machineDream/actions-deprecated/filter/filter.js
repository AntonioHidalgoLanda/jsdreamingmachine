/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function Filter () {
    if (this.constructor === Filter) {
      throw new Error("Can't instantiate abstract class!");
    }
}


Filter.prototype.asign = function(roleName,target) {
    throw new Error("Abstract method!");
};


Filter.prototype.isElegible = function() {
    throw new Error("Abstract method!");
};


// and or not 
// EmContainsInv
// ConContainsColl
// Act has feature
// Act.featur (>,<,=) to 

FilterAnd.prototype = new Filter();
FilterAnd.prototype.constructor = FilterAnd;

function FilterAnd () {
    this.filters = [];
}

FilterAnd.prototype.push = function(target) {
    this.filters.push(target);
};

// Shouldn't be used 
FilterAnd.prototype.asign = function(roleName,target) {
    for (var idx in this.filters){
        this.filters[idx].asign(roleName,target);
    }
};

FilterAnd.prototype.isElegible = function() {
    var bresult = true;
    for (var idx in this.filters){
        bresult &= this.filters[idx].isElegible();
        if (!bresult){
            break
        }
    }
    return bresult;
};

FilterOr.prototype = new Filter();
FilterOr.prototype.constructor = FilterOr;

function FilterOr () {
    this.filters = [];
}

FilterOr.prototype.push = function(target) {
    this.filters.push(target);
};

// Shouldn't be used 
FilterOr.prototype.asign = function(roleName,target) {
    for (var idx in this.filters){
        this.filters[idx].asign(roleName,target);
    }
};

FilterOr.prototype.isElegible = function() {
    var bresult = false;
    for (var idx in this.filters){
        bresult |= this.filters[idx].isElegible();
        if (bresult){
            break
        }
    }
    return bresult;
};

// Important test here
// Test wether the action checks the actual filter or both

FilterNot.prototype = new Filter();
FilterNot.prototype.constructor = FilterNot;

function FilterNot (filter) {
    this.filter = filter;
}

FilterNot.prototype.asign = function(roleName,target) {
    this.filter.asign(roleName,target);
};

FilterNot.prototype.isElegible = function() {
    return !this.filter.isElegible();
};
