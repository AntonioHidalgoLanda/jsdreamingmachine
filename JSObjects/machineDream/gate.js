/*global Embodiment, Gate, Scenario, actionableDreamerCatalog, EmbodimentViewer, ExecutorHandler*/
Gate.prototype = new Embodiment();
Gate.prototype.constructor = Gate;


function Gate(name, description, portraitID, graphicID) {
    "use strict";
    Embodiment.call(this, name, description, portraitID, graphicID);
    this.scenario1 = undefined;
    this.scenario2 = undefined;
    this.distance = 1;
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
    if (obj.hasOwnProperty('distance')) {
        this.distance = obj.distance;
    }
    return this;
};

Gate.prototype.getScenario1 = function () {
    if (typeof this.scenario1 === 'string' || this.scenario1 instanceof String) {
        // TODO
        // Alternatively, we can pick an existing door, therefore, the solutions should be
        // check p probability, if higher create a room, if lower pick existing one
        // alternativelly we can check for the priority the length of the element in the catalog vs the current numbers
        this.scenario1 = actionableDreamerCatalog.dream(this.scenario1);
        this.scenario1.push(this);
    }
    return this.scenario1;
};

Gate.prototype.getScenario2 = function () {
    if (typeof this.scenario2 === 'string' || this.scenario2 instanceof String) {
        // TODO
        // Alternatively, we can pick an existing door, therefore, the solutions should be
        // check p probability, if higher create a room, if lower pick existing one
        // alternativelly we can check for the priority the length of the element in the catalog vs the current numbers
        this.scenario2 = actionableDreamerCatalog.dream(this.scenario2);
        this.scenario2.push(this);
    }
    return this.scenario2;
};
Gate.prototype.getCurrentScenario = function (traveller) {
    "use strict";
    if (this.scenario1 instanceof Scenario && this.scenario1.contains(traveller)) {
        return this.getScenario1();
    } else if (this.scenario2 instanceof Scenario && this.scenario2.contains(traveller)) {
        return this.getScenario2();
    } else {
        return undefined;
    }
};

Gate.prototype.getNextScenario = function (currentScenario) {
    "use strict";
    if (this.scenario1 instanceof Scenario && this.scenario1 === currentScenario) {
        return this.getScenario2();
    } else if (this.scenario2 instanceof Scenario && this.scenario2 === currentScenario) {
        return this.getScenario1();
    } else if (this.scenario1 instanceof Scenario && this.scenario2 instanceof Scenario) { //but currentScenario not in (scenario1,scenario2)
        return undefined; // you are not in any of the two spaces
    } else if (this.scenario1 instanceof Scenario && this.scenario1 !== currentScenario && !(this.scenario2 instanceof Scenario)) {
        this.scenario2 = currentScenario;
        return this.getScenario1();
    } else {
        this.scenario1 = currentScenario;
        return this.getScenario2();
    }
};

Gate.prototype.cross = function (traveller, viewer) {
    "use strict";
    var currentScenario, nextScenario;
    currentScenario = this.getCurrentScenario(traveller);
    if (currentScenario !== undefined) {
        nextScenario = this.getNextScenario(currentScenario);
        currentScenario.remove(traveller);
        nextScenario.push(traveller);
        if (viewer !== undefined &&
                viewer instanceof EmbodimentViewer &&
                viewer.executerHandler !== undefined &&
                viewer.executerHandler instanceof ExecutorHandler) {
            if (viewer.executerHandler.self === traveller && viewer.executerHandler.room !== nextScenario) {
                viewer.executerHandler.room = nextScenario;
                viewer.rebase(nextScenario);
                viewer.show();
            }
        }
    }
};