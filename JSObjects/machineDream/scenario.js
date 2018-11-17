/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function Scenario (isotileMap,graphicMap) {
    this.SCENARIO_OBJECT_CELLS = 1;
    var that = this;
    
    ScenarioCell.prototype = new Container();
    ScenarioCell.prototype.constructor = ScenarioCell;

    function ScenarioCell (scenario,x,y) {
        this.scenario = scenario;
        this.x = x;
        this.y = y;


        this.push = function(embodiment) {
            addEmbodimentFromCell(embodiment,this.x,this.y);
            return Container.prototype.push.call(this,embodiment);
        };

        this.remove = function(embodiment) {
            removeEmbodimentFromCell(embodiment);
            return Container.prototype.remove.call(this,embodiment);
        };

        this.clear = function() {
            for (var c in container.collectables) {
                removeEmbodimentFromCell(container.collectables[c]);
            }
            Container.prototype.clear.call(this);
        };
    }
    
    this.isotileMap = isotileMap;
    this.graphicMap = graphicMap;
    
    this.embodiments = {};  // key object; value coordinates
    this.map = new Array(this.isotileMap.width);
    for (var i = 0; i < this.isotileMap.width; i++) {
        this.map[i] = new Array(this.isotileMap.length);
        for (var j = 0; j < this.isotileMap.length; j++) {
            this.map[i][j] = new ScenarioCell(this,i,j);
        }
    }

    addEmbodimentFromCell = function(embodiment,x,y) {
        if (embodiment instanceof Embodiment ){
            that.embodiments[embodiment.getID()] = {'x':x,'y':y,'object':embodiment};
        }
    };

    removeEmbodimentFromCell = function(embodiment) {
        if (embodiment instanceof Embodiment ){
            delete that.embodiments[embodiment.getID()];
        }
    };

}

Scenario.prototype.addObject = function(embodiment,x,y) {
    this.removeObject(embodiment);
    for(i=x;i<x+this.SCENARIO_OBJECT_CELLS;i++){
        for (j=x;j<y+this.SCENARIO_OBJECT_CELLS;j++){
            if (i >= this.map.length || j >= this.map[i].length ){
                // TODO throug exception out of bounds
                continue;
            }
            this.map[i][j].push(embodiment);
        }
    }
    return this;
};


Scenario.prototype.removeObject = function(embodiment) {
    var x = 0;
    var y = 0;
    if (embodiment instanceof Embodiment ){
        if (this.embodiments.hasOwnProperty(embodiment.getID()) &&
                this.embodiments[embodiment.getID()].hasOwnProperty('x') &&
                this.embodiments[embodiment.getID()].hasOwnProperty('y')){
            x = this.embodiments[embodiment.getID()].x;
            y = this.embodiments[embodiment.getID()].y;
        }
        for(var i=x;i<x+this.SCENARIO_OBJECT_CELLS;i++){
            for (var j=x;j<y+this.SCENARIO_OBJECT_CELLS;j++){
                if (i >= this.map.length || j >= this.map[i].length ){
                    continue;
                }
                this.map[i][j].remove(embodiment);
            }
        }
    }
    return this;
};

Scenario.prototype.inspectCell = function(x, y) {
    return this.map[x][y];
};
 
Scenario.prototype.inspectObject = function(embodiment) {
    return this.embodiments[embodiment.getID()];
};


// TODO mange objects of different cell size
Scenario.prototype.renderEmbodiment = function(embodiment,x,y) {
    var img = this.graphicMap.getImage(embodiment.getGraphicID());
    
    this.isotileMap.renderObject(img,x,y);
    return this;
};

Scenario.prototype.renderScenario = function() {
    //var keys = this.objects.keys;
    var embodiment = null;
    
    for (var k in this.embodiments){
        embodiment = this.embodiments[k];
        this.renderEmbodiment(embodiment.object,embodiment.x,embodiment.y);
    };
    return this;
};
