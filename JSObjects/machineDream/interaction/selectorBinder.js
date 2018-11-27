
function SelectorBinder() {
    "use strict";
    this.selectors = {};
    this.bindings = {};
    this.maps = {};
}

// creation
SelectorBinder.prototype.put = function (inreference, selector) {
    "use strict";
    if (inreference !== undefined) {
        this.selectors[inreference] = selector;
    }
    return this;
};

// creation
SelectorBinder.prototype.map = function (outreference, inreference) {
    "use strict";
    if (outreference !== undefined && inreference !== undefined) {
        this.maps[inreference] = outreference;
        this.bindings[outreference] = undefined;
    }
    return this;
};

// Asignments
SelectorBinder.prototype.bind = function (outreference, target) {
    "use strict";
    if (outreference !== undefined) {
        this.bindings[outreference] = target;
    }
    return this;
};

SelectorBinder.prototype.unbindAll = function () {
    "use strict";
    var outreference;
    for (outreference in this.bindings) {
        if (this.bindings.hasOwnProperty(outreference)) {
            this.bindings[outreference] = undefined;
        }
    }
    return this;
};

// Retrieve Selector: Object itself (Room/Body), Inventory or Feature
SelectorBinder.prototype.get = function (inreference) {
    "use strict";
    var selector, target, outreference;
    if (inreference !== undefined) {
        outreference = this.maps[inreference];
        selector = this.selectors[inreference];
        if (outreference !== undefined) {
            target = this.bindings[outreference];
            if (target !== undefined) {
                if (selector !== undefined) {
                    return selector.get(target);
                } else {
                    return target;
                }
            }
        }
    }
    return undefined;
};

// only for fearures
SelectorBinder.prototype.set = function (inreference, feature_value) {
    "use strict";
    var selector, target, outreference;
    if (inreference !== undefined) {
        outreference = this.maps[inreference];
        selector = this.selectors[inreference];
        if (outreference !== undefined) {
            target = this.bindings[outreference];
            if (target !== undefined) {
                if (selector !== undefined) {
                    return selector.set(target, feature_value);
                }
            }
        }
    }
    return this;
};
