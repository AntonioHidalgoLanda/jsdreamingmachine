/*jslint devel: true */
/* eslint-disable no-console */
/*global Executor, Selector, actionCatalog
*/


// examples
// exchange based on features (heal, combat, skill-up, interact)
/*
Action - heal
use:
     actionCatalog.heal.bind("target", embodiment);
     actionCatalog.heal.bind("potion", potion);
     actionCatalog.heal.execute();
*/
var action = new Executor(function (action) {
    "use strict";
    // action.get(inreference);
    var newHealth = Number(action.get("t_health")) + Number(action.get("p_health"));
    if (newHealth > action.get("t_mhealth")) {
        newHealth = action.get("t_mhealth");
    }
    action.set("t_health", newHealth);
});
//action.put(inreference, selector);
action.put("t_health", new Selector("feature", "life"));
action.put("t_mhealth", new Selector("feature", "max_life"));
//action.put("potion", new Selector());
action.put("p_health", new Selector("feature", "heal"));

//action.map(outreference, inreference);
action.map("target", "t_health");
action.map("target", "t_mhealth");
action.map("potion", "p_health");

actionCatalog.addAction("heal", action);

/*
Action - restore
Description: Recover energy
use:
     actionCatalog.restore.bind("target", embodiment);
     actionCatalog.restore.bind("potion", potion);
     actionCatalog.restore.execute();
*/
action = new Executor(function (action) {
    "use strict";
    // action.get(inreference);
    var newEnergy = Number(action.get("t_energy")) + Number(action.get("p_energy"));
    if (newEnergy > action.get("t_mEnergy")) {
        newEnergy = action.get("t_mEnergy");
    }
    action.set("t_energy", newEnergy);
});
//action.put(inreference, selector);
action.put("t_energy", new Selector("feature", "energy"));
action.put("t_mEnergy", new Selector("feature", "max_energy"));
//action.put("potion", new Selector());
action.put("p_energy", new Selector("feature", "restoring"));

//action.map(outreference, inreference);
action.map("target", "t_energy");
action.map("target", "t_mEnergy");
action.map("potion", "p_energy");

actionCatalog.addAction("restore", action);


// Function for moving items (pick, drop) Moving Items:
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
//action.put(inreference, selector);
action.put("source", new Selector("inventory", "Belongings"));
action.put("item", new Selector());
action.put("destination", new Selector());

//action.map(outreference, inreference);
action.map("owner", "source");
action.map("item", "item");
action.map("destination", "destination");

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
//action.put(inreference, selector);
action.put("destination", new Selector("inventory", "Belongings"));
action.put("item", new Selector());
action.put("source", new Selector());

//action.map(outreference, inreference);
action.map("owner", "destination");
action.map("item", "item");
action.map("source", "source");

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



