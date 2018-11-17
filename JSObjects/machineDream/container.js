/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


function Container () {
    this.collectables = [];
}


Container.prototype.contains = function(actionable) {
    var idx = this.collectables.indexOf(actionable);
    return (idx > -1);
};

Container.prototype.push = function(actionable) {
    if (!this.contains(actionable)) {
        this.collectables.push(actionable);
    }
    return this;
};

Container.prototype.remove = function(actionable) {
    var idx = this.collectables.indexOf(actionable);
    if (idx > -1) {
        this.collectables.splice(idx,1);
    }
    return this;
};

Container.prototype.clear = function() {
    this.collectables.length = 0;
    return this;
};

Container.prototype.merge = function(container) {
    if (container instanceof Container){
        for (var c in container.collectables) {
            this.push(container.collectables[c]);
        }
    }
    return this;
};

Container.prototype.transferFrom = function(container) {
    if (container instanceof Container){
        for (var c in container.collectables) {
            this.push(container.collectables[c]);
            container.remove(container.collectables[c]);
        }
    }
    return this;
};

Container.prototype.isEmpty = function() {
    return (this.collectables.length === 0);
};

Container.prototype.serializeJSON = function() {
    return JSON.stringify(this);
};

Container.prototype.parseObject = function(obj) {
    if ('collectables' in obj && Array.isArray(obj.collectables)){
        this.clear();
        for (var idx in obj.collectables){
            var actionable = new Actionable();
            actionable.parseObject(obj.collectables[idx]);
            this.push(actionable);
        }
    }
    return this;
};

Container.prototype.deserializeJSON = function(json) {
    var obj_from_json = JSON.parse( json );
    if ( Array.isArray(obj_from_json)){
        obj_from_json = obj_from_json[1];
    }
    
    return this.parseObject(obj_from_json);
};
