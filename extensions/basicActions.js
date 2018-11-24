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
action.put("p_health", new Selector("feature", "life"));

//action.map(outreference, inreference);
action.map("target", "t_health");
action.map("target", "t_mhealth");
action.map("potion", "p_health");

actionCatalog.addAction("heal", action);

/*
Action - restore
Description: Recover energy
use:
     actionCatalog.heal.bind("target", embodiment);
     actionCatalog.heal.bind("potion", potion);
     actionCatalog.heal.execute();
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
action.put("p_energy", new Selector("feature", "energy"));

//action.map(outreference, inreference);
action.map("target", "t_energy");
action.map("target", "t_mEnergy");
action.map("potion", "p_energy");

actionCatalog.addAction("restore", action);



// drop from own inventory to room/or remove

// pick from room to own inventory

// give from own inventory to inventory in someone else in the room
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



