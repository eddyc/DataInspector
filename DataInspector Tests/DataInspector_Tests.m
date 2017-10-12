//
//  DataInspector_Tests.m
//  DataInspector Tests
//
//  Created by Edward Costello on 20/04/2015.
//  Copyright (c) 2015 Edward Costello. All rights reserved.
//

#import <Cocoa/Cocoa.h>
#import <XCTest/XCTest.h>
#import "Matrix.h"
#import "Transceiver.h"

@interface DataInspector_Tests : XCTestCase

@end

@implementation DataInspector_Tests

- (void)testWebSockets
{
    _Transceiver *transceiver = Transceiver_new(9000);
    Matrix *matrix = Matrix_new(50, 50);
    
    Matrix_reshape(matrix, (RowCount){1}, (ColumnCount){matrix->elementCount});
    Matrix_ramp(matrix, 0, 1);
    Matrix_reshape(matrix, (RowCount){50}, (ColumnCount){50});
//    Transceiver_send(transceiver, matrix, "fuckery");
    while (1) {
        
        sleep(100);
    }
}

@end
