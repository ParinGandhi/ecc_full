'use strict';

angular.module('adf.widget.audioChannel', ['adf.provider'])
  .config(function(dashboardProvider){
    dashboardProvider
      .widget('audioChannel', {
        title: 'audioChannel',
        description: 'audioChannel',
        templateUrl: '{widgetsPath}/audioChannel/src/view.html',
        edit: {
          templateUrl: '{widgetsPath}/audioChannel/src/edit.html'
        }
      });
  }).directive('audioChannel',function(){
    return {
      restrict: 'E',
      templateUrl: 'app/components/widgets/audioChannel/src/audioChannelView.html',
      bindToController: true
    };
  })
  .controller('AudioChannelController', function ($scope,$sce,HttpFactory,$timeout,CONSTANTS) {
var vm = this;
$scope.recordedInput;
$scope.selectedIndex=10000000;
$scope.isPushSuccess =false;
$scope.recorderComplete=false;
$scope.audioArray=[

{"audioId":"audioTwo","channelName":"Channel one","audioUrl":"http://streamingv2.shoutcast.com/boleros-para-enamorarse?lang=en-US%2cen%3bq%3d0.9","pannerId":"pannerTwo"},
{"audioId":"audioThree","channelName":"Channel two","audioUrl":"http://rautemusik-de-hz-fal-stream16.radiohost.de/blackbeats","pannerId":"pannerTwo"},
{"audioId":"audioFour","channelName":"Channel three","audioUrl":"http://www.music.helsinki.fi/tmt/opetus/uusmedia/esim/a2002011001-e02-128k.mp3","pannerId":"pannerTwo"},
{"audioId":"audioFive","channelName":"Channel four","audioUrl":"https://files1.mp3slash.xyz/stream/f56fd468db29d4ac24fee86e406a13b2","pannerId":"pannerTwo"},
{"audioId":"audioSix","channelName":"Channel five","audioUrl":"http://54.39.247.236:4300/?type=http&nocache=287","pannerId":"pannerTwo"}
];
$scope.widgetIdentifier = $scope.$parent.$parent.model.widgetIdentifier;
vm.sample="sdf";
$scope.sample="sd";
$scope.pushToTalkName = "push to talk";
$scope.isPushClicked = false;
//  $scope.initAudio =function(each){
  
//     $scope[each] = document.querySelector(each);
  
  
  
//     //pre.innerHTML = myScript.innerHTML;
    
//     // $scope[each].addEventListener('play', function() {
//     //   // Create audio context if it doesn't already exist
      
      
//     // })
 
// }
$scope.onLoad= function(id){
  var audioCtx;
  if(!audioCtx) {
    audioCtx = new window.AudioContext();
  }
  var panner= id + "panner";
  $scope[id] = document.getElementById(id);
  var myaudio = $scope[id];
if(!$scope[panner]){

  var source = audioCtx.createMediaElementSource(myaudio);
  $scope[panner] = audioCtx.createStereoPanner();
  source.connect($scope[panner]);
  $scope[panner].connect(audioCtx.destination);
}
}
$scope.onPlay= function(id){

  $scope[id] = document.getElementById(id);
  var myaudio = $scope[id];
  myaudio.style.borderLeftWidth = "6px" ;
  myaudio.style.borderLeftStyle = "solid";
  myaudio.style.borderLeftColor = "#004c97";
  myaudio.style.height = "54px";
  myaudio.style.outlineColor = "initial";
  myaudio.style.outlineStyle = "none";
  myaudio.style.outlineWidth= "initial";


  
}

$scope.onPause=function(id){
  document.getElementById(id).style.borderLeftColor = "white";
}
$scope.highletPannerButton = function(pannerHighletId){
  var ele = document.getElementById(pannerHighletId);
ele.style.backgroundColor = "#004c97";
ele.style.color="white";
ele.style.outlineColor = "initial";
ele.style.outlineStyle = "none";
ele.style.outlineWidth= "initial";

}
 $scope.pushToTalk=function(item,index){
   $scope.selectedIndex=index;
   $scope.isPushClicked =true;
   $scope.isPushSuccess =false;
   $scope.pushToTalkName="Connecting";
   var data = {
     "channelName":item.channelName ,
     "channelId":item.audioId
   }
  HttpFactory.postActions(CONSTANTS.URL.CHANNELINFO, data)
  .then(function (successResponse) {
  
      $scope.isPushClicked =false;
      $scope.isPushSuccess =true;
     
    
  
   
  }, function (failureResponse) {
    $scope.isPushClicked =false;
  });

 }
$scope.pannerSlider=function(id,value){
  $scope.panner(id.split('-').pop(),value);
}
$scope.panner = function(id,value){
  var pannerId = id + "panner";
  var pannerHighletId =id;
  var sliderId= "custom-panner-" + id;
document.getElementById(sliderId).value=value;
if(value==1){
  document.getElementById(pannerHighletId + "l").style.backgroundColor = "#f9f9f9";
  document.getElementById(pannerHighletId + "l").style.color = "black";
  pannerHighletId =pannerHighletId+"r";
  $scope.highletPannerButton(pannerHighletId);
} else if(value== -1){ 
  document.getElementById(pannerHighletId + "r").style.backgroundColor = "#f9f9f9";
  document.getElementById(pannerHighletId + "r").style.color = "black";
  pannerHighletId =pannerHighletId+"l";
  $scope.highletPannerButton(pannerHighletId);
} else{
  document.getElementById(pannerHighletId + "l").style.backgroundColor = "#f9f9f9";
  document.getElementById(pannerHighletId + "l").style.color = "black";
  document.getElementById(pannerHighletId + "r").style.backgroundColor = "#f9f9f9";
  document.getElementById(pannerHighletId + "r").style.color = "black";
}

  if(id && $scope[pannerId]){
    $scope[pannerId].pan.value=value;
  }
}
var timeoutId;
        $scope.seconds = 0;
        $scope.minutes = 0;
        $scope.running = false;
        function convertDataURIToBinary(dataURI) {
          var BASE64_MARKER = ';base64,';
          var base64Index = dataURI.indexOf(BASE64_MARKER) + BASE64_MARKER.length;
          var base64 = dataURI.substring(base64Index);
          var raw = window.atob(base64);
          var rawLength = raw.length;
          var array = new Uint8Array(new ArrayBuffer(rawLength));
        
          for(i = 0; i < rawLength; i++) {
            array[i] = raw.charCodeAt(i);
          }
          return array;
        }
        $scope.stop = function(audioModel) {
        //  var binary =convertDataURIToBinary(audioModel);
          var blobl = new Blob([audioModel],{type:'audio/ogg'});
          $scope.recordedUrl =URL.createObjectURL(blobl);
          $scope.isrec =false;
          $scope.recorderComplete=true;
          $timeout.cancel(timeoutId);
          $scope.running = false;
          $scope.clear();
        };
        $scope.completedConv =function(){
          $scope.con=true;
        }
        $scope.start = function(rec) {
          $scope.recordedInput =null;
          $scope.isrec =true;
          $scope.recorderComplete=false;
          timer();
          $scope.running = true;
        };
        
        $scope.clear = function() {
          $scope.seconds = 0;
          $scope.minutes = 0;
        };
        
        function timer() {
          timeoutId = $timeout(function() {
            updateTime(); // update Model
            timer();
          }, 1000);
        }
        
        function updateTime() {
          $scope.seconds++;
          if ($scope.seconds === 60) {
            $scope.seconds = 0;
            $scope.minutes++;
          }
        }
      
  }).
  filter('numberpad', function() {
    return function(input, places) {
      var out = "";
      if (places) {
        var placesLength = parseInt(places, 10);
        var inputLength = input.toString().length;
      
        for (var i = 0; i < (placesLength - inputLength); i++) {
          out = '0' + out;
        }
        out = out + input;
      }
      return out;
    };
  }); ;
