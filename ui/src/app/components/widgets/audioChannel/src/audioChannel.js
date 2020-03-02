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
  .controller('AudioChannelController', function ($scope,$sce) {
var vm = this;

$scope.audioArray=[

{"audioId":"audioTwo","channelName":"Channel one","audioUrl":"https://mobcup.net/d/mxq25i8c/mp3","pannerId":"pannerTwo"},
{"audioId":"audioThree","channelName":"Channel two","audioUrl":"https://mobcup.net/d/u8fequ3t/mp3","pannerId":"pannerTwo"},
{"audioId":"audioFour","channelName":"Channel three","audioUrl":"http://www.music.helsinki.fi/tmt/opetus/uusmedia/esim/a2002011001-e02-128k.mp3","pannerId":"pannerTwo"},
{"audioId":"audioFive","channelName":"Channel four","audioUrl":"https://files1.mp3slash.xyz/stream/f56fd468db29d4ac24fee86e406a13b2","pannerId":"pannerTwo"},
{"audioId":"audioSix","channelName":"Channel five","audioUrl":"http://54.39.247.236:4300/?type=http&nocache=287","pannerId":"pannerTwo"}
];
$scope.widgetIdentifier = $scope.$parent.$parent.model.widgetIdentifier;
vm.sample="sdf";
$scope.sample="sd";

//  $scope.initAudio =function(each){
  
//     $scope[each] = document.querySelector(each);
  
  
  
//     //pre.innerHTML = myScript.innerHTML;
    
//     // $scope[each].addEventListener('play', function() {
//     //   // Create audio context if it doesn't already exist
      
      
//     // })
 
// }
$scope.onPlay= function(id){
  var audioCtx;
  if(!audioCtx) {
    audioCtx = new window.AudioContext();
  }
  var panner= id + "panner";
  $scope[id] = document.getElementById(id);
  var myaudio = $scope[id];
  myaudio.style.borderLeftWidth = "6px" ;
  myaudio.style.borderLeftStyle = "solid";
  myaudio.style.borderLeftColor = "rgb(101,154,206)";
  myaudio.style.height = "54px";
  myaudio.style.outlineColor = "initial";
  myaudio.style.outlineStyle = "none";
  myaudio.style.outlineWidth= "initial";
if(!$scope[panner]){
  

  var source = audioCtx.createMediaElementSource(myaudio);
  
  
  $scope[panner] = audioCtx.createStereoPanner();

  
  source.connect($scope[panner]);
  $scope[panner].connect(audioCtx.destination);
}

  
}

$scope.onPause=function(id){
  document.getElementById(id).style.borderLeftColor = "white";
}

 

$scope.panner = function(id,value){
  var pannerId = id + "panner";
  if(id && $scope[pannerId]){
    $scope[pannerId].pan.value=value;
  }
}
  });
