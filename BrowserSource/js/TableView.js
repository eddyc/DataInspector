define('TableView', ['GridView', 'Matrix'], function (GridView, Matrix) {
   
    function TableView(tableWidth, tableHeight, cellWidth, cellHeight, dataMatrix) {
      
        var tableContainer = document.createElement("div");
        tableContainer.id = "tableContainer";
        tableContainer.style.width = tableWidth + "px";
        tableContainer.style.height = tableHeight + 70 + "px";
        tableContainer.style.overflow = "hidden";
        
        var visibleIndicesView = document.createElement("div");
        visibleIndicesView.style.height = 60 + "px";
        visibleIndicesView.style.width = tableWidth + "px";
        visibleIndicesView.style.float = "left";
        var visibleIndicesPre = document.createElement("pre");
        var visibleIndicesText = document.createElement("div");
        visibleIndicesText.style.width = "150px";
        visibleIndicesText.style.float = "left";
        visibleIndicesView.appendChild(visibleIndicesPre);
        visibleIndicesPre.appendChild(visibleIndicesText);
        
        var hoverCellText = document.createElement("div");
        hoverCellText.style.width = "120px";
        hoverCellText.style.float = "left";
        hoverCellText.innerHTML = "hello";
        visibleIndicesPre.appendChild(hoverCellText);
        
        var currentVisibleIndices = "0:0";
        var currentMouseEnterIndices = "0:0";
        visibleIndicesText.innerHTML = "visible: " + currentVisibleIndices + "\nhover:   " + currentMouseEnterIndices;
        
        function getMouseEnterCellIndex(rowNumber, columnNumber) {
            
            currentMouseEnterIndices = "" + rowNumber + ":" + columnNumber;
        visibleIndicesText.innerHTML = "visible: " + currentVisibleIndices + "\nhover:   " + currentMouseEnterIndices;
        };
        
        function getVisibleCellIndex(rowNumber, columnNumber) {
            
            currentVisibleIndices = "" + rowNumber + ":" + columnNumber;
        visibleIndicesText.innerHTML = "visible: " + currentVisibleIndices + "\nhover:   " + currentMouseEnterIndices;
        };
        
        
        var dataView = new GridView(tableWidth, tableHeight, cellWidth, cellHeight, dataMatrix, getMouseEnterCellIndex, getVisibleCellIndex);
        dataView.style.float = "right";
      
        tableContainer.setDataMatrix = function(newDataMatrix) {
            
            dataView.setDataMatrix(newDataMatrix);
        };
        
        tableContainer.appendChild(visibleIndicesView);
        tableContainer.appendChild(dataView);
        
        return tableContainer;
    };
    
    return TableView;
});