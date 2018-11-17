/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */



function ActionableDisplay (graphicMap) {
    this.graphicMap = graphicMap;
}

ActionableDisplay.prototype.setGraphicMap = function(graphicMap) {
    if (graphicMap instanceof GraphicMap){
        this.graphicMap = graphicMap;
    }
    return this;
};


ActionableDisplay.prototype.createEmbodimentDisplayMini = function(embodiment) {
    if (!(embodiment instanceof Embodiment)){
        return null;
    }
    var div = document.createElement('div');
    var title = document.createElement('div');
    var titleText = document.createTextNode(embodiment.getName());
    div.id = 'mini-' + embodiment.getID();
    div.class = 'mini-div';
    title.class = 'name';
    title.appendChild(titleText);
    div.appendChild(title);
    div.appendChild(this.graphicMap.getImage(embodiment.getPortraitID()));
    
    return div;
};

ActionableDisplay.prototype.createEmbodimentDisplayMedium = function(embodiment) {
    if (!(embodiment instanceof Embodiment)){
        return null;
    }
    var div = document.createElement('div');
    var title = document.createElement('div');
    var titleText = document.createTextNode(embodiment.getName());
    div.id = 'mini-' + embodiment.getID();
    div.class = 'mini-div';
    title.class = 'name';
    title.appendChild(titleText);
    div.appendChild(title);
    div.appendChild(this.graphicMap.getImage(embodiment.getPortraitID()));
    
    return div;
};

ActionableDisplay.prototype.createFeaturesDisplayDetails = function(embodiment) {
    var div = document.createElement('div');
    div.class = 'medium-features';
    for(var nameid in embodiment.features){
        var divFeature = document.createElement('div');
        divFeature.innerHTML = '<div class="feature-row">' +
                '<div class="feature-name cell">'+nameid+'</div>'+
                '<div>class="feature-value cell">'+embodiment.getFeature(nameid)+'</div>'+
                '</div>';
        div.appendChild(divFeature);
    }
    
    return div;
};

ActionableDisplay.prototype.createEmbodimentDisplayDetails = function(embodiment) {
    if (!(embodiment instanceof Embodiment)){
        return null;
    }
    var div = document.createElement('div');
    var divGroup = document.createElement('div');
    var title = document.createElement('h3');
    var description = document.createElement('p');
    div.id = 'medium-' + embodiment.getID();
    div.class = 'medium-div';
    title.class = 'name';
    title.innerHTML = embodiment.getName();
    description.innerHTML = embodiment.getDescription();
    div.appendChild(this.graphicMap.getImage(embodiment.getPortraitID()));
    divGroup.class = "medium-group";
    divGroup.appendChild(title);
    divGroup.appendChild(description);
    divGroup.appendChild(this.createFeaturesDisplayDetails(embodiment));
    
    return div;
};

ActionableDisplay.prototype.updateInventory = function(inventory) {
    if (!(embodiment instanceof Embodiment)){
        return null;
    }
    var div = document.createElement('div');
    div.innerHTML = "<div class=\"details-div\">" +
                    +" <div class=\"details-group\">" +
                    +" <h2 class=\"details-name\">Name</h2>" +
                    +"   <image class=\"details-img\" src=\"url(../img/logo.png)\"></image>" +
                    +"   <p class=\"details-description\">Description</p>" +
                    +"   <div class=\"details-features\">" +
                    +"     Loading" +
                    +"   </div>" +
                    +" </div>" +
                    +" <div class=\"details-group\">" +
                    +"   <div class=\"details-invetory-list\">" +
                    +"   Loading" +
                    +"  </div>" +
                    +"  <div class=\"details-invetory\">" +
                    +"  Loading" +
                    +"  </div>" +
                    +" </div>" +
                    +" </div>";
    
    return div;
};

