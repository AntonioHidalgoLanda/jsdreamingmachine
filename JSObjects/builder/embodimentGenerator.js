playerGenerator = new Object();
playerGenerator.generateName = function(){
    var names = ["Joe","John","Jean","Alex"];
    let random_number = Math.random() * (4 - 0.001);
    random_number = Math.floor(random_number);
    return names[random_number];
};

playerGenerator.generateFeature = function(embodiment){
    var names = ["money","life","energy","strength"];
    var values = ["10","100","3","level 1"];
    let random_number = Math.random() * (4 - 0.001);
    random_number = Math.floor(random_number);
    var name = names[random_number];
    random_number = Math.random() * (4 - 0.001);
    random_number = Math.floor(random_number);
    var value = values[random_number];                
    embodiment.setFeature(name, value);
}

playerGenerator.autoGenerate = function(){
    var embodiment = new Embodiment(this.generateName(),'description','portraitID','graphicID');
    embodimentViewer.initialize(embodiment);
    this.generateFeature(embodiment);
    this.generateFeature(embodiment);
    embodiment.createInventory("Belongings", 0, 20);
    embodiment.createInventory("Knowledge",1,0);
    //$("#player-generator-demo").html(embodimentViewer.show());
};