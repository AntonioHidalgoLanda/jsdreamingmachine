/*global Container*/

function Scenario() {
    "use strict";
    this.embodiments = new Container();
}

Scenario.prototype.addObject = function (embodiment) {
    "use strict";
    this.embodiments.push(embodiment);
    return this;
};


Scenario.prototype.removeObject = function (embodiment) {
    "use strict";
    this.embodiments.remove(embodiment);
    return this;
};
 
Scenario.prototype.getEverybody = function () {
    "use strict";
    return this.embodiments.collectables;
};


