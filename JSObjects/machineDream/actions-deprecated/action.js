/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


function Action () {
    
    this.roles = {};    // Map<string-roleName,asignee:null}>
    this.filters = [];  // ActionRoleBind
    this.modfiers = []; // ActionRoleBind
    
    var that = this;

    function ActionRoleBind (target) {
        this.target = target;
        this.roles = {};
        
        this.addBinding = function(roleName, targetRoleName) {
            this.roles[targetRoleName]=roleName;
            return this;
        };
        
        this.isSameTarget = function(target) {
            return (this.target === target);
        };

        this.isBond = function(roleName) {
            var hasValue = false;
            for (var idx in this.roles){
                hasValue |= (this.roles[idx] === roleName);
            }
            return hasValue;
        };

    }
    
    _asignAllFilters = function() {
        for(var idx in that.filters){
            var target = that.filters[idx].target;
            for(var fRName in that.filters[idx].roles){
                var rName = that.filters[idx].roles[fRName];
                target.asign(fRName,that.roles[rName]);
            }
        }
    };

    _asignAllModfiers = function() {
        for(var idx in that.modfiers){
            var target = that.modfiers[idx].target;
            for(var fRName in that.modfiers[idx].roles){
                var rName = this.modfiers[idx].roles[fRName];
                target.asign(fRName,that.roles[rName]);
            }
        }
    };
    
    _clearAllFilters = function() {
        for(var idx in that.filters){
            var target = that.filters[idx].target;
            target.clearAsign();
        }
    };
    
    _clearAllModfiers = function() {
        for(var idx in that.modfiers){
            var target = that.modfiers[idx].target;
            target.clearAsign();
        }
    };

    
}

Action.prototype.addRole = function(roleName) {
    if (!this.roles.hasOwnProperty(roleName)){
        this.roles[roleName]  = null;
    }
    return this;
};

Action.prototype.bindFilter = function(roleName, filterRoleName, filter) {
    var actionRoleBind = null;
    for(var idx in this.filters){
        if (this.filters[idx].isSameTarget(filter)){
            actionRoleBind = this.filters[idx];
            break;
        }
    }
    if (actionRoleBind === null){
        actionRoleBind = new ActionRoleBind(filter);
    }
    actionRoleBind.addBinding(roleName,filterRoleName);
    return this;
};

Action.prototype.bindModifier = function(roleName, modifierRoleName, modifier) {
    var actionRoleBind = null;
    for(var idx in this.modfiers){
        if (this.modfiers[idx].isSameTarget(modifier)){
            actionRoleBind = this.modfiers[idx];
            break;
        }
    }
    if (actionRoleBind === null){
        actionRoleBind = new ActionRoleBind(modifier);
    }
    actionRoleBind.addBinding(roleName,modifierRoleName);
    return this;
};

Action.prototype.asign = function(roleName, asignee) {
    this.roles[roleName]  = asignee;
    return this;
};

Action.prototype.clearAsign = function() {
    for (var roleName in this.roles){
        this.roles[roleName] = null;
    }
    return this;
};

/**
 * PROTOTYPE FUNCTION. Warining this is an A* DFS algorithm with no prones
 * @param {type} roleIndex
 * @param {type} rolesArray
 * @param {type} action
 * @param {type} collection
 * @param {type} result
 * @param {type} resultCollection
 * @returns {unresolved}
 */
function recursiveFindElegibles(roleIndex,rolesArray,action,collection,result,resultCollection){
    if (roleIndex >= rolesArray.length){
        if (action.isElegible()){
            // TODO, find a better way to copy the objects
            var resultCopy = {};
            for (var i in result){
                resultCopy[i] = result[i];
            }
            resultCollection.push(resultCopy);
        }
        action.clearAsign();
    }
    else {
        var roleName = rolesArray[roleIndex];
        for (var targetIdx in collection){
            var target = collection[targetIdx];
            result[roleName] = target;
            action.asign(roleName,target);
            resultCollection= recursiveFindElegibles(roleIndex + 1,rolesArray,action,collection,result,resultCollection);
        }
    }
    return resultCollection;
}

Action.prototype.getElegibles = function(collection) {
    var resultCollection = [];
    var result = {};
    var rolesArray = [];
    for (var roleName in this.roles){
        if (this.roles[roleName] !== null){
            rolesArray.push(this.roles[roleName]);
        }
    }
    
    resultCollection = recursiveFindElegibles(0,rolesArray,this,collection,result,resultCollection);

    return resultCollection;
};


Action.prototype.isElegible = function() {
    var isElegible = true;
    _asignAllFilters();
    for(var idx in this.filters){
        var target = this.filters[idx].target;
        isElegible &= target.isElegible();
    }
    _clearAllFilters();
    return isElegible;
};

Action.prototype.run = function() {
    if (this.isElegible()){
        _asignAllModfiers();
        for(var idx in this.modfiers){
            var target = this.modfiers[idx].target;
            target.run();
        }
        _clearAllModfiers();
    }
    return this;
};
