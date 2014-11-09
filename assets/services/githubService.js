'use strict';

myApp.service('githubService', function ($http) {

    this.listRepositories = function () {
        
        return $http.get('https://api.github.com/orgs/elasticsearch/repos?page=1&per_page=10');
    };

    this.getCommits = function (repository, page) {
        return $http.get('https://api.github.com/repos/elasticsearch/'+repository+'/commits?page='+page+'&per_page=20');
    }

    this.getContribCount = function (repository) {
        return $http.get('https://api.github.com/repos/elasticsearch/'+repository+'/contributors');
    }

});