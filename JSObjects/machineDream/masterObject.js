/*jslint bitwise: true */
/*global performance*/


function MasterObject() {
    "use strict";
    this.id = MasterObject.generateUUID();
    this.name = undefined;
    this.portraitID = undefined;
    this.background = undefined;
    
}

MasterObject.prototype.getID = function () {
    "use strict";
    if (!this.hasOwnProperty("id")) {
        this.id = MasterObject.generateUUID();
    }
    return this.id;
};


MasterObject.prototype.setName = function (name) {
    "use strict";
    this.name = name;
    return this;
};

MasterObject.prototype.getName = function () {
    "use strict";
    return this.name;
};

MasterObject.prototype.setDescription = function (description) {
    "use strict";
    this.description = description;
    return this;
};

MasterObject.prototype.setPortraitID = function (portraitID) {
    "use strict";
    this.portraitID = portraitID;
    return this;
};

MasterObject.prototype.getDescription = function () {
    "use strict";
    return this.description;
};

MasterObject.prototype.getPortraitID = function () {
    "use strict";
    return this.portraitID;
};
 
MasterObject.prototype.serializeJSON = function () {
    "use strict";
    return JSON.stringify(this);
};

MasterObject.prototype.parseObject = function (obj, bKeepID) {
    "use strict";
    if (obj.hasOwnProperty('id') && bKeepID === undefined) {
        this.id = obj.id;
    }
    if (obj.hasOwnProperty('name') && bKeepID === undefined) {
        this.name = obj.name;
    }
    if (obj.hasOwnProperty('portraitID') && bKeepID === undefined) {
        this.portraitID = obj.portraitID;
    }
    if (obj.hasOwnProperty('background') && bKeepID === undefined) {
        this.background = obj.background;
    }
    return this;
};

MasterObject.prototype.deserializeJSON = function (json, bKeepID) {
    "use strict";
    var obj_from_json = JSON.parse(json);
    if (Array.isArray(obj_from_json)) {
        obj_from_json = obj_from_json[1];
    }
    return this.parseObject(obj_from_json, bKeepID);
};

// Public Domain/MIT
MasterObject.generateUUID = function () {
    "use strict";
    var d = new Date().getTime();
    if (typeof performance !== 'undefined' && typeof performance.now === 'function') {
        d += performance.now(); //use high-precision timer if available
    }
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = (d + Math.random() * 16) % 16 | 0;
        d = Math.floor(d / 16);
        return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
};

MasterObject.isSerializedObjectAnCollectable = function (subObj) {
    "use strict";
    return subObj.hasOwnProperty('weight') || subObj.hasOwnProperty('size');
};

MasterObject.isSerializedObjectAnEmbodiment = function (subObj) {
    "use strict";
    return subObj.hasOwnProperty('inventories');
    
};
