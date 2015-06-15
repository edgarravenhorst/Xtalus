import Ember from 'ember';

var MeController = Ember.Controller.extend({

    actions: {
        updatePerson:function() {

            this.model.get('isisObj').then(function(isisObj){

                console.log(this.model.get('birthDay'))
                isisObj.updatePerson.invoke({
                    firstName:this.model.get('firstName'),
                    middleName:this.model.get('middleName'),
                    lastName:this.model.get('lastName'),
                    dateOfBirth:this.model.get('birthDay'),
                }).then(function(result){
                    console.log(result);
                });
            }.bind(this));

        },
    }

});

export default MeController;
