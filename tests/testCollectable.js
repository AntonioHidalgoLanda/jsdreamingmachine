/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

console.log('### Collectable ###');
var co = new Collectable ('box','testing box',10,0.5,'tileGrass','isoBox1');
console.log(co.id);
console.log(co.name);
console.log(co.size);
console.log(co.weight);
console.log(co.graphicID);
console.log(co.portraitID);
console.log(co.description);

console.log(co.getSize());

co.setSize(7);
console.log(co);

console.log(co.getWeight());

co.setWeight(0.75);
console.log(co);

console.log(co.getName ());

co.setName('test box');
console.log(co);

co.setDescription ('description');
console.log(co);

co.setGraphicID ('graphicID');
console.log(co);

co.setPortraitID ('portraitID');
console.log(co);


console.log(co.getDescription ());

console.log(co.getGraphicID ());

console.log(co.getPortraitID ());

co.setID ('test id');
console.log(co);

console.log(co.getID ());

co.setFeature ('feature', 'value');
console.log(co);

console.log(co.getFeature ('feature'));

console.log(co.getFeature ('featureWithTypo') );


