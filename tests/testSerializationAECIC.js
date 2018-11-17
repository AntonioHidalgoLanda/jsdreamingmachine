/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

// 
console.log('### Collectable Serialization###');
//name,description,weight,size,portraitID,graphicID
var c1 = new Collectable ('item1','testing item #1',1.5,10,'tileGrass','tileGrass');
c1.setFeature ('strength', 3);
c1.setFeature ('durability', "100%");
console.log('Collectable 1 Serialization:');
console.log(c1.serializeJSON());

var c2 = new Collectable ('item2','testing item 2',2,25,'isoBox1','isoBox1');
c2.setFeature ('strength', "2.5");
console.log('Collectable 2 Serialization:');
console.log(c2.serializeJSON());

console.log('### Embodiment Serialization###');
var em = new Embodiment ('box','testing box','tileGrass','isoBox1');

em.setFeature ('strength', 5);
em.setFeature ('perception', '4');
em.setFeature ('status', 'normal');

em.createInventory("bag1",50,100);
em.createInventory("bag2",25,150);

em.getInventory("bag1").push(c1);
em.getInventory("bag1").push(c2);

console.log('Embodiment Serialization:');
console.log(em.serializeJSON());

// Deseralization
var em2 = new Embodiment ('','','','');
em2.deserializeJSON('{"id":"a6dab93d-114e-4c78-806b-dfb8dd0a786f","features":{"strength":5,"perception":"4","status":"normal"},"name":"box","description":"testing box","graphicID":"isoBox1","portraitID":"tileGrass","inventories":{"bag1":{"maxWeight":50,"maxSize":100,"totalWeight":3.5,"totalSize":35},"bag2":{"maxWeight":25,"maxSize":150,"totalWeight":0,"totalSize":0}}}');
console.log('Embodiment Deserialization:');
console.log(em2);



