import angular from 'angular'
import 'angular-meteor'
import 'angular-meteor-auth'


angular.module('app',['angular-meteor','angular-meteor.auth'])
.run(function($auth,$log){
  $log.info('$auth testing');
  $auth.requireUser().then(u=>{
    $log.info('requireUser SUCCESS',u);

  }, err=>{
    $log.warn('requireUser ERROR',err);
  });
  $auth.waitForUser().then(u=>{
    $log.info('waitForUser SUCCESS',u);
  }, err=>{
    $log.warn('waitForUser ERROR',err);
  });
})

Meteor.startup(function(){
  angular.bootstrap(document.body, ['app']);
})
