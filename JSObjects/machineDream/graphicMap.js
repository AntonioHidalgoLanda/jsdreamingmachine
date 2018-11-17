/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


function GraphicMap () {
    this.map = {};
}
 
GraphicMap.prototype.serializeJSON = function() {
    return JSON.stringify(this.map);
};

GraphicMap.prototype.deserializeJSON = function(json) {
    // TODO to validate the input json
    this.map = eval('('+json+')');
    return this;
};
 
GraphicMap.prototype.addGraphic = function(id,uri) {
    this.map[id] = uri;
    return this;
};
 
GraphicMap.prototype.getGraphic = function(id) {
    if (id in this.map){
        return this.map[id];
    }
    else {
        return '';
    }
};

GraphicMap.prototype.getImage = function(id) {
    var imgUrl = this.getGraphic(id);
    var img = new Image;
    img.src = imgUrl;
    return img;
}; 


