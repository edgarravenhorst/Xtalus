import Ember from 'ember';

var RegistrationRoute = Ember.Route.extend({

    model: function(params, transition) {
        return this.store.createRecord('person');
    },

    setupController: function(controller, model) {
    },

    actions: {
        //{"username" : "hoi1234" , "password" : "hoi", "passwordConfirm" : "hoi", "email" : "email.johan@somewhere.nl"}
        //$ISIS.put('http://acc.xtalus.gedge.nl/simple/restful/register')

        submitRegistration: function(e) {

            var app = this.modelFor('application').isis;

            var formdata = this.controller.get('formdata');
            var params = {
                username:formdata.username,
                password:formdata.password,
                passwordConfirm:formdata.passwordConfirm,
                email:formdata.email,
            }

            $ISIS.post('http://acc.xtalus.gedge.nl/simple/restful/register', params, false)
                .then(function(result){
                console.log('registration:', formdata.entity);

                if(formdata.entity.value === 'student'){
                    app.createStudent.invoke({
                        firstName: formdata.firstname,
                        middleName: formdata.firstname,
                        lastName: formdata.firstname,
                        dateOfBirth: '1962-07-16',
                    })
                }
            });


        }
    },
});

export default RegistrationRoute;
