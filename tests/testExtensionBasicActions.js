/*jslint devel: true */
/* eslint-disable no-console */
/*global actionCatalog, actionableDreamerCatalog*/

/*global
console
*/
// TODO - Action Menu and Action Target Selection menu
var body = actionableDreamerCatalog.dream('prototype_basic');
var potion = actionableDreamerCatalog.dream('prototype_lifepack');
console.log("Testing Healing Action");
console.log(JSON.stringify(body));
console.log(potion);
actionCatalog.heal.bind("target", body);
actionCatalog.heal.bind("caller", potion);
actionCatalog.heal.execute();
console.log("Results Healing Action");
console.log(JSON.stringify(body));
console.log(potion);

body.setFeature('energy', 20);
potion = actionableDreamerCatalog.dream('prototype_energypack');
console.log("Testing Restoring Action");
console.log(JSON.stringify(body));
console.log(potion);
actionCatalog.restore.bind("target", body);
actionCatalog.restore.bind("caller", potion);
actionCatalog.restore.execute();
console.log("Results Restoring Action");
console.log(JSON.stringify(body));
console.log(potion);