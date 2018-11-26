
function SelectorBinder() {
    "use strict";
    this.selectors = {};
    this.bindings = {};
    this.maps = {};
    this.preconditions = [];
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

// unbindall
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


SelectorBinder.prototype.getRoles = function () {
    "use strict";
    return Object.keys(this.bindings);
};

SelectorBinder.prototype.addPrecondition = function (precondition) {
    "use strict";
    this.preconditions.push(precondition);
    return this;
};

SelectorBinder.prototype.getPreconditionRoles = function () {
    "use strict";
    var idx, precondition, inRefs, iInRef, outRef, outRefs = [];
    for (idx in this.preconditions) {
        if (this.preconditions.hasOwnProperty(idx)) {
            precondition = this.preconditions[idx];
            inRefs = precondition.getInReferences();
            for (iInRef in inRefs) {
                if (inRefs.hasOwnProperty(iInRef)) {
                    outRef = this.maps[inRefs[iInRef]];
                    if (outRef !== undefined) {
                        if (outRefs.indexOf(outRef) === -1) {
                            outRefs.push(outRef);
                        }
                    }
                }
            }
        }
    }
    return outRefs;
};

// assert
SelectorBinder.prototype.assert = function () {
    "use strict";
    var idx, precondition, assertion = true;
    for (idx in this.preconditions) {
        if (this.preconditions.hasOwnProperty(idx)) {
            precondition = this.preconditions[idx];
            assertion = assertion && precondition.assert();
        }
    }
    return assertion;
};