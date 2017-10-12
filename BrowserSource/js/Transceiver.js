define('Transceiver', ['Matrix'], function(Matrix) {
    
    function Transceiver(url, protocolName, openFunction, errorFunction, objectReceivedFunction) {
        
        var textEncoder = new TextEncoder();
        var textDecoder = new TextDecoder();
        var matrixStringArray = textEncoder.encode("Matrix");
        var websocket;
        var connected = false;
        
        try {
            
            websocket = new WebSocket(url, protocolName);
        }
        catch(exception) {
            
            console.log(exception);
        }
       
        this.send = function(message) {
            
            websocket.send(message);
        };
        websocket.binaryType = 'arraybuffer';
        
        websocket.onopen = openFunction;
        websocket.onerror = errorFunction;
        
        var parsingStates = ["idle", "name", "dataInfo", "receiveData"];
        var parsingInfo = {status:parsingStates[0], objectKind:"", dimensions:[], name:""};
        
        function checkMessageKind(message) {
            
            if (message.data.byteLength === matrixStringArray.byteLength) {
                
                var string = textDecoder.decode(message.data);
                
                if (string.localeCompare("Matrix") === 0) {
                    
                    parsingInfo.objectKind = "Matrix";
                    return true;
                }
            }
            
            return false;
        };
        
        function getDataInfo(message) {
            
            switch (parsingInfo.objectKind) {
                    
                case "Matrix": {
                    
                    parsingInfo.dimensions = new Float64Array(message.data);
                }
            }
        };
        
        function createObject(message) {
            
            switch (parsingInfo.objectKind) {
                    
                case "Matrix": {
                    
                    var matrix = new Matrix(parsingInfo.dimensions[0], parsingInfo.dimensions[1], message.data, parsingInfo.name);
                    return matrix;
                }
            }
        };
        
        websocket.onmessage = function(message) {
            
            switch (parsingInfo.status) {
                    
                case "idle": {
                    
                    var validKind = checkMessageKind(message);
                    
                    if (validKind === true) {
                        
                        parsingInfo.status = parsingStates[1];
                    }
                    
                    break;
                }
                case "name": {
                    
                    parsingInfo.name = textDecoder.decode(message.data);
                    parsingInfo.status = parsingStates[2];
                    break;
                }
                case "dataInfo": {
                    
                    getDataInfo(message);
                    parsingInfo.status = parsingStates[3];
                    break;
                }
                case "receiveData": {
                    
                    var object = createObject(message);
                    parsingInfo.status = parsingStates[0];
                    objectReceivedFunction(object);
                    break;
                }
            }
        };
    };
    
    return Transceiver;
});