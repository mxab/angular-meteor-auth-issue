import angular from 'angular';
import 'angular-meteor';
import 'angular-meteor-auth';
import 'angular-ui-router';

function testAwait($auth, $timeout,$log) {
    const awaitUser = $auth.awaitUser();
    $log.debug("awaitUser in AUTH");
    let done = false;

    awaitUser.finally(() => {
        done = true;
        $log.debug('DONE AWAITING USER');
    });
    $timeout(function() {
        if (!done) {
            $log.debug('NOT DONE AFTER 5 Seconds');
        }

    }, 5000)

}
angular.module('app', ['angular-meteor', 'angular-meteor.auth', 'ui.router'])
    .controller('AppCtrl', function() {
        this.login = () => {
            Meteor.loginWithPassword('test', 'test');
        }
    })
    .run(testAwait)
    .run(testAwait)
    .run(testAwait)
    .run(testAwait)
    .run(testAwait)
    .run(testAwait)
    .run(testAwait)

.config(function($stateProvider, $locationProvider, $urlRouterProvider) {


    $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
    })
    $urlRouterProvider.otherwise('/')
    $stateProvider
        .state('home', {
            url: '/',
            template: "<div><p>This is the member area</p></div>",
            controller: function($log) {
                $log.info("in member areae")
            },
            resolve: {
                'currentUser': function($auth, $log) {
                    const awaitUser = $auth.awaitUser();
                    $log.debug("awaitUser in AUTH");
                    awaitUser.finally(() => {
                        $log.debug('DONE AWAITING USER');
                    });
                    return awaitUser;
                }
            }
        });
});

Meteor.startup(function() {
    angular.bootstrap(document.body, ['app']);
})
