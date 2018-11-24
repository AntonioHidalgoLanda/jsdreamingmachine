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
actionCatalog.heal.bind("potion", potion);
actionCatalog.heal.execute();
console.log("Results Healing Action");
console.log(JSON.stringify(body));
console.log(potion);