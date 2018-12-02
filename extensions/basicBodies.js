/*jslint devel: true */
/* eslint-disable no-console */
/*global ActionableDreamer, ScenarioDreamer, actionableDreamerCatalog,
basic_names, basic_descriptions,
enerypack_names, enerypack_descriptions,
lifepack_names, lifepack_descriptions
*/
var dreamerBody;

// health pack
dreamerBody = new ActionableDreamer();
dreamerBody.names = lifepack_names;
dreamerBody.descriptions = lifepack_descriptions;
dreamerBody.weight = 0.2;
dreamerBody.size = 1;
dreamerBody.addFeature("heal", 1, {50: 0.5, 20: 0.3, 30: 1});
actionableDreamerCatalog.addDreamer("prototype_lifepack", dreamerBody, 100);

// energy pack
dreamerBody = new ActionableDreamer();
dreamerBody.names = enerypack_names;
dreamerBody.descriptions = enerypack_descriptions;
dreamerBody.weight = 0.2;
dreamerBody.size = 1;
dreamerBody.addFeature("restoring", 1, {50: 0.5, 20: 0.3, 30: 1});
actionableDreamerCatalog.addDreamer("prototype_energypack", dreamerBody, 100);


// base
dreamerBody = new ActionableDreamer();
dreamerBody.names = basic_names;
dreamerBody.descriptions = basic_descriptions;
dreamerBody.addFeature("max_life", 1, {100: 0.95, 110: 1});
dreamerBody.addFeature("life", 1, {75: 0.95, 100: 1});
dreamerBody.addFeature("energy", 1, {100: 1});
dreamerBody.addFeature("max_energy", 1, {100: 1});
dreamerBody.addFeature("money", 1, {500: 0.5, 550: 0.7, 475: 1});
dreamerBody.addInventory("Belongings", 100, 10, 100, 10);
dreamerBody.addInventory("Knowledge", 1, 0, 100, 20);
dreamerBody.addItemToInventory("Belongings", "healthpack1", 0.7, "prototype_lifepack");
dreamerBody.addItemToInventory("Belongings", "healthpack2", 0.5, "prototype_lifepack");
dreamerBody.addItemToInventory("Belongings", "energypack1", 0.7, "prototype_energypack");
dreamerBody.addItemToInventory("Belongings", "energypack1", 0.5, "prototype_energypack");
actionableDreamerCatalog.addDreamer("prototype_basic", dreamerBody, 100);


// Room
var dreamerRoom = new ScenarioDreamer();
dreamerRoom.names = ["room", "hall"];
dreamerRoom.descriptions = ["basic room: 4 walls, floor and ceiling."];
dreamerRoom.addEmbodiment("body1", 1, 1, 1, 'prototype_basic');
dreamerRoom.addEmbodiment("collectable", 2, 1, 0.75, 'prototype_energypack');
actionableDreamerCatalog.addDreamer("prototype_room_basic", dreamerRoom, 10);

