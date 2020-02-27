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
  }).controller('AudioChannelController', function ($scope,$sce) {
var vm = this;
$scope.audioArray=[

{"audioId":"audioTwo","channelName":"Channel one","audioUrl":"https://file-examples.com/wp-content/uploads/2017/11/file_example_MP3_700KB.mp3","pannerId":"pannerTwo"},
{"audioId":"audioThree","channelName":"Channel two","audioUrl":"http://www.music.helsinki.fi/tmt/opetus/uusmedia/esim/a2002011001-e02-128k.mp3","pannerId":"pannerTwo"}
];

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

  $scope[id] = document.getElementById(id);
  var myaudio = $scope[id];
  var source = audioCtx.createMediaElementSource(myaudio);
  var panner= id + "panner";
  
  $scope[panner] = audioCtx.createStereoPanner();

  
  source.connect($scope[panner]);
  $scope[panner].connect(audioCtx.destination);
}



$scope.panner = function(id,value){
  var pannerId = id + "panner";
$scope[pannerId].pan.value=value;
}
  });
