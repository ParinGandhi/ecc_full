(function () {
    'use strict';
  
    describe('HearingRoomPickerController', function () {
  
      beforeEach(module('ptabe2e'));
      var $controller;
      var vm = this;
      var ngDialog = jasmine.createSpyObj('ngDialog', ['closeAll', 'open']);
      var controller, scope, $rootScope;
      var timeout;
      var $httpBackend, spy, $q, HttpFactoryDeferred, successResponse, failureResponse;
  
  
      beforeEach(inject(function (_$controller_, _$rootScope_, _$q_, HttpFactory) {
        $q = _$q_;
        $controller = _$controller_;
        scope = _$rootScope_.$new();
        $rootScope = _$rootScope_;
        HttpFactoryDeferred = _$q_.defer();
        spyOn(HttpFactory, 'getActions').and.returnValue(HttpFactoryDeferred.promise);
  
        ngDialog.open.and.returnValue({
         closePromise: {
           then: function (callback1) {
             callback1();
           }
         }
       });
  
        controller = $controller('HearingRoomPickerController', {
          $scope: scope,
          ngDialog: ngDialog,
          $rootScope: _$rootScope_,
          HttpFactory: HttpFactory
  
        });
      }));
  
      describe('HearingRoomPickerController ', function () {

        it('it should call getSessionData ', function () {
          successResponse = 
          [ 
              {  
                 "locationIdentifier":4,
                 "locationName":"D",
                 "locationDescription":"Alexandria: Room D",
                 "locationStateCode":"VA",
                 "hearingSchdules":[  
                    {  
                       "serialNumber":"95000587",
                       "appealNumber":2019001586,
                       "sequenceNumber":0,
                       "hearingDate":1545800400000,
                       "hearingTime":"1:00:00 PM EST",
                       "panelAPJFullName":"Moore, James T ",
                       "panels":[  
                          {  
                             "employeeId":5768,
                             "apjName":"Gandhi, Parin ",
                             "rankNumber":0
                          },
                          {  
                             "employeeId":6143,
                             "apjName":"ADAMS, DONALD ",
                             "rankNumber":0
                          },
                          {  
                             "employeeId":6149,
                             "apjName":"FRANKLIN, ERICA ",
                             "rankNumber":0
                          },
                          {  
                             "employeeId":5772,
                             "apjName":"Ramani, Ravi ",
                             "rankNumber":0
                          },
                          {  
                             "employeeId":5767,
                             "apjName":"Sankineni, Archana ",
                             "rankNumber":0
                          },
                          {  
                             "employeeId":4800,
                             "apjName":"Moore, James T ",
                             "rankNumber":1
                          },
                          {  
                             "employeeId":6155,
                             "apjName":"BAHR, JENNIFER ",
                             "rankNumber":2
                          },
                          {  
                             "employeeId":4805,
                             "apjName":"Moore, Scott C",
                             "rankNumber":2
                          },
                          {  
                             "employeeId":4789,
                             "apjName":"Warner, Brandon J",
                             "rankNumber":3
                          },
                          {  
                             "employeeId":467,
                             "apjName":"Bisk, Jennifer ",
                             "rankNumber":3
                          },
                          {  
                             "employeeId":4795,
                             "apjName":"Parvis, Barbara ",
                             "rankNumber":4
                          }
                       ],
                       "specialHearingIndicator":"N",
                       "disciplineText":"Reexam",
                       "status":"Appearance made"
                    }
                 ]
              },
              {  
                 "locationIdentifier":1,
                 "locationName":"A",
                 "locationDescription":"Alexandria: Room A",
                 "locationStateCode":"VA",
                 "hearingSchdules":[  
                    {  
                       "serialNumber":"95000085",
                       "appealNumber":2019000846,
                       "sequenceNumber":0,
                       "hearingDate":1545800400000,
                       "hearingTime":"1:00 PM ",
                       "panelAPJFullName":"Droesch, Kristens ",
                       "panels":[  
                          {  
                             "employeeId":4791,
                             "apjName":"Droesch, Kristens ",
                             "rankNumber":1
                          }
                       ],
                       "specialHearingIndicator":"N",
                       "disciplineText":"Reexam",
                       "status":"Appearance made"
                    },
                    {  
                       "serialNumber":"11735460",
                       "appealNumber":2019000866,
                       "sequenceNumber":0,
                       "hearingDate":1545800400000,
                       "hearingTime":"1:00:00 PM EST",
                       "panelAPJFullName":"ADAMS, DONALD ",
                       "panels":[  
                          {  
                             "employeeId":6251,
                             "apjName":"Dove, Esther ",
                             "rankNumber":0
                          },
                          {  
                             "employeeId":6143,
                             "apjName":"ADAMS, DONALD ",
                             "rankNumber":1
                          },
                          {  
                             "employeeId":4791,
                             "apjName":"Droesch, Kristens ",
                             "rankNumber":2
                          },
                          {  
                             "employeeId":4796,
                             "apjName":"Bui, Hung H",
                             "rankNumber":3
                          }
                       ],
                       "specialHearingIndicator":"N",
                       "disciplineText":"Electrical",
                       "status":"Appearance made"
                    }
                 ]
              }
           ]
          expect(controller['getSessionData']).toBeDefined();
          controller.getSessionData();
        });


        it('it should invoke getSessionData failureResponse ', function () {

          failureResponse = {};
          HttpFactoryDeferred.reject(failureResponse);
          $rootScope.$apply();
  
          controller.getSessionData();
        });

        it('it should invoke validateBusinnessdateSelected  failureResponse ', function () {

          failureResponse = {};
          HttpFactoryDeferred.reject(failureResponse);
          $rootScope.$apply();
  
          controller.validateBusinnessdateSelected();
        });

        it('it should call validateBusinnessdateSelected ', function () {
          successResponse = 
          {
            "inputDate": 1546120487000,"isValid": false,"nextBusinessDay": 1546232400000
          }
          expect(controller['validateBusinnessdateSelected']).toBeDefined();
          controller.validateBusinnessdateSelected();
        });

      //   it('it should call setSelectedRoom ', function () {
      //    var content;
      //    expect(controller['setSelectedRoom']).toBeDefined();
      //    controller.setSelectedRoom(content);
      //  });

       it('it should call setSelectedTime ', function () {
         var datanoe;
         expect(controller['setSelectedTime']).toBeDefined();
         controller.setSelectedTime(datanoe);
       });
  
      //   it('it should call validateBusinnessdateSelected ', function () {
      //    var data = {
      //       hearingSchdules: [{
      //          hearingTime:"monday"
      //       }]
      //    }
      //    expect(controller['getDistinctAssignmentTypes']).toBeDefined();
      //    controller.getDistinctAssignmentTypes(data);
      //  });

       it('it should call validateBusinnessdateSelected ', function () {

         expect(controller['showSessionSchedule']).toBeDefined();
         controller.showSessionSchedule();
       });

       
       it(' getSessionData  successResponse', function () {

         successResponse = {
           data: {

           }
         };
         HttpFactoryDeferred.resolve(successResponse);
         $rootScope.$apply();

         expect(controller.getSessionData).toBeDefined();
         controller.getSessionData();
       });
   
       it(' getSessionData  failureResponse ', function () {
         var failureResponse = {
           data: {}
         };

 
         HttpFactoryDeferred.reject(failureResponse);
         $rootScope.$apply();  

         expect(controller.getSessionData).toBeDefined();
         controller.getSessionData();
 
       });
      });
    });
  })();
  