/*exported actionCatalog*/
/*
global SelectorBinder, Executor
*/

/*
# Simple Actions
# who triggers the actions
# to what the triggerer has access to use (Select):
    room to drop objects
    Bodies (and their features) in same room,
    inventories of the bodies in the same room for dropping collectables
    objects (and their features) in own inventories,
    inventory 

e.g.
    exchange based on features (health, combat, skill-up, interact)
    drop from own inventory to room
    pick from room to own inventory
    lock/open door??
    
    
    exchange based on features and own inventory (create objects)
    drop to room


# how to exchange collectables from 2 different bodies?
    negociation
    
    
    consensus exchange in two actions
        Action 1; buyer pays a price (or request exchange freely) to seller
            buyer anotates knowlege of credited
            seller anotates knowledge of owned (Selling good)
        Action 2; Seller gives object to buyer
            buyer removes anotation of credited
            seller remove anotation of owned
*/
var actionCatalog = {};

actionCatalog.addAction = function (reference, action) {
    "use strict";
    this[reference] = action;
    return this;
};

Executor.prototype = new SelectorBinder();
Executor.prototype.constructor = Executor;

function Executor(executeFunction) {
    "use strict";
    SelectorBinder.call(this);
    this.fExecute = executeFunction;
}

Executor.prototype.execute = function () {
    "use strict";
    this.fExecute(this);
    return this;
};


