/*jslint devel: true */
/* eslint-disable no-console */
/*global ActionableDreamer, actionableDreamerCatalog*/

/*global
console
*/


// test create body with no base
var dreamerBody = new ActionableDreamer();
dreamerBody.names = ["Joe Bloggs", "John Doe", "Jean Doe"];
dreamerBody.descriptions = ["Pirate", "Player 1", "Boss"];
dreamerBody.addFeature("life", 1, {50: 0.3, 100: 0.9});
dreamerBody.addFeature("energy", 1, {50: 0.5, 100: 0.2, 75: 0.7, 1: 1});  //last value with 100% chance to prevent missing the feature
dreamerBody.addFeature("listening", 0.7, {"rock": 0.3, "pop": 0.5, "calssical": 0.3});
actionableDreamerCatalog.addDreamer("prototype_basic", dreamerBody, 10);
var body = actionableDreamerCatalog.dream("prototype_basic");
console.log(body);


// create body with objects
var dreamerObject = new ActionableDreamer();
dreamerObject.names = ["Stone", "Pebbles", "Rock", "Ore"];
dreamerObject.size = 1;
dreamerObject.descriptions = ["lorem ipsum..."];
dreamerObject.portraitIDs = ["stone.jpg"];
dreamerObject.addFeature("value", 0.7, {100: 0.3, 10: 0.5, 1000: 0.3});
actionableDreamerCatalog.addDreamer("prototype_rock", dreamerObject, 10);

console.log(actionableDreamerCatalog.dream("prototype_rock"));

// create to bodies with 1 object of the same type and another of a different type
dreamerBody = new ActionableDreamer();
// create body with base
dreamerBody.base = body;
dreamerBody.addInventory("Belongings", 100, 10, 100, 10);
dreamerBody.addInventory("Knowledge", 1, 0, 100, 20);
dreamerBody.addItemToInventory("Belongings", "rock1", 0.7, "prototype_rock");
dreamerBody.addItemToInventory("Belongings", "rock2", 0.7, "prototype_rock");
dreamerBody.addItemToInventory("Belongings", "rock3", 0.7, "prototype_rock");
actionableDreamerCatalog.addDreamer("prototype_miner", dreamerBody, 10);

console.log("Body with inventory and base");
console.log(actionableDreamerCatalog.dream("prototype_miner"));


console.log("TODO - Test Body with inventory in base");
console.log("TODO - Imports Exports to actionableDreamer");

console.log("Actionable dreamer catalog:");
console.log(actionableDreamerCatalog);