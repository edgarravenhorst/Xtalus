import Ember from 'ember';
import UserController from '../user';
/* global $ISIS */

var ProfileIndexController = UserController.extend({

    title:'',

    init: function() {
        this._super();
        this.initPerson().then(this.setUserData.bind(this));
        console.log('been here')
    },

    setUserData: function(person){
        self = this;

        this.setProperties({
            birthdate: person.dateOfBirth,
            roles: person.roles
        });

        person.collectSupplies.extract().then(function(result){
            return result[0].collectSupplyProfiles.extract().then(function(result) {
                return result[0].collectProfileElements.extract();
            });
        }).then(function(result){
            $.each(result, function(i, supply){

                if (supply.profileElementDescription === "PASSION_ELEMENT"){
                    self.set('passion', supply.textValue);
                }

                if (supply.profileElementDescription === 'QUALITY_TAGS_ELEMENT'){
                    supply.collectTagHolders.extract().then(function(result){
                        var qualities = [];
                        $.each(result, function(i, tagholder){
                            qualities.push(tagholder.tag.title);
                        });
                        self.set('qualities', qualities);
                    })
                }
            });
        });
    }
});

export default ProfileIndexController;
