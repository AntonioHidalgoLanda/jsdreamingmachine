/*global MasterObject, Container, Actionable, Embodiment, Collectable, Gate*/

Container.prototype = new MasterObject();
Container.prototype.constructor = Container;

function Container() {
    "use strict";
    MasterObject.call(this);
    this.collectables = [];
}


Container.prototype.getName = function () {
    "use strict";
    return (this.hasOwnProperty("name")) ? this.name : "container";
};

Container.prototype.getEverybody = function () {
    "use strict";
    return this.collectables;
};

Container.prototype.contains = function (actionable) {
    "use strict";
    var idx = this.collectables.indexOf(actionable);
    return (idx > -1);
};

Container.prototype.push = function (actionable) {
    "use strict";
    if (!this.contains(actionable)) {
        this.collectables.push(actionable);
    }
    return this;
};

Container.prototype.remove = function (actionable) {
    "use strict";
    var idx = this.collectables.indexOf(actionable);
    if (idx > -1) {
        this.collectables.splice(idx, 1);
    }
    return this;
};

Container.prototype.clear = function () {
    "use strict";
    this.collectables.length = 0;
    return this;
};

Container.prototype.merge = function (container) {
    "use strict";
    var c;
    if (container instanceof Container) {
        for (c in container.collectables) {
            this.push(container.collectables[c]);
        }
    }
    return this;
};

// @deprecated
Container.prototype.transferFrom = function (container) {
    "use strict";
    var c;
    if (container instanceof Container) {
        for (c in container.collectables) {
            this.push(container.collectables[c]);
            container.remove(container.collectables[c]);
        }
    }
    return this;
};

Container.prototype.isEmpty = function () {
    "use strict";
    return (this.collectables.length === 0);
};

Container.prototype.parseObject = function (obj, bKeepID) {
    "use strict";
    var idx, actionable, subObj;
    MasterObject.prototype.parseObject.call(this, obj, bKeepID);
    if (obj.hasOwnProperty('collectables') && Array.isArray(obj.collectables)) {
        this.clear();
        for (idx in obj.collectables) {
            subObj = obj.collectables[idx];
            if (MasterObject.isSerializedObjectAnCollectable(subObj)) {
                actionable = new Collectable();
            } else if (MasterObject.isSerializedObjectAGate(subObj)) {
                actionable = new Gate();
            } else if (MasterObject.isSerializedObjectAnEmbodiment(subObj)) {
                actionable = new Embodiment();
            } else {
                actionable = new Actionable();
            }
            actionable.parseObject(subObj);
            this.push(actionable);
        }
    }
    return this;
};

