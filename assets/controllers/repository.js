myApp.controller('repositoryController', function repositoryController($scope, githubService) {

	function init() {
		$scope.notLoaded = true;

		$scope.repositories = [];
		$scope.commits = [];

		$scope.current_repository = {};

		$scope.stars = 0;
		$scope.forks = 0;
		$scope.contribs = 0;

		var COMMIT_PAGE = 1;
		var current_repository;
		getRepositories();
	}

	$scope.loadRepositoryData = function (repo) {
		$scope.notLoaded = false;
		COMMIT_PAGE = 1;
		$scope.current_repository = repo;

		$scope.stars = repo.stargazers_count;
		$scope.forks = repo.forks_count;
		
		githubService.getContribCount(repo.name)
			.then(function (response) {
				$scope.contribs = response.data.length;
			});

		githubService.getCommits(repo.name, COMMIT_PAGE)
			.then(function (response) {
				$scope.commits = response.data;
			});
	};

	$scope.loadMoreCommits = function () {
		githubService.getCommits($scope.current_repository.name, COMMIT_PAGE)
			.then(function (response) {
				$scope.commits.push(response.data);
			});

		COMMIT_PAGE += 1;
	};

	function getRepositories () {
		githubService.listRepositories()
			.then(function (response) {
                $scope.repositories = response.data;
            });;
	};

	init();
});