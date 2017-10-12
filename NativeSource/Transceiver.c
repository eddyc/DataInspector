//
//  Transceiver.c
//  DataInspector
//
//  Created by Edward Costello on 24/04/2015.
//  Copyright (c) 2015 Edward Costello. All rights reserved.
//

#import "Transceiver.h"
#import "WebSocket.h"

struct Transceiver
{
    WebSocket *websocket;
    WebSocketMessage *dataMessage;
    WebSocketMessage *dimensionsMessage;
    WebSocketMessage *typeMessage;
    WebSocketMessage *nameMessage;
    char *matrixString;
    char *nameString;
    Float64 dimensions[2];
};

void Transceiver_messageReceived(void *opaquePointer, void *inputData, size_t inputDataSize);

Transceiver *Transceiver_new(UInt32 port)
{
    Transceiver *self = calloc(1, sizeof(Transceiver));
    self->websocket = WebSocket_new(port, "application-data", self, Transceiver_messageReceived);
    self->dataMessage = calloc(1, sizeof(WebSocketMessage));
    self->dimensionsMessage = calloc(1, sizeof(WebSocketMessage));
    self->typeMessage = calloc(1, sizeof(WebSocketMessage));
    self->nameMessage = calloc(1, sizeof(WebSocketMessage));
    self->matrixString = calloc(strlen("Matrix"), sizeof(char));
    self->nameString = calloc(100, sizeof(char));
    strcpy(self->matrixString, "Matrix");

    system("osascript /Volumes/Data/Dropbox/Programming/SoftwareProjects/DataInspector/LaunchWebPage.scpt");
    WebSocket_run(self->websocket);
    return self;
}

void Transceiver_delete(Transceiver *self)
{
    WebSocket_delete(self->websocket);
    free(self->dataMessage);
    free(self->dimensionsMessage);
    free(self->typeMessage);
    free(self->nameMessage);
    free(self);
    self = NULL;
}

void Transceiver_scopedDelete(Transceiver **self)
{
    Transceiver_delete(*self);
}
void sendName(void *opaquePointer)
{
    Transceiver *self = opaquePointer;
    WebSocket_send(self->websocket, self->nameMessage);
}

void sendType(void *opaquePointer)
{
    Transceiver *self = opaquePointer;
    WebSocket_send(self->websocket, self->typeMessage);
}

void sendDimensions(void *opaquePointer)
{
    Transceiver *self = opaquePointer;
    WebSocket_send(self->websocket, self->dimensionsMessage);
}

void sendData(void *opaquePointer)
{
    Transceiver *self = opaquePointer;
    WebSocket_send(self->websocket, self->dataMessage);
}



void Transceiver_sendMessage(Transceiver *self,
                            WebSocketMessage *message,
                            void *data, size_t bytesCount)
{
    message->data = data;
    message->bytesCount = bytesCount;
    WebSocket_send(self->websocket, message);
}


OVERLOADED void Transceiver_send(Transceiver *self, Matrix *matrix, const char *name)
{
    self->dimensions[0] = matrix->rowCount;
    self->dimensions[1] = matrix->columnCount;
    strcpy(self->nameString, name);
    
    Transceiver_sendMessage(self, self->typeMessage, self->matrixString, strlen(self->matrixString));
    Transceiver_sendMessage(self, self->nameMessage, self->nameString, strlen(self->nameString));
    Transceiver_sendMessage(self, self->dimensionsMessage, self->dimensions, 2 * sizeof(Float64));
    Transceiver_sendMessage(self, self->dataMessage, matrix->data, matrix->elementCount * sizeof(Float64));
}


void Transceiver_messageReceived(void *opaquePointer, void *inputData, size_t inputDataSize)
{
    printf("message received\n");
}