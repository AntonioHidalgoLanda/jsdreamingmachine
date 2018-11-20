/*exported actionableDreamerCatalog*/
/*global Collectable, Embodiment, Scenario*/

/* TODO Separate Statistical functions in a different file */
var stat_deviate = function (average, deviation) {
    "use strict";
    var random = Math.random() * deviation * 2;
    return average - deviation + random;
};

var stat_probability = function (probability) {
    "use strict";
    return (probability >= Math.random());
};


/* TODO Separate actionableDreamerCatalog in a different file */
var actionableDreamerCatalog = {};

actionableDreamerCatalog.addDreamer = function (reference, dreamer, maxDreams) {
    "use strict";
    this[reference] = {'dreamer': dreamer, 'max': maxDreams, 'dreams': []};
    return this;
};

actionableDreamerCatalog.dream = function (reference) {
    "use strict";
    var dream, embodiment;
    if (this.hasOwnProperty(reference)) {
        dream = this[reference];
        if (dream.max > dream.dreams.length) {
            embodiment = dream.dreamer.dream();
            dream.dreams.push(embodiment);
        }
    }
    return embodiment;
};

/* TODO Either merge all the dreamers or separate them in different files */
function ScenarioDreamer() {
    "use strict";
    this.embodiments = {};
}

ScenarioDreamer.prototype.addEmbodiment = function (embodimentRef, average, deviation, probability, catalogRef) {
    "use strict";
    this.embodiments[embodimentRef] = {'average': average, 'deviation': deviation, 'probability': probability, 'catalogRef': catalogRef};
    return this;
};

ScenarioDreamer.prototype.dream = function () {
    "use strict";
    var room = new Scenario(), body, record, count;
    for (body in this.embodiments) {
        if (this.embodiments.hasOwnProperty(body)) {
            record = this.embodiments[body];
            for (count = stat_deviate(record.average, record.deviation); count > 0; count -= 1) {
                if (stat_probability(record.probability)) {
                    room.addObject(actionableDreamerCatalog.dream(record.catalogRef));
                }
            }
        }
    }
    return room;
};


//resume dream
// console.log("actionableDreamer: actionableDreamerCatalog.resumeDream: On Development")

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
    if (values.length <= 0 || values === undefined) {
        return undefined;
    }
    random_number = Math.floor(random_number);
    return values[random_number];
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
            actionable.deserializeJSON(this.base.serializeJSON(), true); //Cloning
            if (name !== undefined) {
                actionable.setName(name);
            }
            if (description !== undefined) {
                actionable.setDescription(description);
            }
            if (portraitID !== undefined) {
                actionable.setPortraitID(portraitID);
            }
            if (weight !== undefined) {
                actionable.setWeight(weight);
            }
            if (size !== undefined) {
                actionable.setSize(size);
            }
        } else {
            actionable = new Collectable(name, description, weight, size, portraitID);
        }
    } else {
        if (this.hasOwnProperty('base') && this.base !== null) {
            actionable = new Embodiment();
            actionable.deserializeJSON(this.base.serializeJSON(), true); //Cloning
            if (name !== undefined) {
                actionable.setName(name);
            }
            if (description !== undefined) {
                actionable.setDescription(description);
            }
            if (portraitID !== undefined) {
                actionable.setPortraitID(portraitID);
            }
            
        } else {
            actionable = new Embodiment(name, description, portraitID);
        }
    }
    //  REFACTORING - Features asignments
    for (feature in this.features) {
        if (this.features.hasOwnProperty(feature)) {
            if (stat_probability(this.features[feature].p)) { // REFACTORING - check if the probability check passes
                for (value in this.features[feature].values) {
                    if (this.features[feature].values.hasOwnProperty(value)) {
                        if (stat_probability(this.features[feature].values[value])) { // Check probability in values 
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
            iSize = Math.floor(iSize);
            iWeight = this.inventories[inventory].weight.max - this.inventories[inventory].weight.deviation;
            iWeight += Math.random() * this.inventories[inventory].weight.deviation * 2;
            iWeight = Math.floor(iWeight);
            if (!actionable.getInventory(inventory)) {
                actionable.createInventory(inventory, iWeight, iSize);
            }
            for (content in this.inventories[inventory].items) {
                if (this.inventories[inventory].items.hasOwnProperty(content)) {
                    if (stat_probability(this.inventories[inventory].items[content].p)) {
                        if (actionableDreamerCatalog.hasOwnProperty(this.inventories[inventory].items[content].ref)) {
                            actionable.getInventory(inventory)
                                .push(actionableDreamerCatalog.dream(this.inventories[inventory].items[content].ref));
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

ActionableDreamer.prototype.parseObject = function (obj) {
    "use strict";
    if (obj.hasOwnProperty('base')) {
        if (obj.base instanceof Embodiment) {
            this.base = new Embodiment();
        } else if (obj.base instanceof Collectable) {
            this.base = new Collectable();
        }
        this.base.deserializeJSON(obj.base.serializeJSON(), true);
    } else {
        this.base = null;
    }
    if (obj.hasOwnProperty('names')) {
        this.names = JSON.parse(obj.names);
    }
    if (obj.hasOwnProperty('descriptions')) {
        this.descriptions = JSON.parse(obj.descriptions);
    }
    if (obj.hasOwnProperty('portraitIDs')) {
        this.portraitIDs = JSON.parse(obj.portraitIDs);
    }
    
    if (obj.hasOwnProperty('features')) {
        this.features = JSON.parse(obj.features);
    }
    if (obj.hasOwnProperty('inventories')) {
        this.inventories = JSON.parse(obj.inventories);
    }
    return this;
};

ActionableDreamer.prototype.deserializeJSON = function (json) {
    "use strict";
    var obj_from_json = JSON.parse(json);
    if (Array.isArray(obj_from_json)) {
        obj_from_json = obj_from_json[1];
    }
    
    return this.parseObject(obj_from_json);
};
