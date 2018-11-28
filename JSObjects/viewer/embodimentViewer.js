/*global jQuery, document, Embodiment, Inventory, Container, ExecutorHandler*/
/*global actionCatalog*/

function EmbodimentViewer(divRootRef) {
    "use strict";
    this.stack = [];
    this.executerHandler = undefined;
    this.action = undefined;
    this.divRootRef = divRootRef;
    this.divRoot = jQuery("#" + this.divRootRef)[0];
    this.divHeader = jQuery("#" + this.divRootRef + " ." + EmbodimentViewer.HEADER_DIV_CLASS)[0];
    this.divBody = jQuery("#" + this.divRootRef + " ." + EmbodimentViewer.BODY_DIV_CLASS)[0];
    this.divActions = jQuery("#" + this.divRootRef + " ." + EmbodimentViewer.ACTIONS_DIV_CLASS)[0];
    this.divBack = jQuery("#" + this.divRootRef + " ." + EmbodimentViewer.BACK_DIV_CLASS)[0];
    this.divSection1 = jQuery("#" + this.divRootRef + " ." + EmbodimentViewer.BODY_DIV_CLASS + " ." + EmbodimentViewer.SEC1_DIV_CLASS)[0];
    this.divSection2 = jQuery("#" + this.divRootRef + " ." + EmbodimentViewer.BODY_DIV_CLASS + " ." + EmbodimentViewer.SEC2_DIV_CLASS)[0];
    this.checkHTMLStruct();
}

EmbodimentViewer.HEADER_DIV_CLASS = "visualization-header";
EmbodimentViewer.BODY_DIV_CLASS = "visualization-body";
EmbodimentViewer.BACK_DIV_CLASS = "visualization-back";
EmbodimentViewer.SEC1_DIV_CLASS = "visualization-sec1";
EmbodimentViewer.SEC2_DIV_CLASS = "visualization-sec2";
EmbodimentViewer.ACTIONS_DIV_CLASS = "visualization-actions";


var handlerPopIntoViewer = function (that) {
    "use strict";
    return function () {
        that.pop();
    };
};

EmbodimentViewer.prototype.setExecutorHandler = function (handler) {
    "use strict";
    this.executerHandler = handler;
    return this;
};

EmbodimentViewer.prototype.checkHTMLStruct = function () {
    "use strict";
    var div, button;
    if (this.divRoot !== undefined) {
        if (this.stack.length > 1) {
            if (this.divBack === undefined) {
                div = document.createElement('div');
                div.className = EmbodimentViewer.BACK_DIV_CLASS;
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
        if (this.divHeader === undefined || this.divBody === undefined || this.divActions === undefined) {
            div = document.createElement('div');
            div.className = EmbodimentViewer.HEADER_DIV_CLASS;
            this.divRoot.append(div);
            this.divHeader = div;
            div = document.createElement('div');
            div.className = EmbodimentViewer.BODY_DIV_CLASS;
            this.divRoot.append(div);
            this.divBody = div;
            div = document.createElement('div');
            div.className = EmbodimentViewer.ACTIONS_DIV_CLASS;
            this.divRoot.append(div);
            this.divActions = div;
        }
        if (this.divSection1 === undefined || this.divSection2 === undefined) {
            div = document.createElement('div');
            div.className = EmbodimentViewer.SEC1_DIV_CLASS;
            this.divBody.append(div);
            this.divSection1 = div;
            div = document.createElement('div');
            div.className = EmbodimentViewer.SEC2_DIV_CLASS;
            this.divBody.append(div);
            this.divSection2 = div;
        }
    }
};

EmbodimentViewer.prototype.updatedivRootRef = function (divRootRef) {
    "use strict";
    this.divRootRef = divRootRef;
    this.divRoot = jQuery("#" + this.divRootRef);
    this.divHeader = jQuery("#" + this.divRootRef + " ." + EmbodimentViewer.HEADER_DIV_CLASS)[0];
    this.divBody = jQuery("#" + this.divRootRef + " ." + EmbodimentViewer.BODY_DIV_CLASS)[0];
    this.divActions = jQuery("#" + this.divRootRef + " ." + EmbodimentViewer.ACTIONS_DIV_CLASS)[0];
    this.divBack = jQuery("#" + this.divRootRef + " ." + EmbodimentViewer.BACK_DIV_CLASS)[0];
    this.divSection1 = jQuery("#" + this.divRootRef + " ." + EmbodimentViewer.BODY_DIV_CLASS + " ." + EmbodimentViewer.SEC1_DIV_CLASS)[0];
    this.divSection2 = jQuery("#" + this.divRootRef + " ." + EmbodimentViewer.BODY_DIV_CLASS + " ." + EmbodimentViewer.SEC2_DIV_CLASS)[0];
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

EmbodimentViewer.prototype.showInventoryItemHeader = function (item) {
    "use strict";
    return item.name;
};

// TODO, work with an additional section instead
EmbodimentViewer.prototype.showInventoryItems = function () {
    "use strict";
    var current, table, tbdy, tr, td, collectable, collectables, button, i;
    current = this.current();
    if (!(current instanceof Container)) {
        return this;
    }
    this.divSection2.innerHTML = "";
    collectables = current.collectables;
    table = document.createElement('table');
    table.className = "collectables";
    tbdy = document.createElement('tbody');
    for (i in collectables) {
        if (collectables.hasOwnProperty(i)) {
            collectable = collectables[i];
            tr = document.createElement('tr');
            td = document.createElement('td');
            td.appendChild(document.createTextNode(this.showInventoryItemHeader(collectable)));
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

// the use of a function inside of a function is to allos to pass local variables through the function stack.
var handlerOpenAction = function (that, action) {
    "use strict";
    return function () {
        that.action = action;
        that.showActions();
    };
};

var handlerSubmitAction = function (that) {
    "use strict";
    return function () {
        if (actionCatalog.hasOwnProperty(that.action)) {
            jQuery("." + EmbodimentViewer.ACTIONS_DIV_CLASS + " :selected").each(function () {
                actionCatalog[that.action].bind(jQuery(this).data("role"), jQuery(this).data("target"));
            });
            actionCatalog[that.action].execute();
            actionCatalog[that.action].unbindAll();
        }
        that.action = undefined;
        that.show();
    };
};

var handlerSelectTarget = function (that) {
    "use strict";
    return function () {
        var current = that.current(), self, bSelected, role = this.id;
        if (that.executerHandler instanceof ExecutorHandler) {
            self = that.executerHandler.self;
        }
        if (that.action !== undefined && current !== undefined && self !== undefined && self !== current) {
            // get all the the targets
            // check if any target is current
            bSelected = false;
            jQuery("." + EmbodimentViewer.ACTIONS_DIV_CLASS + " :selected").each(function () {
                if (jQuery(this).val() === current.id) {
                    bSelected = true;
                }
            });
            // if not, check if can be selected in this taret
            if (!bSelected && actionCatalog.hasOwnProperty(that.action) && actionCatalog[that.action].canBind(role, current)) {
                this.value = current.id;
            }
        }
    };
};

EmbodimentViewer.prototype.showActionDetails = function () {
    "use strict";
    var irole, role, roles, targets, itarget, target, option, button, h1, selectList, div;
    if (this.action === undefined) {
        return this;
    }
    button = document.createElement('button');
    button.textContent = "back";
    button.onclick = handlerOpenAction(this, undefined);
    this.divActions.appendChild(button);
    h1 = document.createElement('h1');
    h1.textContent = this.action;
    this.divActions.appendChild(h1);
    
    if (actionCatalog.hasOwnProperty(this.action)) {
        roles = actionCatalog[this.action].getRoles();
        for (irole in roles) {
            if (roles.hasOwnProperty(irole)) {
                role = roles[irole];
                if (role === actionCatalog[this.action].callerRef) {
                    targets = [this.executerHandler.self];
                } else {
                    targets = this.executerHandler.getTargetsFor(this.action, role);
                }
                div = document.createElement('div');
                div.textContent = role;
                this.divActions.appendChild(div);
                
                selectList = document.createElement("select");
                selectList.id = role;
                selectList.onchange = handlerSelectTarget(this);
                div.appendChild(selectList);
                
                for (itarget in targets) {
                    if (targets.hasOwnProperty(itarget)) {
                        target = targets[itarget];
                        option = document.createElement("option");
                        option.value = target.id;
                        option.text = target.name; // this won't work for containers and inventories
                        option.id = role + "_" + target.id;
                        selectList.appendChild(option);
                        jQuery("#" + option.id).data('target', target);
                        jQuery("#" + option.id).data('role', role);
                    }
                }
            }
        }
                
        button = document.createElement('button');
        button.textContent = "submit";
        button.onclick = handlerSubmitAction(this);
        this.divActions.appendChild(button);
    }

};

EmbodimentViewer.prototype.showActionPicker = function () {
    "use strict";
    var current, actions, idx, action, button;
    current = this.current();
    if (current !== this.executerHandler.room && current !== this.executerHandler.self) {
        actions = this.executerHandler.getActions(current);
    } else {
        actions = this.executerHandler.getActions();
    }
    for (idx in actions) {
        if (actions.hasOwnProperty(idx)) {
            action = actions[idx];
            button = document.createElement('button');
            button.textContent = action;
            button.onclick = handlerOpenAction(this, action);
            this.divActions.appendChild(button);
        }
    }
    return this;
};

EmbodimentViewer.prototype.showActions = function () {
    "use strict";
    this.divActions.innerHTML = "";
    if (this.executerHandler !== undefined) {
        if (this.action !== undefined) {
            this.showActionDetails();
        } else {
            this.showActionPicker();
        }
    }
    return this;
};

EmbodimentViewer.prototype.show = function () {
    "use strict";
    this.checkHTMLStruct();
    this.showEmbodimentHeader();
    this.showFeatures();
    this.showInventories();
    this.showInventoryItems();
    this.showActions();
    
    return this;
};

