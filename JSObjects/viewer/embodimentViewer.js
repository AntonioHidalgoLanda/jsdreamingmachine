
embodimentViewer = new Object();
embodimentViewer.stack = [];
embodimentViewer.initialize = function (embodiment){
    this.stack.length = 0;
    this.stack.push(embodiment);
};
embodimentViewer.current= function (){
    if (this.stack.length > 0)
        return this.stack[this.stack.length-1];
    else
        return null;
};
embodimentViewer.showEmbodimentHeader = function (){
    // Only valid for Embodiment, not for normal Actionables or Collectables
    var innerHTML = "";
    innerHTML+="name: "+this.current().getName() +"</br>"
    + "description: "+this.current().getDescription()+"</br>"
    + "PortraitID: "+this.current().getPortraitID()+"</br>";
    return innerHTML;
};

embodimentViewer.showFeatures = function (){
    var innerHTML = "";
    if (this.current() === null) return "";
    innerHTML += "<table class=\"features\">";
    for (var fName in this.current().features){
        innerHTML += "<tr>";
        innerHTML += "<td>"+fName+"</td><td>"+this.current().getFeature(fName)+"</td>";
        innerHTML += "</tr>";
    }
    innerHTML += "</table>";
    return innerHTML;
};

embodimentViewer.showInventoryHeadInline = function (inventory){
    var innerHTML = "";
    if (inventory.getMaxSize()>0){
        innerHTML += "size ("+inventory.getTotalSize()+"/"+inventory.getMaxSize()+")"
    }
    if (inventory.getMaxWeight()>0){
        innerHTML += "weight ("+inventory.getTotalWeight()+"/"+inventory.getMaxWeight()+")"
    }
    return innerHTML;  
};


embodimentViewer.showInventories = function (){
    var innerHTML = "";
    for (var inventoryName in this.current().inventories){
        var inventory = this.current().getInventory(inventoryName);
        innerHTML+= inventoryName + " " + this.showInventoryHeadInline(inventory) + "<button onclick=\"javascript:alert('on development');\">open</button></br>";
    };
    return innerHTML;
};

embodimentViewer.show = function (){
    return "<div >" + this.showEmbodimentHeader()
        + "</div><div>" + this.showFeatures()
        + "</div><div>" + this.showInventories() + "</div>";
};
