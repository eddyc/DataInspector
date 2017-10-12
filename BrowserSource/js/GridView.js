define('GridView', ['Matrix'], function (Matrix) {
    
    function GridView(gridWidth, gridHeight, cellWidth, cellHeight, dataMatrix, getMouseEnterCellIndex, getVisibleCellIndex) {
        
        var visibleRows = Math.floor(gridHeight / cellHeight);
        var visibleColumns = Math.floor(gridWidth / cellWidth);
        visibleRows = visibleRows <= 1 ? visibleRows : visibleRows + 1;
        visibleColumns = visibleColumns <= 1 ? visibleColumns : visibleColumns + 1;
        
        var currentX = 0;
        var currentY = 0;
        
        var gridView = createGridView();
        var scrollView = createScrollView(dataMatrix.rowCount, dataMatrix.columnCount);
        var dataView = createDataView();
        scrollView.appendChild(dataView);
        gridView.appendChild(scrollView);
        
        var currentDataMatrix = dataMatrix;
        drawCells(0, 0);
        
        gridView.setDataMatrix = function(newDataMatrix) {
            
            scrollView = createGridView(newDataMatrix.rowCount, newDataMatrix.columnCount);
            scrollView.innerHTML = "";
            currentDataMatrix = newDataMatrix;
            drawCells(currentY, currentX);
        };
        
        
        function createDiv(width, height, id) {
            
            var theDiv = document.createElement("div");
            theDiv.id = id;
            
            theDiv.style.width = width + "px";
            theDiv.style.height = height + "px";
            
            return theDiv;
        };
        
        function createGridView() {
            
            var theView = createDiv(gridWidth, gridHeight, "gridView");
            theView.style.border = "1px solid black";
            theView.style.overflow = "scroll";
            theView.style.position = "relative";
            theView.style.borderRadius = "5px";
            
            theView.onscroll = function () {
                
                var cellX = theView.scrollLeft - (theView.scrollLeft % cellWidth);
                var cellX = cellX / cellWidth;
                var cellY = theView.scrollTop - (theView.scrollTop % cellHeight);
                var cellY = cellY / cellHeight;
                
                if (cellX != currentX || cellY != currentY) {
                    
                    currentX = cellX;
                    currentY = cellY;
                    getVisibleCellIndex(cellY, cellX);
                    drawCells(cellY, cellX);
                }
                
            };
            
            return theView;
        };
        
        function createScrollView(newRowCount, newColumnCount) {
            
            var theView = createDiv(newColumnCount * (cellWidth - 1), newRowCount * (cellHeight - 1), "scrollView");
            return theView;
        };
        
        function createCell() {
            
            var theCell = createDiv(cellWidth, cellHeight, "cellView");
            theCell.style.float = "left";
            theCell.style.border = "1px solid black";
            theCell.style.margin = "-1px 0 0 -1px";
            theCell.style.overflow = "hidden";
            theCell.style.width = cellWidth;
            theCell.style.height = cellHeight;
            var theCellContent = createDiv(cellWidth, cellHeight, "cellContent");
            theCellContent.style.textAlign = "left";
            theCellContent.style.margin = "4px";
            theCell.appendChild(theCellContent);
            theCell.rowNumber = "";
            theCell.columnNumber = "";
            
            theCell.onmouseenter = function() {
                
                getMouseEnterCellIndex(theCell.rowNumber, theCell.columnNumber);
            }
            return theCell;
        };
        
        function createDataView() {
            
            var theView = createDiv(visibleColumns * cellWidth, visibleRows * cellHeight, "dataView");
            theView.style.position = "relative";
            theView.style.display = "inline-block";
            
            for (var row = 0; row < visibleRows; ++row) {
                
                var currentRow = document.createElement("div");
                
                for (var column = 0; column < visibleColumns; ++column) {
                    
                    var currentCell = createCell();
                    currentRow.appendChild(currentCell);
                }
                
                theView.appendChild(currentRow);
            }
            
            return theView;
        };
        
        function drawCells(startRow, startColumn) {
            
            var rowOffset = 0;
            var columnOffset = 0;
            if (startRow + visibleRows <= currentDataMatrix.rowCount) {
            
                dataView.style.top = startRow * cellHeight;
            }
            else {
                
                rowOffset = 1;
            }
        
            if (startColumn + visibleColumns <= currentDataMatrix.columnCount) {
            
                dataView.style.left = startColumn * cellWidth;
            }
            else {
                
                columnOffset = 1;
            }
       
            
            for (var row = 0; row < visibleRows - rowOffset; ++row) {
                
                for (var column = 0; column < visibleColumns - columnOffset; ++column) {
                    
                    var dataRow = startRow + row;
                    var dataColumn = startColumn + column;
                    
                    var data = currentDataMatrix.getElement(startRow + row, startColumn + column);
                    
                    if (!(typeof data === 'undefined')) {
                        
                        dataView.children[row + rowOffset].children[column + columnOffset].children[0].innerText = data;
                        dataView.children[row + rowOffset].children[column + columnOffset].rowNumber = startRow + row;
                        dataView.children[row + rowOffset].children[column + columnOffset].columnNumber = startColumn + column;
                    }
                }
            }
        };
        
        
        return gridView;
    };
    
    return GridView;
});