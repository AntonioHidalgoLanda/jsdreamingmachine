/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */



/* global Actionable */

// update (Act) (delete,=,*,+,-,/,concat)
//
// Important test case
// x.feature1 = y.feature2 + z.feature3 * w.feature4;
//
// Test we run the main arithmetic and then its composition,
//  or all the arithmetic modifiers without order

ModifierField.prototype = new ModifierActionable();
ModifierField.prototype.constructor = ModifierField;

function ModifierField() {
    this.components = [];   // List<ModifierFieldComponent>
    this.operator = '+';
    this.targetFieldName = "";
    this.result = null;
    var that=this;

    function ModifierFieldComponent () {
        
        this.asign = function(roleName, target) {
            throw new Error("Abstract method!");
        };
        
        this.run = function() {
            throw new Error("Abstract method!");
        };
    }
    
        
    ModifierFieldComponentLiteral.prototype = new ModifierFieldComponent();
    ModifierFieldComponentLiteral.prototype.constructor = ModifierFieldComponentLiteral;
    
    function ModifierFieldComponentLiteral (literal) {
        this.constant = literal;
        
        this.asign = function(roleName, target) {
        };
        
        this.run = function() {
            return this.literal;
        };
    }
    
    ModifierFieldComponentRole.prototype = new ModifierFieldComponent();
    ModifierFieldComponentRole.prototype.constructor = ModifierFieldComponentRole;
    
    function ModifierFieldComponentRole (roleName,fieldName) {
        this.roleName = roleName;
        this.fieldName = fieldName;
        this.target = null;
        
        this.asign = function(roleName, target) {
            if (this.targetRoleName === roleName && target instanceof Actionable ){
                this.target = target;
            }
        };
        
        this.run = function() {
            return this.target.getFeature(fieldName);
        };
    }
    
    ModifierFieldComponentModifierField.prototype =
            new ModifierFieldComponent();
    ModifierFieldComponentModifierField.prototype.constructor =
            ModifierFieldComponentModifierField;
    
    function ModifierFieldComponentModifierField (modifier) {
        this.modifier = modifier;
        
        this.asign = function(roleName, target) {
            this.modifier.asign(roleName, target);
        };
        
        this.run = function() {
            this.modifier.run();
            return this.modifier.result;
        };
    }
    
    function _runOperation(value){
        switch(that.operator){
            case '+':
                that.result += value;
                break;
            case '-':
                that.result -= value;
                break;
            case '*':
                that.result *= value;
                break;
            case '/':
                that.result /= value;
                break;
            case '%':
                that.result %= value;
                break;
            case '.':
                that.result.concat(value);
                break;
        }
        return that.result;
    };
}

ModifierField.prototype.setTargetFieldName = function (fieldName) {
    this.targetFieldName = fieldName;
    return this;
};

ModifierField.prototype.pushLiteral = function (literal) {
    this.components.push(new ModifierFieldComponentLiteral(literal));
    return this;
};

ModifierField.prototype.pushRole = function (roleName,fieldName) {
    this.components.push(new ModifierFieldComponentRole(roleName,fieldName));
    return this;
};

ModifierField.prototype.pushModifier = function (modifier) {
    if (modifier instanceof ModifierField){
        this.components.push(new ModifierFieldComponentModifierField(modifier));
    }
    return this;
};

ModifierField.prototype.asign = function (roleName, target) {
    if (this.targetRoleName === roleName && target instanceof Actionable ){
        this.target = target;
    }
    for (var idx in this.components){
        var component = this.components[idx];
        component.asign(roleName, target);
    }
    return this;
};

ModifierField.prototype.run = function () {
    this.result = null;
    if (this.operator === 'delete'){
        if (this.target !== null &&
                this.target instanceof Actionable &&
                this.targetFieldName !== ""){
            this.target.deleteFeature(this.targetFieldName);
        }
    }
    else{
        for(var idx in this.components){
            var component = this.components[idx];
            if (this.result === null){
                this.result = component.run();
            }
            else {
                this.result = _runOperation(component.run());
            }
        }
        if (this.target !== null &&
                this.target instanceof Actionable &&
                this.targetFieldName !== ""){
            this.target.setFeature(this.targetFieldName);
        }
    }
};

