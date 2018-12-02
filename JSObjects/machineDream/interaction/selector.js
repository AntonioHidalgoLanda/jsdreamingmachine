/*global Actionable, Container, Embodiment, Collectable, Inventory, Gate*/
function Selector(subtype, refId) {
    "use strict";
    this.subtype = subtype;
    this.refId = refId;
}

Selector.prototype.get = function (embodiment) {
    "use strict";
    var inventory;
    if (this.subtype !== undefined && this.refId !== undefined) {
        if (this.subtype.toLowerCase() === "feature") {
            if (embodiment.hasOwnProperty("features")) {
                return embodiment.getFeature(this.refId);
            } else {
                return undefined;
            }
        } else if (this.subtype.toLowerCase() === "inventory") {
            if (embodiment.hasOwnProperty("inventories")) {
                inventory = embodiment.getInventory(this.refId);
                return (inventory !== null) ? inventory : undefined;
            } else {
                return undefined;
            }
        } else {
            return undefined;
        }
    } else if (this.subtype !== undefined) {
        switch (this.subtype.toLowerCase()) {
        case "actionable":
            return (embodiment instanceof Actionable) ? embodiment : undefined;
        case "embodiment":
            return (embodiment instanceof Embodiment) ? embodiment : undefined;
        case "collectable":
            return (embodiment instanceof Collectable) ? embodiment : undefined;
        case "container":
            return (embodiment instanceof Container) ? embodiment : undefined;
        case "inventory":
            return (embodiment instanceof Inventory) ? embodiment : undefined;
        case "gate":
            return (embodiment instanceof Gate) ? embodiment : undefined;
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