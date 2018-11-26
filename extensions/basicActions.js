/*jslint devel: true */
/* eslint-disable no-console */
/*global Executor, Selector, actionCatalog, Statement, Substatement
*/

/*
* Function exchange based on features (heal, combat, skill-up, interact)
* @param: target (feature), increase (feature), cap (feature)
*/
var executeFeatureIncreaseCapped = function (action) {
    "use strict";
    // action.get(inreference);
    var newVal = Number(action.get("target")) + Number(action.get("increase"));
    if (newVal > Number(action.get("cap"))) {
        newVal = action.get("cap");
    }
    action.set("target", newVal);
};

/*
* Function for moving items (pick, drop) Moving Items:
* @param: source (Container/Inventory), item (Collectable), destination (Container/Inventory)
*/
var executeMove = function (action) {
    "use strict";
    var source = action.get("source"),
        item = action.get("item"),
        destination = action.get("destination");
    
    if (source.contains(item)) {
        destination.push(item);
        if (destination.contains(item)) {
            source.remove(item);
        }
    }
};

/*
*  Function to update and consume
* @param: source (c/i), item (cl/eb), destination (c/i), target (f), increase (f), cap (f)
*/
var executeConsumeAndUpdate = function (action) {
    "use strict";
    var source = action.get("source"),
        item = action.get("item");
    
    if (source.contains(item)) {
        executeFeatureIncreaseCapped(action);
        source.remove(item);
    }
};


/*
Action - heal
use:
     actionCatalog.heal.bind("target", embodiment);
     actionCatalog.heal.bind("caller", potion);
     actionCatalog.heal.execute();
*/
var action = new Executor(executeFeatureIncreaseCapped);
action.setCaller("caller");
//action.put(inreference, selector);
action.put("target", new Selector("feature", "life"));
action.put("cap", new Selector("feature", "max_life"));
action.put("increase", new Selector("feature", "heal"));

//action.map(outreference, inreference);
action.map("target", "target");
action.map("target", "cap");
action.map("caller", "increase");

actionCatalog.addAction("heal", action);

/*
Action - restore
Description: Recover energy
use:
     actionCatalog.restore.bind("target", embodiment);
     actionCatalog.restore.bind("caller", potion);
     actionCatalog.restore.execute();
*/
action = new Executor(executeFeatureIncreaseCapped);
action.setCaller("caller");
//action.put(inreference, selector);
action.put("target", new Selector("feature", "energy"));
action.put("cap", new Selector("feature", "max_energy"));
action.put("increase", new Selector("feature", "restoring"));

//action.map(outreference, inreference);
action.map("target", "target");
action.map("target", "cap");
action.map("caller", "increase");

actionCatalog.addAction("restore", action);


/*
Action - drop
Description: Drop an item from own inventory into another container (Room or somebody else)
TODO: handle Pre-requisites: destination.contains(item) && source.fitsin(item)
use:
     actionCatalog.drop.bind("owner", embodiment);
     actionCatalog.drop.bind("item", item);
     actionCatalog.drop.bind("destination", container); // Inventory//Room
     actionCatalog.drop.execute();
*/
action = new Executor(executeMove);
action.setCaller("owner");
//action.put(inreference, selector);
action.put("source", new Selector("inventory", "Belongings"));
action.put("item", new Selector());
action.put("destination", new Selector());

//action.map(outreference, inreference);
action.map("owner", "source");
action.map("item", "item");
action.map("destination", "destination");
action.addPrecondition(new Statement(new Substatement(action, "item"), new Substatement(action, "source"), Statement.STATEMENTS.is_in));

actionCatalog.addAction("drop", action);

/*
Action - pick
Description: Drop an item from own inventory into another container (Room or somebody else)
TODO: handle Pre-requisites: source.contains(item) && destination.fitsin(item)
use:
     actionCatalog.pick.bind("owner", embodiment);
     actionCatalog.pick.bind("item", item);
     actionCatalog.pick.bind("source", container); // Inventory//Room
     actionCatalog.pick.execute();
*/
action = new Executor(executeMove);
action.setCaller("owner");
//action.put(inreference, selector);
action.put("destination", new Selector("inventory", "Belongings"));
action.put("item", new Selector());
action.put("source", new Selector());

//action.map(outreference, inreference);
action.map("owner", "destination");
action.map("item", "item");
action.map("source", "source");
action.addPrecondition(new Statement(new Substatement(action, "item"), new Substatement(action, "destination"), Statement.STATEMENTS.not_in));
action.addPrecondition(new Statement(new Substatement(action, "source"), new Substatement(""), Statement.STATEMENTS.not_empty));

actionCatalog.addAction("pick", action);


/*
Action - destroy
Description: destroy an item from own inventory
use:
     actionCatalog.destroy.bind("owner", embodiment);
     actionCatalog.destroy.bind("item", item);
     actionCatalog.destroy.execute();
*/
action = new Executor(function (action) {
    "use strict";
    var source = action.get("source"),
        item = action.get("item");
    
    if (source.contains(item)) {
        source.remove(item);
    }
});
//action.put(inreference, selector);
action.put("source", new Selector("inventory", "Belongings"));
action.put("item", new Selector());

//action.map(outreference, inreference);
action.map("owner", "source");
action.map("item", "item");

actionCatalog.addAction("destroy", action);

//
// Actions Updating Features with Consumables
//
/*
Action - consume_heal
use:
     actionCatalog.consume_heal.bind("owner", embodiment);
     actionCatalog.consume_heal.bind("item", potion);
     actionCatalog.consume_heal.execute();
*/
action = new Executor(executeConsumeAndUpdate);
action.setCaller("owner");
//action.put(inreference, selector);
action.put("target", new Selector("feature", "life"));
action.put("cap", new Selector("feature", "max_life"));
action.put("increase", new Selector("feature", "heal"));
action.put("source", new Selector("inventory", "Belongings"));
action.put("item", new Selector());

//action.map(outreference, inreference);
action.map("owner", "target");
action.map("owner", "cap");
action.map("item", "increase");
action.map("owner", "source");
action.map("item", "item");

actionCatalog.addAction("consume_heal", action);

/*
Action - restore
Description: Recover energy
use:
     actionCatalog.consume_restore.bind("owner", embodiment);
     actionCatalog.consume_restore.bind("item", potion);
     actionCatalog.consume_restore.execute();
*/
action = new Executor(executeConsumeAndUpdate);
action.setCaller("owner");
//action.put(inreference, selector);
action.put("target", new Selector("feature", "energy"));
action.put("cap", new Selector("feature", "max_energy"));
action.put("increase", new Selector("feature", "restoring"));
action.put("source", new Selector("inventory", "Belongings"));
action.put("item", new Selector());

//action.map(outreference, inreference);
action.map("owner", "target");
action.map("owner", "cap");
action.map("item", "increase");
action.map("owner", "source");
action.map("item", "item");

actionCatalog.addAction("consume_restore", action);


// move to room
// lock door
// open door

// how to exchange collectables from 2 different bodies?
/*
consensus exchange in two actions
        Action 0; Seller advertise price/ buyer agree a price with seller
        Action 1; buyer pays a price (or request exchange freely) to seller
            buyer anotates knowlege of credited
            seller anotates knowledge of owned (Selling good)
        Action 2; Seller gives object to buyer
            buyer removes anotation of credited
            seller remove anotation of owned
*/



