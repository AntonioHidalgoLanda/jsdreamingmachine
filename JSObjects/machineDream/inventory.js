/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

Inventory.prototype = new Container();
Inventory.prototype.constructor = Inventory;

function Inventory (maxWeight,maxSize) {
    this.maxWeight = maxWeight;
    this.maxSize = maxSize;
    this.totalWeight = 0;
    this.totalSize = 0;
}

Inventory.prototype.getTotalWeight = function() {return this.totalWeight;};
Inventory.prototype.getTotalSize = function() {return this.totalSize;};
Inventory.prototype.getMaxWeight = function() {return this.maxWeight;};
Inventory.prototype.getMaxSize = function() {return this.maxSize;};

Inventory.prototype.setMaxWeight = function(maxWeight) {
    if (maxWeight > 0  && this.totalWeight <= maxWeight)
        this.maxWeight = maxWeight;
    return this;
};

Inventory.prototype.setMaxSize = function(maxSize) {
    if (maxSize > 0 && this.totalSize <= maxSize)
        this.maxSize = maxSize;
    return this;
};

Inventory.prototype.fitsIn = function(collectable) {
    return ((collectable instanceof Collectable) &&
            !this.contains(collectable) &&
            (collectable.getSize() + this.totalSize <=  this.maxSize) &&
            (collectable.getWeight() + this.totalWeight <=  this.maxWeight));
};

/**
 * @extends Container
 * @param {Collectable} collectable
 * @returns {Container.prototype}
 */
Inventory.prototype.push = function(collectable) {
    if ((collectable instanceof Collectable) &&
            !this.contains(collectable) &&
            (collectable.getSize() + this.totalSize <=  this.maxSize) &&
            (collectable.getWeight() + this.totalWeight <=  this.maxWeight)) {
        this.collectables.push(collectable);
        this.totalSize += collectable.getSize();
        this.totalWeight += collectable.getWeight();        
    }
    return this;
};

/**
 * @extends Container
 * @param {Collectable} collectable
 * @returns {Inventory.prototype}
 */
Inventory.prototype.remove = function(collectable) {
    var idx = this.collectables.indexOf(collectable);
    if ((idx > -1)
            && (collectable instanceof Collectable)
            ) {
        this.collectables.splice(idx,1);
        this.totalSize -= collectable.getSize();
        this.totalWeight -= collectable.getWeight();
    }
    return this;
};

/**
 * @extends Container
 * @returns {Inventory.prototype}
 */
Inventory.prototype.clear = function() {
    Container.prototype.clear.call(this);
    this.totalWeight = 0;
    this.totalSize = 0;
    
    return this;
};

Inventory.prototype.serializeJSON = function() {
    return JSON.stringify(this);
};

Inventory.prototype.parseObject = function(obj) {
    Container.prototype.parseObject.call(this,obj);
    if ('maxWeight' in obj){
        this.maxWeight = obj.maxWeight;
    }
    if ('maxSize' in obj){
        this.maxSize = obj.maxSize;
    }
    if ('totalWeight' in obj){
        this.totalWeight = obj.totalWeight;
    }
    if ('totalSize' in obj){
        this.totalSize = obj.totalSize;
    }
    return this;
};

