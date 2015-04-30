import Ember from 'ember';
/* global $ */

var ProfileIndexController = Ember.Controller.extend({

    setPersonData: function(person){
        var self = this;

        var picture = person.picture.split(':');
        this.setProperties({
            birthdate: person.dateOfBirth,
            roles: person.roles,
            profilePicture: 'data:image/png;base64,'+picture[2],
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
                    });
                }

            });
        });
    }
});

export default ProfileIndexController;
