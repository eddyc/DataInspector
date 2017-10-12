//
//  Transceiver.h
//  DataInspector
//
//  Created by Edward Costello on 24/04/2015.
//  Copyright (c) 2015 Edward Costello. All rights reserved.
//


#import <MacTypes.h>
#import <stdio.h>
#import <stdlib.h>
#import "CommonDSP.h"
#import "Matrix.h"

#ifdef __cplusplus
extern "C"
{
#endif
    
    typedef struct Transceiver Transceiver;
    
    Transceiver *Transceiver_new(UInt32 port);
    void Transceiver_delete(Transceiver *self);
    void Transceiver_scopedDelete(Transceiver **self);
    #define _Transceiver __attribute__((unused)) __attribute__((cleanup(Transceiver_scopedDelete))) Transceiver
    
    OVERLOADED void Transceiver_send(Transceiver *self, Matrix *matrix, const char *name);
#ifdef __cplusplus
}
#endif