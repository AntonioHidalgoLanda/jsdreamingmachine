/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 * 
 * Depends on Actionable
 * public_html/js/machineDream/Embodiment.js
 */

// Inheritance
Collectable.prototype = new Embodiment();
Collectable.prototype.constructor = Collectable;


function Collectable (name,description,weight,size,portraitID,graphicID) {
    Embodiment.call(this,name,description,portraitID,graphicID);
    this.weight = weight;   // inventory related
    this.size = size;       // inventory related    
}

Collectable.prototype.setWeight = function(weight) {
    this.weight = weight;
    return this;
};

Collectable.prototype.setSize = function(size) {
    this.size = size;
    return this;
};

Collectable.prototype.getWeight = function() {
    return this.weight;
};

Collectable.prototype.getSize = function() {
    return this.size;
};

Collectable.prototype.parseObject = function(obj) {
    Embodiment.call(this,obj);
    if ('weight' in obj){
        this.weight = obj.weight;
    }
    if ('size' in obj){
        this.size = obj.size;
    }
    return this;
};

Collectable.prototype.serializeJSON = function() {
    return JSON.stringify(this);
};
