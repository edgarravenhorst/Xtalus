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

                $ISIS.auth.login(formdata.username, formdata.password).then(function(data){
                    console.log(data);

                    if(formdata.entity.value === 'student'){
                        console.log(formdata)
                        app.createStudent.invoke({
                            firstName: formdata.firstname,
                            middleName: formdata.middlename,
                            lastName: formdata.lastname,
                            dateOfBirth: formdata.birthday,
                        }).then(function(result){
                            console.log('person created:', result);
                        })
                    }
                });

            });
        }
    },
});

export default RegistrationRoute;
