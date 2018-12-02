/*global MasterObject, Actionable*/

Actionable.prototype = new MasterObject();
Actionable.prototype.constructor = Actionable;

function Actionable() {
    "use strict";
    MasterObject.call(this);
    this.features = {};
}

Actionable.prototype.getName = function () {
    "use strict";
    return (this.name === undefined) ? "unknown -" + this.id : this.name;
};

Actionable.prototype.deleteFeature = function (feature) {
    "use strict";
    delete this.features[feature];
    return this;
};

Actionable.prototype.setFeature = function (feature, value) {
    "use strict";
    this.features[feature] = value;
    return this;
};

Actionable.prototype.getFeature = function (feature) {
    "use strict";
    return this.features[feature];
};

Actionable.prototype.parseObject = function (obj, bKeepID) {
    "use strict";
    var feature;
    MasterObject.prototype.parseObject.call(this, obj, bKeepID);
    if (obj.hasOwnProperty('features')) {
        for (feature in obj.features) {
            if (obj.features.hasOwnProperty(feature)) {
                this.setFeature(feature, obj.features[feature]);
            }
        }
    }
    return this;
};


