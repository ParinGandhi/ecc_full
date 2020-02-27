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
$scope.audioArray=[{"audioId":"audio","audioUrl":"https://ia800508.us.archive.org/15/items/LoveThemeFromTheGodfather/02LoveThemeFromTheGodfather.mp3","pannerId":"panner"}

,{"audioId":"audioTwo","audioUrl":"https://file-examples.com/wp-content/uploads/2017/11/file_example_MP3_700KB.mp3","pannerId":"pannerTwo"},
{"audioId":"audioTwo","audioUrl":"http://www.music.helsinki.fi/tmt/opetus/uusmedia/esim/a2002011001-e02-128k.mp3","pannerId":"pannerTwo"},
{"audioId":"audioTwo","audioUrl":"https://ia800508.us.archive.org/15/items/LoveThemeFromTheGodfather/02LoveThemeFromTheGodfather.mp3","pannerId":"pannerTwo"},
{"audioId":"audioTwo","audioUrl":"https://ia800508.us.archive.org/15/items/LoveThemeFromTheGodfather/02LoveThemeFromTheGodfather.mp3","pannerId":"pannerTwo"}];

vm.sample="sdf";
$scope.sample="sd";
let audioCtx;
$scope.initAudios= function(){
  $scope.audioArray.forEach(function(each){
    $scope[each.audioId] = document.querySelector(each.audioId);
  
  
  
    //pre.innerHTML = myScript.innerHTML;
    
    $scope[each.audioId].addEventListener('play', function() {
      // Create audio context if it doesn't already exist
      if(!audioCtx) {
        audioCtx = new window.AudioContext();
      }
    
      
      let source = audioCtx.createMediaElementSource($scope[each.audioId]);
    
      
      $scope[each.pannerId] = audioCtx.createStereoPanner();
    
      
      source.connect($scope[each.pannerId]);
      $scope[each.pannerId].connect(audioCtx.destination);
    })
  });
}



$scope.getPlayer = function(id){
$scope[id].pan.value=-1;
}
  });
