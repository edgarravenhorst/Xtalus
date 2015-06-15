import Ember from 'ember';

var MeController = Ember.Controller.extend({

    actions: {
        updatePerson:function() {

            var activePerson = this.controller.get('activePerson');
            console.log(activePerson)
            activePerson.updatePerson.invoke({
                firstName:this.get('firstName'),
                lastName:this.get('lastName'),
                dateOfBirth:this.get('birthDate'),
            }).then(function(result){
                console.log(result);
            });
        },
    }

});

export default MeController;
