import Ember from 'ember';

var RegistrationRoute = Ember.Route.extend({

    model: function(params, transition) {

    },

    setupController: function(controller, model) {

    },

    actions: {
        //{"username" : "hoi1234" , "password" : "hoi", "passwordConfirm" : "hoi", "email" : "email.johan@somewhere.nl"}
        //$ISIS.put('http://acc.xtalus.gedge.nl/simple/restful/register')
        submitRegistration: function(e) {
            $ISIS.init('http://acc.xtalus.gedge.nl/simple/restful/register', 'PUT', params).then(function(result){
                console.log('put:', result);
            });
        }
    },
});

export default RegistrationRoute;
