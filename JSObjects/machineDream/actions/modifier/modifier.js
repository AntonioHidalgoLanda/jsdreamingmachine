/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function Modifier () {
    if (this.constructor === Modifier) {
      throw new Error("Can't instantiate abstract class!");
    }
}


Modifier.prototype.asign = function(roleName,target) {
    throw new Error("Abstract method!");
};


Modifier.prototype.run = function() {
    throw new Error("Abstract method!");
};

// ContainerActionable
// EmbodimentInvonteory
// move c-a/ e?
// remove c-a/ e-i?
// create c-a/ e-i?
// update (Act) (delete,=,*,+,-,/,concat)
// move scenario