define('Matrix', [], function() {

    function Matrix(rowCount, columnCount, arrayBufferIn, label) {

        this.rowCount = rowCount;
        this.columnCount = columnCount;
        this.elementCount = rowCount * columnCount;
        this.label = typeof label === 'undefined' ? "" : label;
        var arrayBuffer;
        
        if (typeof arrayBufferIn === 'undefined') {
            
            arrayBuffer = new ArrayBuffer(this.elementCount * Float64Array.BYTES_PER_ELEMENT);
        }
        else {
            
            arrayBuffer = arrayBufferIn;
        }
        
        this.data = new Float64Array(arrayBuffer);

        this.print = function() {
        
            for (var i = 0; i < rowCount; ++i) {
            
                var currentRow = this.data.subarray(i * columnCount, i * columnCount + columnCount);
                console.log(currentRow);
            }
        }

        this.ramp = function(startValue, increment) {
        
            this.data[0] = startValue;

            for (var i = 1; i < this.elementCount; ++i) {
           
                this.data[i] = this.data[i - 1] + increment;
            }
        }

        this.getElement = function(row, column) {
        
            var element = this.data[row * this.columnCount + column];
            return element; 
        }
        
        this.reshape = function(newRowCount, newColumnCount) {
            
            if (this.elementCount < newRowCount * newColumnCount) {
                
                console.log("Matrix.reshape, Error: Not enough elements");
            }
            else {
                
                this.rowCount = newRowCount;
                this.columnCount = newColumnCount;
            }
        }
    }

    return Matrix;
});
