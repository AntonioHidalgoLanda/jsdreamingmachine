/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


var currentActionable = new Actionable();

function serialize(){
    prompt("You can save the following JSON:",currentActionable.serializeJSON());
}

function addNew(){
    document.getElementById("forn-id").value =  '';
    document.getElementById("form-img").src =   '';
    document.getElementById("form-b64").value = '';
    // TODO Select display
}

function save(){
    var id = document.getElementById("forn-id").value;
    var uri = document.getElementById("form-b64").value;
    refreshTable();
}

function createTextInput(form, id , value){
    var span = document.createElement("span");
    var div = document.createElement("div");
    var input = document.createElement("input");
    
    span.innerHTML = id;
    
    input.type = "text";
    input.id = "Embodiment-Builder-Form-"+id;
    input.value = value;
    
    div.appendChild(span);
    div.appendChild(input);    
    form.appendChild(div);
}

function refreshFeatureDivPush(div){
    var divPush = document.createElement("div");
    var inputPushName = document.createElement("input");
    var inputPushValue = document.createElement("input");
    var submitPush = document.createElement("input");
    
    submitPush.type = "button";
    submitPush.value = "update feature";
    submitPush.onclick = pushFeature;
    divPush.appendChild(submitPush);
    
    inputPushName.id = "Embodiment-Builder-Form-Feature-name";
    divPush.appendChild(inputPushName);
    inputPushValue.id = "Embodiment-Builder-Form-Feature-value";
    divPush.appendChild(inputPushValue);
    div.appendChild(divPush);
    
}

function refreshFeatureDiv(){
    var title = document.createElement("h3");
    var div = document.getElementById("Embodiment-Builder-Form-Feature");
    if (div === null){
        var form = document.getElementById("Embodiment-Builder-Form");
        div = document.createElement("div");
        div.id = "Embodiment-Builder-Form-Feature";
        form.appendChild(div);
    }
    div.innerHTML = "";
    title.innerHTML = "Features";
    div.appendChild(title);
    refreshFeatureDivPush(div);
    
    for (var name in currentActionable.features){
        var divFeature = document.createElement("div");
        divFeature.innerHTML = "<div><span></span>"+name+"<span>"+currentActionable
                .getFeature(name)+"</span></div>";
        div.appendChild(divFeature);
    }
}

function pushFeature(){
    var name = document.getElementById("Embodiment-Builder-Form-Feature-name");
    var value = document.getElementById("Embodiment-Builder-Form-Feature-value");
    if (name !== null && value !== null){
        if (name.value !== ""){
            currentActionable.setFeature(name.value,value.value);
            refreshFeatureDiv();
        }
    }
}

function newEmbodiment(){
    
    var embodiment = new Embodiment('','','','');
    var form = document.getElementById("Embodiment-Builder-Form");
    var pId = document.createElement("p");
    currentActionable = embodiment;
    form.innerHTML = "";
    pId.innerHTML = "ID: "+embodiment.getID();
    form.appendChild(pId);
    createTextInput(form,"name",embodiment.getName());
    createTextInput(form,"description",embodiment.getDescription());
    
    refreshFeatureDiv();
}

function newCollectable(){
var collectable = new Collectable('','',10,1,'','');

    var form = document.getElementById("Embodiment-Builder-Form");
    var pId = document.createElement("p");
    currentActionable = collectable;
    form.innerHTML = "";
    pId.innerHTML = "ID: "+collectable.getID();
    form.appendChild(pId);
    createTextInput(form,"name",collectable.getName());
    createTextInput(form,"description",collectable.getDescription());
    createTextInput(form,"weight",collectable.getWeight());// needs to be numeric
    createTextInput(form,"size",collectable.getSize());// needs to be numeric
    
    refreshFeatureDiv();
    
}

function addInventory(){
    
}

