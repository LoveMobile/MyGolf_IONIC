// Ionic MyGolf App

angular.module('mygolf', ['ionic','ionic.service.core', 'ionic.service.analytics', 'mygolf.controllers', 'mygolf.services', 'angularSoap'])

.run(['$ionicPlatform', '$ionicAnalytics', '$rootScope', function($ionicPlatform, $ionicAnalytics, $rootScope) {
  $ionicPlatform.ready(function() {
    $ionicAnalytics.register();
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);
    }
    $rootScope.StatusBar=false;
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      //StatusBar.styleDefault();
      StatusBar.hide();
      $rootScope.StatusBar=true;
    }
  });
}])

.run(['$rootScope', '$location', '$localStorage', '$http',
  function ($rootScope, $location, $localStorage, $http) {
      // keep user logged in after page refresh
      $rootScope.globals = $localStorage.getObject('globals') || {};
      /*if ($rootScope.globals.currentUser) {
          //$http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.authdata; // jshint ignore:line
          $location.path('/app/intro');
      }*/
      $rootScope.$on('$locationChangeStart', function (event, next, current) {
          // redirect to login page if not logged in
          if ($location.path() !== '/login' && !$rootScope.globals.currentUser) {
              $location.path('/login');
          }
      });
  }])

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

  .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
  })

  .state('login', {
    url: '/login',
    templateUrl: 'templates/login.html',
    controller: 'LoginCtrl'
  })

  .state('intro', {
    url: '/intro',
    templateUrl: 'templates/intro.html'
  })

  .state('manuals', {
    url: '/manuals',
    templateUrl: 'templates/manuals.html'
  })

  .state('videos', {
    url: '/videos',
    controller: 'VideosCtrl',
    templateUrl: 'templates/videos.html'
  })

  .state('lessons', {
    url: '/lessons',
    templateUrl: 'templates/lessons.html'
  })

  .state('app.grade', {
    url: '/grade/:gradeNum',
    controller: 'GradeCtrl',
    views: {
      'menuContent': {
        templateUrl: 'templates/intro.html',
        controller: 'GradeCtrl'
      },
      'menuItems': {
        templateUrl: 'templates/menu-sections.html',
        controller: 'SectionCtrl'
      }
    }
  })

  .state('app.section', {
    url: '/grade/:gradeNum/section/:sectionNum',
    views: {
      'menuContent': {
        templateUrl: 'templates/intro.html',
        controller: 'SectionCtrl'
      },
      'menuItems': {
        templateUrl: 'templates/menu-sections.html',
        controller: 'SectionCtrl'
      }
    }
  })

  .state('app.page', {
    url: '/grade/:gradeNum/section/:sectionNum/page/:pageNum',
    views: {
      'menuContent': {
        templateUrl: 'templates/page.html',
        controller: 'PageCtrl'
      },
      'menuItems': {
        templateUrl: 'templates/menu-sections.html',
        controller: 'SectionCtrl'
      }
    }
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/intro');
})

// Contents stucture and titles
.service('Contents', function () {

  var c = [
    {grade: '3-4', sections: [
      {section: 1, title: 'PROGRAM VISION, GOALS & PATHWAY', pages: [
        { page: 1, title: 'Program Vision, Goals & Pathway' }
      ]},
      {section: 2, title: 'MYGOLF SCHOOLS PROGRAM INFORMATION', pages: [
        { page: 1, title: 'MyGolf Schools Program Information' },
      ]},
      {section: 3, title: 'EQUIPMENT & SAFETY', pages: [
        { page: 1, title: 'Equipment' },
        { page: 2, title: 'Safety' },
      ]},
      {section: 4, title: 'SKILL DEVELOPMENT', pages: [
        { page: 1, title: 'Key Golf Skills' },
        { page: 2, title: 'Teaching Golf Instructional Points' },
        { page: 3, title: 'Life Skills' },
      ]},
      {section: 5, title: 'SESSION OUTLINES', pages: [
        { page: 1, title: 'Lesson 1: Introduction, Chipping & Full Swing', unique: true },
        { page: 2, title: 'Lesson 2: Chipping & Full Swing', unique: true },
        { page: 3, title: 'Lesson 3: Putting & Full Swing', unique: true },
        { page: 4, title: 'Lesson 4: Putting & Full Swing', unique: true },
        { page: 5, title: 'Lesson 5: Create a Course & Match Play', unique: true },
      ]},
      {section: 6, title: 'WARM UP ACTIVITIES', pages: [
        { page: 1, title: 'Follow the Leader' },
        { page: 2, title: 'Back to Back Pass' },
        { page: 3, title: 'Here, There & Everywhere' },
        { page: 4, title: 'Coach Says' },
        { page: 5, title: 'Stork Tag' },
        { page: 6, title: 'How Many Golf Balls?' },
        { page: 7, title: 'Flip It' },
        { page: 8, title: 'Ball Throw' },
      ]},
      {section: 7, title: 'GAMES & ACTIVITIES', pages: [
        { page: 1, title: 'Lawn Bowls', unique: true },
        { page: 2, title: 'Capture the Cones', unique: true },
        { page: 3, title: 'In the Box', unique: true },
        { page: 4, title: 'Bulls Eye Golf', unique: true },
        { page: 5, title: 'Chip & Catch', unique: true },
        { page: 6, title: 'On to the Green', unique: true },
        { page: 7, title: 'Over the River', unique: true },
        { page: 8, title: 'Longest Hit', unique: true },
        { page: 9, title: 'Footy Golf', unique: true },
        { page: 10, title: 'Danger Zone', unique: true },
      ]},
      {section: 8, title: 'ADDITIONAL GAMES & WET WEATHER CONTINGENCIES', pages: [
        { page: 1, title: 'Additional Games & Wet Weather Contingencies' },
      ]},
      {section: 9, title: 'SETTING UP YOUR  OWN GOLF COURSE', pages: [
        { page: 1, title: 'Setting Up Your Own Golf Course' },
      ]},
      {section: 10, title: 'STUDENT LEADERSHIP OPPORTUNITIES', pages: [
        { page: 1, title: 'Student Leadership Opportunities' },
      ]},
      {section: 11, title: 'ONLINE TEACHER TRAINING MODULE', pages: [
        { page: 1, title: 'Online Teacher Training Module' },
      ]},
      {section: 12, title: 'MYGOLF SCHOOL AMBASSADOR PROGRAM', pages: [
        { page: 1, title: 'MyGolf School Ambassador Program' },
      ]},
      {section: 13, title: 'MYGOLF CLUB CENTRE INFORMATION / KEY CONTACTS', pages: [
        { page: 1, title: 'MyGolf Club Centre Information' },
        { page: 2, title: 'National, State & Territory Golf Contacts' },
      ]},
    ]},
    {grade: '5-6', sections: [
      {section: 1, title: 'PROGRAM VISION, GOALS & PATHWAY', pages: [
        { page: 1, title: 'Program Vision, Goals & Pathway' }
      ]},
      {section: 2, title: 'MYGOLF SCHOOLS PROGRAM INFORMATION', pages: [
        { page: 1, title: 'MyGolf Schools Program Information' },
      ]},
      {section: 3, title: 'EQUIPMENT & SAFETY', pages: [
        { page: 1, title: 'Equipment' },
        { page: 2, title: 'Safety' },
      ]},
      {section: 4, title: 'SKILL DEVELOPMENT', pages: [
        { page: 1, title: 'Key Golf Skills' },
        { page: 2, title: 'Teaching Golf Instructional Points' },
        { page: 3, title: 'Life Skills' },
      ]},
      {section: 5, title: 'SESSION OUTLINES', pages: [
        { page: 1, title: 'Lesson 1: Introduction, Chipping & Full Swing', unique: true },
        { page: 2, title: 'Lesson 2: Chipping & Full Swing', unique: true },
        { page: 3, title: 'Lesson 3: Putting & Full Swing', unique: true },
        { page: 4, title: 'Lesson 4: Putting & Full Swing', unique: true },
        { page: 5, title: 'Lesson 5: Create a Course & Match Play', unique: true },
      ]},
      {section: 6, title: 'WARM UP ACTIVITIES', pages: [
        { page: 1, title: 'Follow the Leader' },
        { page: 2, title: 'Back to Back Pass' },
        { page: 3, title: 'Here, There & Everywhere' },
        { page: 4, title: 'Coach Says' },
        { page: 5, title: 'Stork Tag' },
        { page: 6, title: 'How Many Golf Balls?' },
        { page: 7, title: 'Flip It' },
        { page: 8, title: 'Ball Throw' },
      ]},
      {section: 7, title: 'GAMES & ACTIVITIES', pages: [
        { page: 1, title: 'Lawn Bowls', unique: true },
        { page: 2, title: 'Capture the Cones', unique: true },
        { page: 3, title: 'In the Box', unique: true },
        { page: 4, title: 'Bulls Eye Golf', unique: true },
        { page: 5, title: 'Chip & Catch', unique: true },
        { page: 6, title: 'On to the Green', unique: true },
        { page: 7, title: 'Over the River', unique: true },
        { page: 8, title: 'Longest Hit', unique: true },
        { page: 9, title: 'Footy Golf', unique: true },
        { page: 10, title: 'Danger Zone', unique: true },
      ]},
      {section: 8, title: 'ADDITIONAL GAMES & WET WEATHER CONTINGENCIES', pages: [
        { page: 1, title: 'Additional Games & Wet Weather Contingencies' },
      ]},
      {section: 9, title: 'SETTING UP YOUR  OWN GOLF COURSE', pages: [
        { page: 1, title: 'Setting Up Your Own Golf Course' },
      ]},
      {section: 10, title: 'STUDENT LEADERSHIP OPPORTUNITIES', pages: [
        { page: 1, title: 'Student Leadership Opportunities' },
      ]},
      {section: 11, title: 'ONLINE TEACHER TRAINING MODULE', pages: [
        { page: 1, title: 'Online Teacher Training Module' },
      ]},
      {section: 12, title: 'MYGOLF SCHOOL AMBASSADOR PROGRAM', pages: [
        { page: 1, title: 'MyGolf School Ambassador Program' },
      ]},
      {section: 13, title: 'MYGOLF CLUB CENTRE INFORMATION / KEY CONTACTS', pages: [
        { page: 1, title: 'MyGolf Club Centre Information' },
        { page: 2, title: 'National, State & Territory Golf Contacts' },
      ]},
    ]},
    {grade: '7-8', sections: [
      {section: 1, title: 'PROGRAM VISION, GOALS & PATHWAY', pages: [
        { page: 1, title: 'Program Vision, Goals & Pathway' }
      ]},
      {section: 2, title: 'MYGOLF SCHOOLS PROGRAM INFORMATION', pages: [
        { page: 1, title: 'MyGolf Schools Program Information' },
      ]},
      {section: 3, title: 'EQUIPMENT & SAFETY', pages: [
        { page: 1, title: 'Equipment' },
        { page: 2, title: 'Safety' },
      ]},
      {section: 4, title: 'SKILL DEVELOPMENT', pages: [
        { page: 1, title: 'Key Golf Skills' },
        { page: 2, title: 'Teaching Golf Instructional Points' },
        { page: 3, title: 'Life Skills' },
      ]},
      {section: 5, title: 'SESSION OUTLINES', pages: [
        { page: 1, title: 'Lesson 1: Introduction, Chipping & Full Swing', unique: true },
        { page: 2, title: 'Lesson 2: Chipping & Full Swing', unique: true },
        { page: 3, title: 'Lesson 3: Putting & Full Swing', unique: true },
        { page: 4, title: 'Lesson 4: Putting & Full Swing', unique: true },
        { page: 5, title: 'Lesson 5: Create a Course & Match Play', unique: true },
      ]},
      {section: 6, title: 'WARM UP ACTIVITIES', pages: [
        { page: 1, title: 'Follow the Leader' },
        { page: 2, title: 'Back to Back Pass' },
        { page: 3, title: 'Here, There & Everywhere' },
        { page: 4, title: 'Coach Says' },
        { page: 5, title: 'Stork Tag' },
        { page: 6, title: 'How Many Golf Balls?' },
        { page: 7, title: 'Flip It' },
        { page: 8, title: 'Ball Throw' },
      ]},
      {section: 7, title: 'GAMES & ACTIVITIES', pages: [
        { page: 1, title: 'Lawn Bowls', unique: true },
        { page: 2, title: 'Capture the Cones', unique: true },
        { page: 3, title: 'In the Box', unique: true },
        { page: 4, title: 'Bulls Eye Golf', unique: true },
        { page: 5, title: 'Chip & Catch', unique: true },
        { page: 6, title: 'On to the Green', unique: true },
        { page: 7, title: 'Over the River', unique: true },
        { page: 8, title: 'Longest Hit', unique: true },
        { page: 9, title: 'Footy Golf', unique: true },
        { page: 10, title: 'Danger Zone', unique: true },
      ]},
      {section: 8, title: 'ADDITIONAL GAMES & WET WEATHER CONTINGENCIES', pages: [
        { page: 1, title: 'Additional Games & Wet Weather Contingencies' },
      ]},
      {section: 9, title: 'SETTING UP YOUR  OWN GOLF COURSE', pages: [
        { page: 1, title: 'Setting Up Your Own Golf Course' },
      ]},
      {section: 10, title: 'STUDENT LEADERSHIP OPPORTUNITIES', pages: [
        { page: 1, title: 'Student Leadership Opportunities' },
      ]},
      {section: 11, title: 'ONLINE TEACHER TRAINING MODULE', pages: [
        { page: 1, title: 'Online Teacher Training Module' },
      ]},
      {section: 12, title: 'MYGOLF SCHOOL AMBASSADOR PROGRAM', pages: [
        { page: 1, title: 'MyGolf School Ambassador Program' },
      ]},
      {section: 13, title: 'MYGOLF CLUB CENTRE INFORMATION / KEY CONTACTS', pages: [
        { page: 1, title: 'MyGolf Club Centre Information' },
        { page: 2, title: 'National, State & Territory Golf Contacts' },
      ]},
    ]},
    {grade: '9-10', sections: [
      {section: 1, title: 'PROGRAM VISION, GOALS & PATHWAY', pages: [
        { page: 1, title: 'Program Vision, Goals & Pathway' }
      ]},
      {section: 2, title: 'MYGOLF SCHOOLS PROGRAM INFORMATION', pages: [
        { page: 1, title: 'MyGolf Schools Program Information' },
      ]},
      {section: 3, title: 'EQUIPMENT & SAFETY', pages: [
        { page: 1, title: 'Equipment' },
        { page: 2, title: 'Safety' },
      ]},
      {section: 4, title: 'SKILL DEVELOPMENT', pages: [
        { page: 1, title: 'Key Golf Skills' },
        { page: 2, title: 'Teaching Golf Instructional Points' },
        { page: 3, title: 'Life Skills' },
      ]},
      {section: 5, title: 'SESSION OUTLINES', pages: [
        { page: 1, title: 'Lesson 1: Introduction, Chipping & Full Swing', unique: true },
        { page: 2, title: 'Lesson 2: Chipping & Full Swing', unique: true },
        { page: 3, title: 'Lesson 3: Putting & Full Swing', unique: true },
        { page: 4, title: 'Lesson 4: Putting & Full Swing', unique: true },
        { page: 5, title: 'Lesson 5: Create a Course & Match Play', unique: true },
      ]},
      {section: 6, title: 'WARM UP ACTIVITIES', pages: [
        { page: 1, title: 'Follow the Leader' },
        { page: 2, title: 'Back to Back Pass' },
        { page: 3, title: 'Here, There & Everywhere' },
        { page: 4, title: 'Coach Says' },
        { page: 5, title: 'Stork Tag' },
        { page: 6, title: 'How Many Golf Balls?' },
        { page: 7, title: 'Flip It' },
        { page: 8, title: 'Ball Throw' },
      ]},
      {section: 7, title: 'GAMES & ACTIVITIES', pages: [
        { page: 1, title: 'Lawn Bowls', unique: true },
        { page: 2, title: 'Capture the Cones', unique: true },
        { page: 3, title: 'In the Box', unique: true },
        { page: 4, title: 'Bulls Eye Golf', unique: true },
        { page: 5, title: 'Chip & Catch', unique: true },
        { page: 6, title: 'On to the Green', unique: true },
        { page: 7, title: 'Over the River', unique: true },
        { page: 8, title: 'Longest Hit', unique: true },
        { page: 9, title: 'Footy Golf', unique: true },
        { page: 10, title: 'Danger Zone', unique: true },
      ]},
      {section: 8, title: 'ADDITIONAL GAMES & WET WEATHER CONTINGENCIES', pages: [
        { page: 1, title: 'Additional Games & Wet Weather Contingencies' },
      ]},
      {section: 9, title: 'SETTING UP YOUR  OWN GOLF COURSE', pages: [
        { page: 1, title: 'Setting Up Your Own Golf Course' },
      ]},
      {section: 10, title: 'STUDENT LEADERSHIP OPPORTUNITIES', pages: [
        { page: 1, title: 'Student Leadership Opportunities' },
      ]},
      {section: 11, title: 'ONLINE TEACHER TRAINING MODULE', pages: [
        { page: 1, title: 'Online Teacher Training Module' },
      ]},
      {section: 12, title: 'MYGOLF SCHOOL AMBASSADOR PROGRAM', pages: [
        { page: 1, title: 'MyGolf School Ambassador Program' },
      ]},
      {section: 13, title: 'MYGOLF CLUB CENTRE INFORMATION / KEY CONTACTS', pages: [
        { page: 1, title: 'MyGolf Club Centre Information' },
        { page: 2, title: 'National, State & Territory Golf Contacts' },
      ]},
    ]},
    {grade: 'sporting', sections: [
      {section: 1, title: 'PROGRAM VISION, GOALS & PATHWAY', pages: [
        { page: 1, title: 'Program Vision, Goals & Pathway', unique: true }
      ]},
      {section: 2, title: 'MYGOLF SCHOOLS PROGRAM INFORMATION', pages: [
        { page: 1, title: 'MyGolf Sporting Schools Program Information', unique: true },
      ]},
      {section: 3, title: 'EQUIPMENT & SAFETY', pages: [
        { page: 1, title: 'Equipment', unique: true },
        { page: 2, title: 'Safety', unique: true },
      ]},
      {section: 4, title: 'SKILL DEVELOPMENT', pages: [
        { page: 1, title: 'Key Golf Skills' },
        { page: 2, title: 'Teaching Golf Instructional Points' },
        { page: 3, title: 'Life Skills' },
      ]},
      {section: 5, title: 'SESSION OUTLINES', pages: [
        { page: 1, title: 'Lesson 1: Introduction, Chipping & Full Swing', unique: true },
        { page: 2, title: 'Lesson 2: Chipping & Full Swing', unique: true },
        { page: 3, title: 'Lesson 3: Putting & Full Swing', unique: true },
        { page: 4, title: 'Lesson 4: Create a Course & Match Play', unique: true },
      ]},
      {section: 6, title: 'WARM UP ACTIVITIES', pages: [
        { page: 1, title: 'Follow the Leader' },
        { page: 2, title: 'Back to Back Pass' },
        { page: 3, title: 'Here, There & Everywhere' },
        { page: 4, title: 'Coach Says' },
        { page: 5, title: 'Stork Tag' },
        { page: 6, title: 'How Many Golf Balls?' },
        { page: 7, title: 'Flip It' },
        { page: 8, title: 'Ball Throw' },
      ]},
      {section: 7, title: 'GAMES & ACTIVITIES', pages: [
        { page: 1, title: 'Lawn Bowls', unique: true },
        { page: 2, title: 'Capture the Cones', unique: true },
        { page: 3, title: 'In the Box', unique: true },
        { page: 4, title: 'Bulls Eye Golf', unique: true },
        { page: 5, title: 'Chip & Catch', unique: true },
        { page: 6, title: 'On to the Green', unique: true },
        { page: 7, title: 'Over the River', unique: true },
        { page: 8, title: 'Longest Hit', unique: true },
        { page: 9, title: 'Footy Golf', unique: true },
        { page: 10, title: 'Danger Zone', unique: true },
      ]},
      {section: 8, title: 'ADDITIONAL GAMES & WET WEATHER CONTINGENCIES', pages: [
        { page: 1, title: 'Additional Games & Wet Weather Contingencies', unique: true },
      ]},
      {section: 9, title: 'SETTING UP YOUR  OWN GOLF COURSE', pages: [
        { page: 1, title: 'Setting Up Your Own Golf Course' },
      ]},
      {section: 10, title: 'STUDENT LEADERSHIP OPPORTUNITIES', pages: [
        { page: 1, title: 'Student Leadership Opportunities', unique: true },
      ]},
      {section: 11, title: 'ONLINE TEACHER TRAINING MODULE', pages: [
        { page: 1, title: 'Online Teacher Training Module' },
      ]},
      {section: 12, title: 'MYGOLF SCHOOL AMBASSADOR PROGRAM', pages: [
        { page: 1, title: 'MyGolf School Ambassador Program' },
      ]},
      {section: 13, title: 'MYGOLF CLUB CENTRE INFORMATION / KEY CONTACTS', pages: [
        { page: 1, title: 'MyGolf Club Centre Information' },
        { page: 2, title: 'National, State & Territory Golf Contacts' },
      ]},
    ]}
  ];

  var videos = [
    { section: 7, page: 1, video: 'Lawn Bowls 6.mp4' },
    { section: 7, page: 2, video: 'Capture the Cones 6.mp4' },
    { section: 7, page: 3, video: 'In the Box 6.mp4' },
    { section: 7, page: 4, video: 'Bullseye golf 6.mp4' },
    { section: 7, page: 5, video: 'Chip and Catch 6.mp4' },
    { section: 7, page: 6, video: 'Onto the Green 6.mp4' },
    { section: 7, page: 7, video: 'Over the River 6.mp4' },
    { section: 7, page: 8, video: 'Longest Hit 6.mp4' },
    { section: 7, page: 9, video: 'Footy Golf 6.mp4' },
    { section: 7, page: 10, video: 'Danger Zone 6.mp4' },
  ];

  return {

    // Returns all Contents data
    get: function () {
      return c;
    },

    // Returns data for specific page
    // or false if page not found
    getNextParams: function (grade, section, page) {
      var returnNextPage=false;
      for (var i=0; i <= c.length - 1; i++) {
        if (c[i].grade === grade) {
          var s=c[i].sections;
          for (var x = 0; x <= s.length - 1; x++) {
            if (s[x].section == section || returnNextPage) {
              var p=s[x].pages;
              for (var y = 0; y <= p.length - 1; y++) {
                if (returnNextPage) {
                  return {
                    gradeNum: c[i].grade,
                    sectionNum: s[x].section,
                    pageNum: p[y].page,
                  };
                }
                if (p[y].page == page) {
                  returnNextPage=true;
                }
              };
            }
          };
        }
      };
      return false;
    },

    // Returns data for specific page
    // or false if page not found
    getPageVideo: function (section, page) {
      for (var i = videos.length - 1; i >= 0; i--) {
        if (videos[i].section == section && videos[i].page == page) {
          return 'video/'+videos[i].video;
        }
      };
      return false;
    },

    // Returns data for specific page
    // or false if page not found
    getPage: function (grade, section, page) {
      for (var i = c.length - 1; i >= 0; i--) {
        if (c[i].grade === grade) {
          var s=c[i].sections;
          for (var x = s.length - 1; x >= 0; x--) {
            if (s[x].section == section) {
              var p=s[x].pages;
              for (var y = p.length - 1; y >= 0; y--) {
                if (p[y].page == page) {
                  return p[y];
                }
              };
            }
          };
        }
      };
      return false;
    },

    // Returns data for specific section
    // or false if section not found
    getSection: function (grade, section) {
      for (var i = c.length - 1; i >= 0; i--) {
        if (c[i].grade === grade) {
          var s=c[i].sections;
          for (var x = s.length - 1; x >= 0; x--) {
            if (s[x].section == section) {
              return s[x];
            }
          };
        }
      };
      return false;
    },

    // Returns all sections data for specific grade
    // or false if grade not found
    getAllSections: function (grade) {
      for (var i = c.length - 1; i >= 0; i--) {
        if (c[i].grade === grade)
          return c[i].sections;
      };
      return false;
    }

  };

});
