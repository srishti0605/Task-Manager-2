// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('todo', ['ionic'])


.factory('Tasks', function() {
  return {
    all: function() {
      var task = window.localStorage['tasks'];
      if(task) {
        return angular.fromJson(task);
      }
      return [];
    },
    save: function(tasks) {
      window.localStorage['tasks'] = angular.toJson(tasks);
    },
    newTask: function(task) {
      // Add a new project
      return {
        title:task.title,
		desc:task.desc
      
      };
    },
    getLastActiveIndex: function() {
      return parseInt(window.localStorage['lastActiveTask']) || 0;
    },
    setLastActiveIndex: function(index) {
      window.localStorage['lastActiveTask'] = index;
    }
  }
})



.controller('TodoCtrl', function($scope, $timeout, $ionicModal, Tasks, $ionicSideMenuDelegate) {
  $scope.tasks=[];
  $scope.task = {
	    title:"",
		date:"",
		desc:"",
		priority:""
  };
	
  
$scope.tasks = Tasks.all();

  // Grab the last active, or the first project
  

  // Called to create a new project
    
  // No need for testing data anymore
  
  
  // Create and load the Modal
  $ionicModal.fromTemplateUrl('new-task.html', function(modal) {
    $scope.taskModal = modal;
  }, {
    scope: $scope,
    animation: 'slide-in-up'
  });
  
  $scope.newTask = function() {
    $scope.taskModal.show();
  };
  
  
  
  // Called when the form is submitted
  $scope.createTask = function(task) {
    $scope.tasks.push({
      title:task.title,
	  date:task.date.toUTCString(),
	  desc:task.desc,
	  priority:task.priority
    });
	
	$scope.activeTask.tasks.push({
      title:task.title,
	  date:task.date.toUTCString(),
	  desc:task.desc,
	  priority:task.priority
    });
	Tasks.save($scope.tasks);

    //$scope.selectTask(newTask, $scope.tasks.length-1);
    $scope.taskModal.hide();
 
  };
  // Open our new task modal
  
  $scope.selectTask = function(task, index) {
    $scope.activeTask = task;
    Tasks.setLastActiveIndex(index);
    //$ionicSideMenuDelegate.toggleLeft(false);
  };


  
  // Close the new task modal
  $scope.closeNewTask = function() {
    $scope.taskModal.hide();
  };
  
  ///////////////////////////////////////////// View Task//////////////////////////////////////////
  
  $ionicModal.fromTemplateUrl('show-task.html', function(modal2) {
    $scope.mod2 = modal2;
  }, {
    scope: $scope,
    animation: 'slide-in-up'
  });
  
  //$scope.activeTask = $scope.tasks[Tasks.getLastActiveIndex()];
	$scope.showTask = function(task,index) {
	$scope.activeTask = task;
    Tasks.setLastActiveIndex(index);
    $scope.mod2.show();
	//tasks[index].show();
  };
  $scope.closeShowTask = function() {
    $scope.mod2.hide();
  };
  
  
  /////////////////////////////////////////////Update Task//////////////////////////////////////////
  $ionicModal.fromTemplateUrl('update-task.html', function(modal3) {
    $scope.mod3 = modal3;
  }, {
    scope: $scope,
    animation: 'slide-in-up'
	
	
  });
	
  $scope.updateTask = function() {
   
	$scope.mod2.hide();
	$scope.mod3.show();
	
  };
  $scope.closeupdateTask = function() {
 
	$scope.mod3.hide();
  };
  $scope.modifyTask = function(task) {
     $scope.mod3.hide();
	  $activeTask=task;
	  activeTask.title=task.title//=this.title;
	  activeTask.date=task.date//=this.date;
	  activeTask.desc=task.desc//=this.desc;
	  activeTask.priority=task.priority//=this.priority;
 
    
 
  };
  $scope.deleteTask=function(task,index) {
	 $scope.activeTask = task;
    //Tasks.setLastActiveIndex(index);
    
	//  $scope.activeTask = task;
    //Tasks.setLastActiveIndex(index);
    
  //const index=tasks.indexOf(task);
  this.tasks=$scope.tasks.splice(index-1);
  this.activeTask=$scope.activeTask.tasks.splice(index-1);
  Tasks.save($scope.tasks);
};
  
})
