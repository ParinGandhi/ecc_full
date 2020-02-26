'use strict';

angular.module('adf.widget.chat', ['adf.provider'])
  .config(function (dashboardProvider) {
    dashboardProvider
      .widget('chat', {
        title: 'Chat',
        description: 'Chat',
        templateUrl: '{widgetsPath}/chat/src/chat.html',
        edit: {
          templateUrl: '{widgetsPath}/chat/src/edit.html'
        }
      });
  }).controller('ChatController', function () {

  });
