angular.module('app', []).
controller('verseCtrl', ['$scope', '$http', function($scope, $http){
  var feedUrl = 'http://www.biblegateway.com/votd/get/?format=atom';
  var url = 'https://ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=50&callback=JSON_CALLBACK&q=' + encodeURIComponent(feedUrl);
  $http.jsonp(url).
    success(function(data, status, headers, config) {
      var entry = data.responseData.feed.entries[0];
      $scope.feed = {
        title: entry.title,
        content: entry.content
      };
    }).
    error(function(data, status, headers, config) {
      console.error('Error fetching feed:', data);
    });
}]);