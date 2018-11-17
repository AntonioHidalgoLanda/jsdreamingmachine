/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


console.log('### Embodiment ###');
var em = new Embodiment ('box','testing box','tileGrass','isoBox1');
console.log(em);

em.setName('test box');
console.log(em);

em.setDescription ('description');
console.log(em);

em.setGraphicID ('graphicID');
console.log(em);

em.setPortraitID ('portraitID');
console.log(em);

console.log(em.getName ());

console.log(em.getDescription ());

console.log(em.getGraphicID ());

console.log(em.getPortraitID ());

em.setID ('test id');
console.log(em);

console.log(em.getID ());

em.setFeature ('feature', 'value');
console.log(em);

console.log(em.getFeature ('feature'));

console.log(em.getFeature ('featureWithTypo') );


