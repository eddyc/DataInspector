require(['TableView', 'Matrix', 'Transceiver'], function(TableView, Matrix, Transceiver) {
    
    var cellWidthPx = 40;
    var cellHeightPx = 30;
    var tableWidthPx = 400;
    var tableHeightPx = 360;
   
    var tableColumn = document.getElementById("TableColumn");

    function openFunction() {
        
        console.log("Opened connection\n");
    };
    
    function errorFunction() {
        
        console.log("Error\n");
    };
    
    var table;
    var called = 0;
    function objectReceivedFunction(object) {
        
        if (typeof table === 'undefined') {
            
            table = new TableView(tableWidthPx, tableHeightPx, cellWidthPx, cellHeightPx, object);
            tableColumn.appendChild(table);
        }
        else {
            
            table.setDataMatrix(object);
        }
        called++;
        console.log(called);
    };
    
   var transciever = new Transceiver("ws://127.0.0.1:9000", 'application-data', openFunction, errorFunction, objectReceivedFunction);
    
});
