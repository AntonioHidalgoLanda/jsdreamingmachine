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
actionableDreamerCatalog.prototype_basic = dreamerBody;
var body = dreamerBody.dream();
console.log(body);

// create body with base
// TODO
console.log("on development - Test dream bodies with predefined base");

// create body with objects
var dreamerObject = new ActionableDreamer();
dreamerObject.names = ["Rock"];
dreamerObject.size = 1;
dreamerObject.descriptions = ["Stone", "Pebbles", "Rock", "Ore"];
dreamerObject.portraitIDs = ["stone.jpg"];
dreamerObject.addFeature("value", 0.7, {100: 0.3, 10: 0.5, 1000: 0.3});
actionableDreamerCatalog.prototype_rock = dreamerObject;

console.log(dreamerObject.dream());

// create to bodies with 1 object of the same type and another of a different type
dreamerBody = new ActionableDreamer();
dreamerBody.base = body;
dreamerBody.addInventory("bag", 100, 0, 100, 0);
dreamerBody.addItemToInventory("bag", "rock1", 0.7, "prototype_rock");
dreamerBody.addItemToInventory("bag", "rock2", 0.7, "prototype_rock");
dreamerBody.addItemToInventory("bag", "rock3", 0.7, "prototype_rock");
actionableDreamerCatalog.prototype_miner = dreamerBody;
console.log(dreamerBody.dream());


console.log("TODO - Imports Exports to actionableDreamer");