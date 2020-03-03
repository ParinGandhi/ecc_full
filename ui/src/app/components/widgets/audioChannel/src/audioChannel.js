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
$scope.recordedInput;
$scope.audioArray=[

{"audioId":"audioTwo","channelName":"Channel one","audioUrl":"http://s-a7564316.mp3pro.xyz/070a3f7059ff4b3c63ce4/Justin%20Bieber%20%E2%80%93%20Despacito%20%F0%9F%8E%A4%20ft.%20Luis%20Fonsi%20%26%20Daddy%20Yankee%20%5BPop%5D.mp3","pannerId":"pannerTwo"},
{"audioId":"audioThree","channelName":"Channel two","audioUrl":"http://s-905b7872.mp3pro.xyz/86b4178e59ff4b9aa39a2/Jonas%20Blue%20-%20Rise%20ft.%20Jack%20%26%20Jack%20%28%20%29.mp3","pannerId":"pannerTwo"},
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
  });
