/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var c1 = new Collectable ('box 1','testing box', 8,0.2,'tileGrass','isoBox1');
var c2 = new Collectable ('box 2','testing box',10,0.1,'tileGrass','isoBox1');
var c3 = new Collectable ('box 3','testing box',1,0.5,'tileGrass','isoBox1');

console.log('### Inventory ###');
var inv = new Inventory (100,0.5);
console.log(JSON.stringify(inv));

console.log('Total Weight '+inv.getTotalWeight());
console.log('Total Size '+inv.getTotalSize());
console.log('Max Weight '+inv.getMaxWeight());
console.log('Max Size '+inv.getMaxSize());


console.log('# Change Max Weight #');
inv.setMaxWeight(17);
console.log(JSON.stringify(inv));
console.log('Max Weight '+inv.getMaxWeight());

console.log('# Add item 1 (should go in) #');
console.log('Fits in? '+ inv.fitsIn(c1));
inv.push (c1);
console.log(JSON.stringify(inv));
console.log('Total Weight '+inv.getTotalWeight());
console.log('Total Size '+inv.getTotalSize());

console.log('# Add item 1 again (should not go in) #');
console.log('Fits in? '+ inv.fitsIn(c1));
inv.push (c1);
console.log(JSON.stringify(inv));
console.log('Total Weight '+inv.getTotalWeight());
console.log('Total Size '+inv.getTotalSize());

console.log('# Add item 2 (should not go in because the weigth) #');
console.log('Fits in? '+ inv.fitsIn(c2));
inv.push (c2);
console.log(JSON.stringify(inv));
console.log('Total Weight '+inv.getTotalWeight());
console.log('Total Size '+inv.getTotalSize());

console.log('# Add item 3 (should not go in bacause the size) #');
console.log('Fits in? '+ inv.fitsIn(c3));
inv.push (c3);
console.log(JSON.stringify(inv));
console.log('Total Weight '+inv.getTotalWeight());
console.log('Total Size '+inv.getTotalSize());



console.log('# Change MaxSize Invalid #');
inv.setMaxSize(0.05);
console.log(JSON.stringify(inv));
console.log('Max Size '+inv.getMaxSize());

console.log('# Change setMaxWeight Invalid #');
inv.setMaxWeight(0.01);
console.log(JSON.stringify(inv));
console.log('Max Weight '+inv.getMaxWeight());

console.log('# Change MaxSize #');
inv.setMaxSize (2);
console.log(JSON.stringify(inv));
console.log('Total Weight '+inv.getTotalWeight());
console.log('Total Size '+inv.getTotalSize());
console.log('Max Weight '+inv.getMaxWeight());
console.log('Max Size '+inv.getMaxSize());

console.log('# Add item 3 (should go in) #');
console.log('Fits in? '+ inv.fitsIn(c3));
inv.push (c3);
console.log(JSON.stringify(inv));
console.log('Total Weight '+inv.getTotalWeight());
console.log('Total Size '+inv.getTotalSize());

console.log('# Remove item 1 (should go out) #');
inv.remove(c1);
console.log(JSON.stringify(inv));
console.log('Total Weight '+inv.getTotalWeight());
console.log('Total Size '+inv.getTotalSize());

console.log('# Remove item 1 (nothing happens) #');
inv.remove(c1);
console.log(JSON.stringify(inv));
console.log('Total Weight '+inv.getTotalWeight());
console.log('Total Size '+inv.getTotalSize());




console.log('# Remove all #');
inv.clear();
inv.remove(c1);
console.log(JSON.stringify(inv));
console.log('Total Weight '+inv.getTotalWeight());
console.log('Total Size '+inv.getTotalSize());






