/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


var currentGraphicMap = new GraphicMap();


function loadLocalGraphicMap() {
    // TODO Replace XMLHttpRequest by something asynchronous
    var request = new XMLHttpRequest();
    request.open("GET", "/DreamingMachine/json/graphicMap1.json", false);
    request.send(null);
    currentGraphicMap.deserializeJSON(request.responseText);
    refreshTable();
};

function refreshTable(){
    //jQuery("#GraphicMapBuilder-Table").html(request.responseText);
    var innerHTML = "<table id=\"GraphicMapBuilder-table\"> ";
    innerHTML +="       <tr> ";
    innerHTML +="           <th>ID</th> ";
    innerHTML +="           <th>Image</th> ";
    innerHTML +="       </tr> ";
    innerHTML +="</table> ";
    jQuery("#GraphicMapBuilder-Table-div").html(innerHTML);
    
    var table = document.getElementById("GraphicMapBuilder-table");
    for (var id in currentGraphicMap.map){
        var row = table.insertRow(0);        
        row.setAttribute("data-ID", id);
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        cell1.innerHTML = id;
        cell2.appendChild(currentGraphicMap.getImage(id));
        row.onclick = (function() {
            selectRow(this.getAttribute("data-ID"));
        });
    }
}

function selectRow(id){
    document.getElementById("forn-id").value =id;
    document.getElementById("form-img").src = currentGraphicMap.getGraphic(id);
    document.getElementById("form-b64").value = currentGraphicMap.getGraphic(id);
    // TODO Select display
}

function serialize(){
    prompt("You can save the following JSON:",currentGraphicMap.serializeJSON());
}

function addNew(){
    document.getElementById("forn-id").value =  '';
    document.getElementById("form-img").src =   '';
    document.getElementById("form-b64").value = '';
    // TODO Select display
}

function save(){
    var id = document.getElementById("forn-id").value;
    var uri = document.getElementById("form-b64").value;
    currentGraphicMap.addGraphic(id,uri);
    refreshTable();
}

function readFile() {
  
  if (this.files && this.files[0]) {
    
    var FR= new FileReader();
    
    FR.addEventListener("load", function(e) {
      document.getElementById("form-img").src       = e.target.result;
      document.getElementById("form-b64").value     = e.target.result;
    }); 
    
    FR.readAsDataURL( this.files[0] );
  }
  
}


window.onload=function(){
    document.getElementById("form-file").addEventListener("change", readFile);
    loadLocalGraphicMap();
    
};
