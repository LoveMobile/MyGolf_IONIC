'use strict';

function playbackFailed(e) {
   // video playback failed - show a message saying why
   switch (e.target.error.code) {
     case e.target.error.MEDIA_ERR_ABORTED:
       alert('You aborted the video playback.');
       break;
    case e.target.error.MEDIA_ERR_NETWORK:
      alert('A network error caused the video download to fail part-way.');
      break;
   case e.target.error.MEDIA_ERR_DECODE:
      alert('The video playback was aborted due to a corruption problem or because the video used features your browser did not support.');
      break;
   case e.target.error.MEDIA_ERR_SRC_NOT_SUPPORTED:
     alert('The video could not be loaded, either because the server or network failed or because the format is not supported.');
     break;
   default:
     alert('An unknown error occurred.');
     break;
   }
}

angular.module('mygolf.controllers', [])

.controller('AppCtrl', function($scope, $state, $ionicModal, $timeout, $ionicHistory, Contents, $rootScope) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.goHome = function() {
    $state.go('app.intro');
  }

  $scope.closeMenu = function() {
    $ionicSideMenuDelegate.toggleLeft(0);
  }

})

.controller('LoginCtrl', function($scope, $stateParams, AuthService, $timeout, $state, $ionicAnalytics) {
  
  $scope.mainHeading='';
  $scope.subHeading='';
  $scope.loginData={};
  $scope.loginFailed=false;

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {

    $scope.loginFailed=false;

    /*AuthService.DummyLogin($scope.loginData.username, $scope.loginData.password, function (response) {
      if (response.success) {
        AuthService.SetCredentials($scope.loginData.username, $scope.loginData.password);
        $ionicAnalytics.track('Login attempt', {
          success: true,
          email: $scope.loginData.username
        });
        $state.go('intro');
      }
      else {
        $scope.loginFailed=true;
        $ionicAnalytics.track('Login attempt', {
          success: false,
          email: $scope.loginData.username
        });
      }
    });*/

    AuthService.Login($scope.loginData.username, $scope.loginData.password)
      .done(function (response, status) {
        if (response=='"FAILED"') {
          $scope.loginFailed=true;
          $scope.$apply();
          $ionicAnalytics.track('Login attempt', {
            success: false,
            email: $scope.loginData.username
          });
        }
        else {
          $scope.loginFailed=false;
          $scope.$apply();
          AuthService.SetCredentials($scope.loginData.username, $scope.loginData.password);
          $ionicAnalytics.track('Login attempt', {
            success: true,
            email: $scope.loginData.username
          });
          $state.go('intro');
        }
      })
      .fail(function (request, status, error) {
        $scope.loginFailed=true;
        $scope.$apply();
        $ionicAnalytics.track('Login attempt', {
          success: false,
          email: $scope.loginData.username
        });
      });

  };

})

.controller('IntroCtrl', function($scope, $stateParams) {
  $scope.mainHeading='SCHOOLS RESOURCE MANUAL';
  $scope.subHeading='MYGOLF.ORG.AU';
  $scope.homePage=true;
})

.controller('VideosCtrl', function($scope, $stateParams, $ionicModal) {

  $scope.playVideo = function(filename) {
    $scope.videoSrc = 'video/'+filename; 
    $scope.showModal('templates/videoModal.html');
  };

  $scope.showModal = function(templateUrl) {
    $ionicModal.fromTemplateUrl(templateUrl, {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function(modal) {
      $scope.modal = modal;
      $scope.modal.show();
    });
  };

  // Close the modal
  $scope.closeModal = function() {
    $scope.modal.hide();
    $scope.modal.remove()
  };

})

.controller('GradeCtrl', function($scope, $stateParams, Contents, $rootScope) {
  $scope.mainHeading='SCHOOLS RESOURCE MANUAL';
  $scope.subHeading='MYGOLF.ORG.AU';
  $scope.homePage=true;
  $scope.grade=$stateParams.gradeNum;
  $scope.contents=Contents.get();
})

.controller('SectionCtrl', function($scope, $stateParams, Contents, $rootScope) {
  var gradeNum=$stateParams.gradeNum;
  var sectionNum=$stateParams.sectionNum;
  var allSectionData=Contents.getAllSections(gradeNum);
  var sectionData=Contents.getSection(gradeNum, sectionNum);
  $scope.mainHeading='SECTION '+sectionNum;
  $scope.subHeading=sectionData.title;
  $scope.homePage=false;
  $scope.grade=gradeNum;
  $scope.contents=allSectionData;
})

.controller('PageCtrl', function($scope, $stateParams, Contents, $timeout, $state, $ionicModal) {
  var gradeNum=$stateParams.gradeNum;
  var sectionNum=$stateParams.sectionNum;
  var pageNum=$stateParams.pageNum;
  var sectionData=Contents.getSection(gradeNum, sectionNum);
  var pageData=Contents.getPage(gradeNum, sectionNum, pageNum);
  $scope.mainHeading='SECTION '+sectionNum;
  $scope.subHeading=sectionData.title;
  $scope.homePage=false;
  $scope.grade=gradeNum;
  $scope.section=sectionData;
  $scope.pageTemplate=pageData.unique
    ?'templates/pages/'+gradeNum+'/section'+sectionNum+'/page'+pageNum+'.html'
    :'templates/pages/common/section'+sectionNum+'/page'+pageNum+'.html';
  $scope.pageData=pageData;

  $scope.$on('$ionicView.leave', function(e) {
    $scope.animate0=false;
    $scope.animate1=false;
    $scope.animate2=false;
    $scope.animate3=false;
    $scope.animate4=false;
  });

  $scope.$on('$ionicView.enter', function(e) {
    $timeout(function() {
      $scope.animate0=true;
    }, 0);
    $timeout(function() {
      $scope.animate1=true;
    }, 500);
    $timeout(function() {
      $scope.animate2=true;
    }, 1000);
    $timeout(function() {
      $scope.animate3=true;
    }, 1500);
    $timeout(function() {
      $scope.animate4=true;
    }, 2000);
  });

  $scope.goNext = function() {
    $state.go('app.page', Contents.getNextParams(gradeNum, sectionNum, pageNum));
  };

  $scope.videoSrc = Contents.getPageVideo(sectionNum, pageNum);
  $scope.playVideo = function() {
    $scope.showModal('templates/videoModal.html');
  }

  $scope.showModal = function(templateUrl) {
    $ionicModal.fromTemplateUrl(templateUrl, {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function(modal) {
      $scope.modal = modal;
      $scope.modal.show();
    });
  };

  // Close the modal
  $scope.closeModal = function() {
    $scope.modal.hide();
    $scope.modal.remove()
  };

});
