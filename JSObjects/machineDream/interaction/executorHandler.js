/*global actionCatalog*/

/*
 * README - IMPORTANT for UI Developments
 * Class to be able to handle actions, either by UI or AI
 * UI. There is a method to get all the actions for an object related to you. these can be shown when inspecting the object
 * Once we know the action that we will call, we can go to the next screen to finalize the definition of the action, where 
 * the target (object previously inspected) can be passed as parameter.
 * we would put a selectbox per role in the action. The caller cannot be changed, the targer will be preselected all the time
 * the input where the target is preselected can be modified if at least, the target is selected in another selectbox
 *
 * The selectbox will be populated using the function "ExecutorHandler.getTargetsFor(actionRef, roleRef)"
 * At submit, the function will bind the object references in the select-boxes and will execute the action
 *
 */


function ExecutorHandler(self, room) {
    "use strict";
    this.self = self;
    this.room = room;
    this.inventoryRef = "Belongings";    // TODO - Parametrize this, so we can have more than one Inventory to check
}

/**
 *
 * @return Array<Actionables>
 */
ExecutorHandler.prototype.getAllTargets = function () {
    "use strict";
    var allTargets = [], inventory;
    // allTargets.push(this.self); it is already in the room. otherwise we will introduce duplicates
    allTargets.push.apply(allTargets, this.room.getEverybody());
    if (this.self.hasOwnProperty("inventories")) {
        inventory = this.self.getInventory(this.inventoryRef);
        if (inventory !== null) {
            allTargets.push.apply(allTargets, inventory.getEverybody());
        }
    }
    return allTargets;
};

ExecutorHandler.prototype.getTargetsFor = function (actionRef, roleRef) {
    "use strict";
    return actionCatalog.bindingsIn(actionRef, roleRef, this.getAllTargets());
};

/**
 * @param target; if target === undefined, return all actions where this.self is the caller.
 * @return all actions where this.self is the caller and .
 */
ExecutorHandler.prototype.getActions = function (target) {
    "use strict";
    return actionCatalog.getCallerActions(this.self, target);
};