/*global Container, Scenario*/

Scenario.prototype = new Container();
Scenario.prototype.constructor = Scenario;

function Scenario() {
    "use strict";
    Container.call(this);
}

Scenario.prototype.addObject = function (embodiment) {
    "use strict";
    if (embodiment !== undefined) {
        Container.prototype.push.call(this, embodiment);
    }
    return this;
};


Scenario.prototype.removeObject = function (embodiment) {
    "use strict";
    Container.prototype.remove.call(this, embodiment);
    return this;
};


