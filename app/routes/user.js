import Ember from 'ember';

var HomeRoute = Ember.Route.extend({

    beforeModel: function(router) {
        var logged = false;
        console.log(logged, router)
        Ember.run.next(function() {
            if (logged) {
                router.transitionTo('profile');
            } else {
                router.transitionTo('login');
            }
        });
    }

});

export default HomeRoute;

