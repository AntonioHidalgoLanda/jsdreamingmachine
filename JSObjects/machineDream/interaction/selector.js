
function Selector(subtype, refId) {
    "use strict";
    this.subtype = subtype;
    this.refId = refId;
}

Selector.prototype.get = function (embodiment) {
    "use strict";
    if (this.subtype !== undefined && this.refId !== undefined) {
        if (this.subtype.toLowerCase() === "feature") {
            if (embodiment.hasOwnProperty("features")) {
                return embodiment.getFeature(this.refId);
            }
        } else if (this.subtype.toLowerCase() === "inventory") {
            if (embodiment.hasOwnProperty("inventories")) {
                return embodiment.getInventory(this.refId);
            }
        }
    }
    return embodiment;
};

// only for fearures
Selector.prototype.set = function (embodiment, feature_value) {
    "use strict";
    if (this.subtype.toLowerCase() === "feature" && this.refId !== undefined) {
        if (embodiment.hasOwnProperty("features")) {
            return embodiment.setFeature(this.refId, feature_value);
        }
    }
    return this;
};