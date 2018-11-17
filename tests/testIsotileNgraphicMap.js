/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

    gm = new GraphicMap();
    gm.addGraphic(1,'test1');
    //GraphicMap {map: Object}
    gm.addGraphic(2,'test2');
    //GraphicMap {map: Object}
    gm.getGraphic(1);
    //"test1"
    gm.getGraphic(2);
    //"test2"
    gm.getGraphic(3);
    //""
    im1 = new IsotileMap(32,64,gm);
    //IsotileMap {width: 32, length: 64, graphicMap: GraphicMap, map: Array[32]}
    im1.graphicMap.addGraphic(5,'test5');
    //GraphicMap {map: Object}
    im2 = new IsotileMap(20,40,gm);
    //IsotileMap {width: 20, length: 40, graphicMap: GraphicMap, map: Array[20]}
    im2.graphicMap.addGraphic(3,'test3');
    //GraphicMap {map: Object}
    im2.graphicMap.getGraphic(3);
    //"test3"
    im2.graphicMap.getGraphic(5);
    //"test5"
    im1.graphicMap.getGraphic(5);
    //"test5"
    gm.getGraphic(3);
    //"test3"
    gm.getGraphic(5);
    //"test5"
    
    gm2 = new GraphicMap()
    //GraphicMap {map: Object}
    gm2.deserializeJSON('{"4":"test4","5":"test5","6":"test6"}')
    //GraphicMap {map: Object}
