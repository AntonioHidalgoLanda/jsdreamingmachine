/*exported actionCatalog */
/*global SelectorBinder, Executor*/

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


actionCatalog.bindingsIn = function (actionRef, roleRef, candidates) {
    "use strict";
    var bindings = [], action;
    if (actionRef !== undefined && this.hasOwnProperty(actionRef)) {
        action = this[actionRef];
        bindings = action.bindingsIn(roleRef, candidates);
    }
    return bindings;
};

/*
 *
 * @param caller Actionable with the role caller in the action
 * @param target Actionable with any role in the action, if undefined, we return all the actions where caller is the caller.
 */
actionCatalog.getCallerActions = function (caller, target) {
    "use strict";
    var action, actionRef, actions = [], callerRole, bInsert, roles, role, idx;
    for (actionRef in actionCatalog) {
        if (actionCatalog.hasOwnProperty(actionRef)) {
            action = actionCatalog[actionRef];
            if (action instanceof Executor) {
                callerRole = action.callerRef;
                bInsert = false;
                if (target !== undefined) {
                    roles = action.getRoles();
                    for (idx in roles) {
                        if (roles.hasOwnProperty(idx)) {
                            role = roles[idx];
                            bInsert = bInsert || action.canBind(role, target);
                            if (bInsert) {
                                break;
                            }
                        }
                    }
                } else {
                    bInsert = true;
                }
                if (bInsert && action.canBind(callerRole, caller)) {
                    actions.push(actionRef);
                }
            }
        }
    }
    return actions;
};

Executor.prototype = new SelectorBinder();
Executor.prototype.constructor = Executor;

function Executor(executeFunction) {
    "use strict";
    SelectorBinder.call(this);
    this.callerRef = undefined;
    this.fExecute = executeFunction;
}

Executor.prototype.setCaller = function (caller) {
    "use strict";
    this.callerRef = caller;
    return this;
};

Executor.prototype.execute = function () {
    "use strict";
    this.fExecute(this);
    return this;
};

Executor.prototype.canBind = function (outReference, actionable) {
    "use strict";
    var inReference, selector;
    if (this.bindings.hasOwnProperty(outReference)) {
        for (inReference in this.maps) {
            if (this.maps.hasOwnProperty(inReference) && this.maps[inReference] === outReference && this.selectors.hasOwnProperty(inReference)) {
                selector = this.selectors[inReference];
                if (selector === undefined || selector.get(actionable) === undefined) {
                    return false;
                }
            }
        }
        return true;
    }
    return false;
};

Executor.prototype.bindingsIn = function (outReference, actionables) {
    "use strict";
    var idx, actionable, bindings = [];
    for (idx in actionables) {
        if (actionables.hasOwnProperty(idx)) {
            actionable = actionables[idx];
            if (this.canBind(outReference, actionable)) {
                bindings.push(actionable);
            }
        }
    }
    return bindings;
};
Executor.prototype.getRoles = function () {
    "use strict";
    return Object.keys(this.bindings);
};
