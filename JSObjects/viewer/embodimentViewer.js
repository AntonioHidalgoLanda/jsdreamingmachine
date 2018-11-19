/*global jQuery, document, Embodiment, Inventory*/

function EmbodimentViewer(divRootRef) {
    "use strict";
    this.HEADER_DIV_CLASS = "visualization-header";
    this.BODY_DIV_CLASS = "visualization-body";
    this.BACK_DIV_CLASS = "visualization-back";
    this.SEC1_DIV_CLASS = "visualization-sec1";
    this.SEC2_DIV_CLASS = "visualization-sec2";
    this.stack = [];
    this.divRootRef = divRootRef;
    this.divRoot = jQuery("#" + this.divRootRef)[0];
    this.divHeader = jQuery("#" + this.divRootRef + " ." + this.HEADER_DIV_CLASS)[0];
    this.divBody = jQuery("#" + this.divRootRef + " ." + this.BODY_DIV_CLASS)[0];
    this.divBack = jQuery("#" + this.divRootRef + " ." + this.BACK_DIV_CLASS)[0];
    this.divSection1 = jQuery("#" + this.divRootRef + " ." + this.BODY_DIV_CLASS + " ." + this.SEC1_DIV_CLASS)[0];
    this.divSection2 = jQuery("#" + this.divRootRef + " ." + this.BODY_DIV_CLASS + " ." + this.SEC2_DIV_CLASS)[0];
    this.checkHTMLStruct();
}

var handlerPopIntoViewer = function (that) {
    "use strict";
    return function () {
        that.pop();
    };
};

EmbodimentViewer.prototype.checkHTMLStruct = function () {
    "use strict";
    var div, button;
    if (this.divRoot !== undefined) {
        if (this.stack.length > 1) {
            if (this.divBack === undefined) {
                div = document.createElement('div');
                div.className = this.BACK_DIV_CLASS;
                this.divRoot.append(div);
                this.divBack = div;
            }
            this.divBack.innerHTML = "";
            button = document.createElement('button');
            button.textContent = "back";
            button.onclick = handlerPopIntoViewer(this);
            this.divBack.appendChild(button);
        } else {
            if (this.divBack !== undefined) {
                this.divBack.innerHTML = "";
            }
        }
        if (this.divHeader === undefined || this.divBody === undefined) {
            div = document.createElement('div');
            div.className = this.HEADER_DIV_CLASS;
            this.divRoot.append(div);
            this.divHeader = div;
            div = document.createElement('div');
            div.className = this.BODY_DIV_CLASS;
            this.divRoot.append(div);
            this.divBody = div;
        }
        if (this.divSection1 === undefined || this.divSection2 === undefined) {
            div = document.createElement('div');
            div.className = this.SEC1_DIV_CLASS;
            this.divBody.append(div);
            this.divSection1 = div;
            div = document.createElement('div');
            div.className = this.SEC2_DIV_CLASS;
            this.divBody.append(div);
            this.divSection2 = div;
        }
    }
};

EmbodimentViewer.prototype.updatedivRootRef = function (divRootRef) {
    "use strict";
    this.divRootRef = divRootRef;
    this.divRoot = jQuery("#" + this.divRootRef);
    this.divHeader = jQuery("#" + this.divRootRef + " ." + this.HEADER_DIV_CLASS)[0];
    this.divBody = jQuery("#" + this.divRootRef + " ." + this.BODY_DIV_CLASS)[0];
    this.divBack = jQuery("#" + this.divRootRef + " ." + this.BACK_DIV_CLASS)[0];
    this.divSection1 = jQuery("#" + this.divRootRef + " ." + this.BODY_DIV_CLASS + " ." + this.SEC1_DIV_CLASS)[0];
    this.divSection2 = jQuery("#" + this.divRootRef + " ." + this.BODY_DIV_CLASS + " ." + this.SEC2_DIV_CLASS)[0];
    this.checkHTMLStruct();
    return this;
};

EmbodimentViewer.prototype.push = function (embodiment) {
    "use strict";
    this.stack.push(embodiment);
    this.show();
};

EmbodimentViewer.prototype.pop = function () {
    "use strict";
    this.stack.pop();
    this.show();
};

EmbodimentViewer.prototype.current = function () {
    "use strict";
    if (this.stack.length > 0) {
        return this.stack[this.stack.length - 1];
    } else {
        return null;
    }
};

// Only valid for Embodiment and Collectables, not for normal Actionables
EmbodimentViewer.prototype.showEmbodimentHeader = function () {
    "use strict";
    var innerHTML = "", current;
    current = this.current();
    if (current === null) {
        this.divHeader.innerHTML = "";
        return this;
    }
    if (current instanceof Inventory) {
        innerHTML += "weight: " + current.totalWeight + "/" + current.maxWeight + "</br>" + "size: " + current.totalSize + "/" + current.maxSize + "</br>";
    }
    
    if (current instanceof Embodiment) {
        innerHTML += "name: " + current.getName() + "</br>" + "description: " + current.getDescription() + "</br>" + "PortraitID: " + current.getPortraitID() + "</br>";
    }
    
    if (current.hasOwnProperty('weight')) {
        innerHTML += "weight: " + current.getWeight() + "</br>";
    }
    if (current.hasOwnProperty('size')) {
        innerHTML += "size: " + current.getSize() + "</br>";
    }
    this.divHeader.innerHTML = innerHTML;
    return this;
};

EmbodimentViewer.prototype.showFeatures = function () {
    "use strict";
    var current, fName, table, tbdy, tr, td;
    current = this.current();
    if (current === null || current === undefined || !current.hasOwnProperty("features")) {
        this.divSection1.innerHTML = "";
        return this;
    }
    table = document.createElement('table');
    table.className = "features";
    tbdy = document.createElement('tbody');
    
    for (fName in current.features) {
        if (current.features.hasOwnProperty(fName)) {
            tr = document.createElement('tr');
            td = document.createElement('td');
            td.appendChild(document.createTextNode(fName));
            tr.appendChild(td);
            td = document.createElement('td');
            td.appendChild(document.createTextNode(current.getFeature(fName)));
            tr.appendChild(td);
            tbdy.appendChild(tr);
        }
    }
    table.appendChild(tbdy);
    this.divSection1.appendChild(table);
    return this;
};

EmbodimentViewer.prototype.showInventoryHeadInline = function (inventory) {
    "use strict";
    var innerHTML = "";
    if (inventory.getMaxSize() > 0) {
        innerHTML += "size (" + inventory.getTotalSize() + "/" + inventory.getMaxSize() + ")";
    }
    if (inventory.getMaxWeight() > 0) {
        innerHTML += "weight (" + inventory.getTotalWeight() + "/" + inventory.getMaxWeight() + ")";
    }
    return innerHTML;
};


// the use of a function inside of a function is to allos to pass local variables through the function stack.
var handlerPushIntoViewer = function (that, embodiment) {
    "use strict";
    return function () {
        that.push(embodiment);
    };
};

EmbodimentViewer.prototype.showInventories = function () {
    "use strict";
    var current, table, tbdy, tr, td, inventoryName, inventory, inventories, button;
    current = this.current();
    this.divSection2.innerHTML = "";
    if (current === null || current === undefined || !current.hasOwnProperty("inventories")) {
        return this;
    }
    inventories = current.inventories;
    table = document.createElement('table');
    table.className = "inventories";
    tbdy = document.createElement('tbody');
    for (inventoryName in inventories) {
        if (inventories.hasOwnProperty(inventoryName)) {
            inventory = current.getInventory(inventoryName);
            tr = document.createElement('tr');
            td = document.createElement('td');
            td.appendChild(document.createTextNode(inventoryName + " " + this.showInventoryHeadInline(inventory)));
            tr.appendChild(td);
            td = document.createElement('td');
            button = document.createElement('button');
            button.textContent = "open";
            button.onclick = handlerPushIntoViewer(this, inventory);
            td.appendChild(button);
            tr.appendChild(td);
            tbdy.appendChild(tr);
        }
    }
    table.appendChild(tbdy);
    this.divSection2.appendChild(table);
    return this;
};

// TODO, work with an additional section instead
EmbodimentViewer.prototype.showInventoryItems = function () {
    "use strict";
    var current, table, tbdy, tr, td, collectable, collectables, button, i;
    current = this.current();
    if (!(current instanceof Inventory)) {
        return this;
    }
    this.divSection2.innerHTML = "";
    collectables = current.collectables;
    console.log("Show inventory Items");
    console.log(current);
    console.log(collectables);
    table = document.createElement('table');
    table.className = "collectables";
    tbdy = document.createElement('tbody');
    for (i in collectables) {
        if (collectables.hasOwnProperty(i)) {
            collectable = collectables[i];
            tr = document.createElement('tr');
            td = document.createElement('td');
            td.appendChild(document.createTextNode(collectable.name + " (" + collectable.weight + "w/" + collectable.size + "s)")); //TODO - Visualize Collectable Header
            tr.appendChild(td);
            td = document.createElement('td');
            button = document.createElement('button');
            button.textContent = "open";
            button.onclick = handlerPushIntoViewer(this, collectable);
            td.appendChild(button);
            tr.appendChild(td);
            tbdy.appendChild(tr);
        }
    }
    table.appendChild(tbdy);
    this.divSection2.appendChild(table);
    return this;
};

EmbodimentViewer.prototype.show = function () {
    "use strict";
    this.checkHTMLStruct();
    this.showEmbodimentHeader();
    this.showFeatures();
    this.showInventories();
    this.showInventoryItems();
    
    return this;
};
