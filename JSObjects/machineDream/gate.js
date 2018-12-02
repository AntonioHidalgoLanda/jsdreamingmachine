/*global Embodiment, Gate, Scenario*/
Gate.prototype = new Embodiment();
Gate.prototype.constructor = Gate;


function Gate(name, description, portraitID, graphicID) {
    "use strict";
    Embodiment.call(this, name, description, portraitID, graphicID);
    this.scenario1 = undefined;
    this.scenario2 = undefined;
}

Gate.prototype.setScenarios = function (scenario1, scenario2) {
    "use strict";
    this.scenario1 = scenario1;
    this.scenario2 = scenario2;
    return this;
};

Gate.prototype.parseObject = function (obj, bKeepID) {
    "use strict";
    Embodiment.prototype.parseObject.call(this, obj, bKeepID);
    if (obj.hasOwnProperty('scenario1')) {
        this.scenario1 = new Scenario();
        this.scenario1.parseObject(obj.scenario1);
    }
    if (obj.hasOwnProperty('scenario2')) {
        this.scenario2 = new Scenario();
        this.scenario2.parseObject(obj.scenario2);
    }
    return this;
};