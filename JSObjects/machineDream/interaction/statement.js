/*global SelectorBinder, Container, Actionable */
/*
Include in all statements the level of believe
Include an accessibility, i.e. free (), people who I know, people who look align,...

# Description of real world
    X has Y
    X is (equal, bg, lt...) y (Objects and features)
    X is in Y (Objects and Containers)
    X lead to Y (doors and rooms/paths to)
    how much cost X in Y 


# Owed and Debited - Goal/Objective
# they are relevant at decision making
# Can be reactive (buy-sell) generating eithed sub-objectives or actions

# Goals and SubGoals
    A) get X        -> action (a, d), F, C, E, G
    B) give X to Y  -> action (c), F, C, A
    C) go to X      -> action (b), C, D
    D) find about - paths to X              -> (d, e)
    E) find bout - who owns X               -> (d, e)
    F) find bout - where is X               -> (d, e)
    G) find about - how much cost X in Y    -> (d, e)
    H) find about - is X foe or ally???????

# Actions
    a) get X // e.g. from room
    b) go to X
    c) give X to Y
    d) start echange to get X
        C.2) includes exchange of knwoledge
    e) Explore
        D.2) includes getting free knowledge from other bodies
    f) Lie
    
*/
function Substatement(value, inReference) {
    "use strict";
    this.value = value;
    this.inReference = inReference;
}

Substatement.prototype.get = function () {
    "use strict";
    if (this.value instanceof SelectorBinder) {
        return this.value.get(this.inReference);
    } else {
        return this.value;
    }
};

function Statement(leftStatement, rightStatement, condition) {
    "use strict";
    this.left = leftStatement;
    this.right = rightStatement;
    this.statement = condition;
}

Statement.STATEMENTS = {"equal": "=", "lesser_than": ">", "lesser_equal": ">=", "greater_than": ">", "greater_equal": ">=", "is_in": "in", "not_in": "!in", "not_equal": "!=", "not_empty": "!empty"};

Statement.prototype.getInReferences = function () {
    "use strict";
    var inReferences = [];
    if (this.left.inReference !== undefined) {
        inReferences.push(this.left.inReference);
    }
    if (this.right.inReference !== undefined) {
        inReferences.push(this.right.inReference);
    }
    return inReferences;
};

Statement.prototype.assert = function () {
    "use strict";
    var container, actionable;
    switch (this.statement) {
    case Statement.STATEMENTS.equal:
        return (this.left.get() === this.right.get());
    case Statement.STATEMENTS.not_equal:
        return (this.left.get() !== this.right.get());
    case Statement.STATEMENTS.greater_equal:
        return (this.left.get() >= this.right.get());
    case Statement.STATEMENTS.greater_than:
        return (this.left.get() > this.right.get());
    case Statement.STATEMENTS.lesser_equal:
        return (this.left.get() <= this.right.get());
    case Statement.STATEMENTS.lesser_than:
        return (this.left.get() < this.right.get());
    case Statement.STATEMENTS.is_in:
        actionable = this.left.get();
        container = this.right.get();
        if (container instanceof Container && actionable instanceof Actionable) {
            return container.contains(actionable);
        }
        return undefined;
    case Statement.STATEMENTS.not_in:
        actionable = this.left.get();
        container = this.right.get();
        if (container instanceof Container && actionable instanceof Actionable) {
            return !(container.contains(actionable));
        }
        return undefined;
    case Statement.STATEMENTS.not_empty:
        container = this.left.get();
        if (container instanceof Container) {
            return !(container.isEmpty());
        }
        return undefined;
    }
    return undefined;
};
