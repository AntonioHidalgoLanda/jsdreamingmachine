/*jslint devel: true */
/* eslint-disable no-console */
/*exported actionableDreamerCatalog*/
/*global Collectable, Embodiment*/
/*
    <div style="background-color: lightgray;white-space: pre-wrap"><code>
        {
            Base:{...},
            Names:[Joe,John,...],
            Descriptions:[...],
            Features:{
                life:{p:1,vals:{75:0.05,100,0.9}},
                charm:{p:.5,vals:{1:0.05,2,0.1}}
            }
            Inventories:{
                Belongings:{
                    weight:[100,20],
                    size:[100,20],
                    contents:{ring:{0.3,ring_prototype},charm:{0.1,charm_prototype}}
                },
                Thoughts:{
                    weight:[0,0],
                    size:[0,0],
                    contents:{}}
            }
        }
        </code></div>
</ul>
*/
/*global
console
*/
var actionableDreamerCatalog = {};

function ActionableDreamer() {
    "use strict";
    this.base = null; // TODO add base actionable
    this.names = {}; // TODO add names
    this.portraitIDs = {}; // TODO add names
    this.descriptions = {}; // TODO add descriptions
    this.features = {};
    this.inventories = {}; // add inventory, add item to inventory
}

ActionableDreamer.prototype.addFeature = function (name, probability, values) {
    "use strict";
    var fname = name.trim(), value;
    if (!this.features.hasOwnProperty(fname)) {
        this.features[fname] = {'p': probability, 'values': values};
    } else {
        this.features[fname].p = probability;
        for (value in values) {
            if (values.hasOwnProperty(value)) {
                this.features[fname].values[value] = values[value];
                if (values[value] === 0) {
                    delete this.features[fname].values[value];
                }
            }
        }
    }
    return this;
};


ActionableDreamer.prototype.addInventory = function (name, maxSizeAverage, maxSizeDeviation, maxWeightAverage, maxWeigthDeviation) {
    "use strict";
    var iname = name.trim();
    if (!this.inventories.hasOwnProperty(iname)) {
        this.inventories[iname] = {'items': {}};
    }
    
    this.inventories[iname].size = {'max': maxSizeAverage, 'deviation': maxSizeDeviation};
    this.inventories[iname].weight = {'max': maxWeightAverage, 'deviation': maxWeigthDeviation};
    
    return this;
};

ActionableDreamer.prototype.addItemToInventory = function (inventoryName, collectableName, probability, reference) {
    "use strict";
    var iname = inventoryName.trim(), cname = collectableName.trim();
    if (!this.inventories.hasOwnProperty(iname)) {
        this.addInventory(iname, 0, 0, 0, 0);
    }
    this.inventories[iname].items[cname] = {'p': probability, 'ref': reference};
    
    return this;
};

ActionableDreamer.prototype.getRandomValue = function (values) {
    "use strict";
    var random_number = Math.random() * (values.length - 0.001);
    if (values.length <= 0) {
        return "undefined";
    }
    random_number = Math.floor(random_number);
    return values[random_number];
};

ActionableDreamer.prototype.checkProbability = function (probability) {
    "use strict";
    return probability >= Math.random();
};

ActionableDreamer.prototype.dream = function () {
    "use strict";
    var actionable, name, description, weight, size, portraitID, feature, value, inventory, iSize, iWeight, content;
    // REFACTORING - Entity Creation
    name = this.getRandomValue(this.names);
    description = this.getRandomValue(this.descriptions);
    portraitID = this.getRandomValue(this.portraitIDs);
    if (this.hasOwnProperty('weight') || this.hasOwnProperty('size')) {
        weight = (this.hasOwnProperty('weight')) ? this.weight : 0;
        size = (this.hasOwnProperty('size')) ? this.size : 0;
        if (this.hasOwnProperty('base') && this.base !== null) {
            actionable = new Collectable();
            actionable.deserializeJSON(this.base.serializeJSON()); //Cloning
            actionable.setName(name)
                .setDescription(description)
                .setPortraitID(portraitID)
                .setWeight(weight)
                .setSize(size);
        } else {
            actionable = new Collectable(name, description, weight, size, portraitID);
        }
    } else {
        if (this.hasOwnProperty('base') && this.base !== null) {
            actionable = new Embodiment();
            actionable.deserializeJSON(this.base.serializeJSON()); //Cloning
            actionable.setName(name)
                .setDescription(description)
                .setPortraitID(portraitID);
            
        } else {
            actionable = new Embodiment(name, description, portraitID);
        }
    }
    //  REFACTORING - Features asignments
    for (feature in this.features) {
        if (this.features.hasOwnProperty(feature)) {
            if (this.checkProbability(this.features[feature].p)) { // REFACTORING - check if the probability check passes
                for (value in this.features[feature].values) {
                    if (this.features[feature].values.hasOwnProperty(value)) {
                        if (this.checkProbability(this.features[feature].values[value])) { // Check probability in values 
                            actionable.setFeature(feature, value);
                        }
                    }
                }
            }
        }
    }
    // REFACTORING -  Sub-Entities creation and asignments
    // 
    //this.inventories[iname].items[cname] = {'p': probability, 'ref': reference};
    //
    for (inventory in this.inventories) {
        if (this.inventories.hasOwnProperty(inventory)) {
            iSize = this.inventories[inventory].size.max - this.inventories[inventory].size.deviation;
            iSize += Math.random() * this.inventories[inventory].size.deviation * 2;
            iWeight = this.inventories[inventory].weight.max - this.inventories[inventory].weight.deviation;
            iWeight += Math.random() * this.inventories[inventory].weight.deviation * 2;
            if (!actionable.getInventory(inventory)) {
                actionable.createInventory(inventory, iWeight, iSize);
            }
            for (content in this.inventories[inventory].items) {
                if (this.inventories[inventory].items.hasOwnProperty(content)) {
                    if (this.checkProbability(this.inventories[inventory].items[content].p)) {
                        if (actionableDreamerCatalog.hasOwnProperty(this.inventories[inventory].items[content].ref)) {
                            actionable.getInventory(inventory)
                                .push(actionableDreamerCatalog[this.inventories[inventory].items[content].ref].dream());
                        }
                    }
                }
            }
        }
    }
    return actionable;
};

ActionableDreamer.prototype.serializeJSON = function () {
    "use strict";
    return JSON.stringify(this);
};

/*
ActionableDreamer.prototype.parseObject = function (obj) {
    "use strict";
    var feature;
    console.log("on development - ActionableDreamer.dream()");
    if (obj.hasOwnProperty('id')) {
        this.id = obj.id;
    }
    if (obj.hasOwnProperty('features')) {
        for (feature in obj.features) {
            if (obj.features.hasOwnProperty(feature)) {
                this.setFeature(feature, obj.features[feature]);
            }
        }
    }
    return this;
};

ActionableDreamer.prototype.deserializeJSON = function (json) {
    "use strict";
    var obj_from_json = JSON.parse(json);
    console.log("on development - ActionableDreamer.dream()");
    if (Array.isArray(obj_from_json)) {
        obj_from_json = obj_from_json[1];
    }
    
    return this.parseObject(obj_from_json);
};
*/


// Testing script- this wil go out

// test create body with no base
var dreamerBody = new ActionableDreamer();
dreamerBody.names = ["Joe Bloggs", "John Doe", "Jean Doe"];
dreamerBody.descriptions = ["Pirate", "Player 1", "Boss"];
dreamerBody.addFeature("life", 1, {50: 0.3, 100: 0.9});
dreamerBody.addFeature("energy", 1, {50: 0.5, 100: 0.2, 75: 0.7, 1: 1});  //last value with 100% chance to prevent missing the feature
dreamerBody.addFeature("listening", 0.7, {"rock": 0.3, "pop": 0.5, "calssical": 0.3});
actionableDreamerCatalog.prototype_basic = dreamerBody;
console.log(dreamerBody.dream());


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
dreamerBody.names = ["Jack Sparrow", "Jean Bloggs"];
dreamerBody.descriptions = ["Miner"];
dreamerBody.addFeature("life", 1, {50: 0.3, 100: 0.9});
dreamerBody.addFeature("energy", 1, {50: 0.5, 100: 0.2, 75: 0.7, 1: 1});  //last value with 100% chance to prevent missing the feature
dreamerBody.addInventory("bag", 100, 0, 100, 0);
dreamerBody.addItemToInventory("bag", "rock", 0.7, "prototype_rock");
dreamerBody.addItemToInventory("bag", "rock", 0.7, "prototype_rock");
dreamerBody.addItemToInventory("bag", "rock", 0.7, "prototype_rock");
actionableDreamerCatalog.prototype_miner = dreamerBody;
console.log(dreamerBody.dream());

