(function (angular) {
  'use strict';

  angular.module('app', []);

  // Data
  angular.module('app').controller('verseCtrl', ['$scope', '$http', function ($scope, $http) {
    var url = 'https://api.rss2json.com/v1/api.json?rss_url=http%3A%2F%2Fwww.biblegateway.com%2Fvotd%2Fget%2F%3Fformat%3Datom';

    $scope.waitFor = $http.get(url)
      .then(function (response) {
        var entry = response.data.items[0];
        $scope.feed = {
          title: entry.title,
          content: entry.content
        };
      })
      .catch(function (error) {
        // Fallback to a good verse
        $scope.feed = {
          title: '1 Thessalonians 5:18',
          content: 'give thanks in all circumstances; for this is God’s will for you in Christ Jesus.'
        };
      })
      .finally(function () {
        $scope.loaded = true;
      });
  }]);

  // Slideshow
  angular.module('app').directive('dbvSlideshow', function () {
    return {
      restrict: 'A',
      scope: {
        waitFor: '='
      },
      link: function ($scope, $element) {
        $scope.$watch('waitFor', function (promise) {
          if (promise) {
            promise.finally(function () {
              showBackgroundImage($element);
            });
          }
        });

        var imageUrls = getImageUrls();
        var index = getRandomInt(0, imageUrls.length);
        var path = imageUrls[index];
        hideBackgroundImage($element);
        setBackgroundImage($element, path);

        // TODO: Set up interval for swapping background image after X seconds
        // TODO: Determine hwo to properly handle responsive images
        // TODO: Make sure images are cached after the first request
      }
    };

    function getImageUrls() {
      return [
        'images/bg-fishing.jpg',
        'images/bg-forest-1.jpg',
        'images/bg-forest-2.jpg',
        'images/bg-landscape.jpg',
        'images/bg-mountains.jpg',
        'images/bg-pine.jpg'
      ];
    }

    function getRandomInt(min, max) {
      return Math.floor(Math.random() * (max - min)) + min;
    }

    function setBackgroundImage($element, imagePath) {
      $element.css('background-image', 'url(' + imagePath + ')');
    }

    function hideBackgroundImage($element) {
      $element.css('background-size', '0 0');
    }

    function showBackgroundImage($element) {
      $element.css('background-size', null);
    }

  });

}(window.angular));
