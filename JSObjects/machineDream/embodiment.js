/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 * 
 * Depends on Actionable
 * public_html/js/machineDream/actionable.js
 * 
 * 
 * POSSIBLE ENHANCEMENTS:
 *      * Add a bit map to the object, hence we can position elements with a 
 *          non rectangular shape, eg L-shape
 * 
 */

Embodiment.prototype = new Actionable();
Embodiment.prototype.constructor = Embodiment;

function Embodiment(name, description, portraitID) {
    Actionable.call(this);
    this.name = name;
    this.description = description;
    this.portraitID = portraitID;
    this.inventories = {};
}

Embodiment.prototype.createInventory = function (name, maxWeight, maxSize) {
    if (!this.inventories.hasOwnProperty(name)) {
        this.inventories[name] = new Inventory(maxWeight, maxSize);
        this.inventories[name].setName(name);
    } else {
        this.inventories[name]
                .setMaxWeight(maxWeight)
                .setMaxSize(maxSize)
                .setName(name);
    }
    return this;
};

/**
 * 
 * @param {type} name
 * @returns {Inventory} or null
 */
Embodiment.prototype.getInventory = function (name) {
    if (this.inventories.hasOwnProperty(name)) {
        return this.inventories[name];
    } else {
        return null;
    }
};

Embodiment.prototype.parseObject = function (obj, bKeepID) {
    Actionable.prototype.parseObject.call(this, obj, bKeepID);
    this.inventories = {};
    if ("inventories" in obj) {
        for (var inventoryName in obj.inventories){
            var inventory = new Inventory (0,0);
            inventory.parseObject(obj.inventories[inventoryName]);
            this.inventories[inventoryName] = inventory;
        }
    }
    return this;
};
