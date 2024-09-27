var app = angular.module('recipeApp', []);

app.controller('RecipeController', function($scope, $http) {
    $scope.recipes = [];
    $scope.loading = false;
    $scope.error = '';
    
    // Function to search for recipes based on ingredients
    $scope.searchRecipes = function() {
        $scope.loading = true;
        $scope.error = '';
        
        // Convert user input to lowercase for consistency
        var search = $scope.searchQuery.toLowerCase();
        
        // Construct the API URL
        var url = 'https://api.spoonacular.com/recipes/findByIngredients?apiKey=9041fdff59e7495ba9ae0d5607683c20&ingredients=' + encodeURIComponent(search);
        
        // Fetch data from the Spoonacular API
        $http.get(url)
            .then(function(response) {
                // Log the API response to inspect data structure
                console.log('API response:', response);
                
                // Set the recipes based on the API response
                $scope.recipes = response.data;
                $scope.loading = false;

                // Handle case when no recipes are found
                if ($scope.recipes.length === 0) {
                    $scope.error = 'No recipes found for the given ingredients.';
                }
            })
            .catch(function(error) {
                // Handle errors and display a message to the user
                $scope.error = 'An error occurred while fetching recipes. Please try again later.';
                console.error('Error fetching data:', error);
                $scope.loading = false;
            });
    };
});
