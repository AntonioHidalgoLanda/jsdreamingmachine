/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */



function Actionable () {
    this.id = generateUUID();
    this.features = {};
    // TODO
    //this.roles;
    
}

Actionable.prototype.setID = function(id) {
    this.id = id;
    return this;
};

Actionable.prototype.getID = function() {
    return this.id;
};

Actionable.prototype.deleteFeature = function(feature) {
    delete this.features[feature];
    return this;
};

Actionable.prototype.setFeature = function(feature, value) {
    this.features[feature] = value;
    return this;
};

Actionable.prototype.getFeature = function(feature) {
    return this.features[feature];
};
 
Actionable.prototype.serializeJSON = function() {
    return JSON.stringify(this);
};

Actionable.prototype.parseObject = function(obj, bKeepID) {
    if ('id' in obj && bKeepID === undefined){
        this.id = obj.id;
    }
    if ('features' in obj){
        for (var feature in obj.features){
            this.setFeature(feature,obj.features[feature]);
        }
    }
    return this;
};

Actionable.prototype.deserializeJSON = function(json, bKeepID) {
    var obj_from_json = JSON.parse( json );
    if ( Array.isArray(obj_from_json)){
        obj_from_json = obj_from_json[1];
    }
    return this.parseObject(obj_from_json, bKeepID);
};

function generateUUID () { // Public Domain/MIT
    var d = new Date().getTime();
    if (typeof performance !== 'undefined' && typeof performance.now === 'function'){
        d += performance.now(); //use high-precision timer if available
    }
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = (d + Math.random() * 16) % 16 | 0;
        d = Math.floor(d / 16);
        return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
}

