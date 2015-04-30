import Ember from 'ember';
/* global $ */

var MeIndexRoute = Ember.Route.extend({
    model: function() {
        var activePerson = this.modelFor('me');
        return activePerson.collectSupplies.extract().then(function(result){
            return result[0].collectSupplyProfiles.extract().then(function(result) {
                return result[0].collectProfileElements.extract();
            });
        });
    },

    setupController: function(controller, supplies) {
        var activePerson = this.modelFor('me');
        var picture = activePerson.picture.split(':');

        controller.setProperties({
            birthdate: activePerson.dateOfBirth,
            roles: activePerson.roles,
            fullname: activePerson.fullname,
            profilePicture: 'data:image/png;base64,'+picture[2],
        });

        $.each(supplies, function(i, supply){

            if (supply.profileElementDescription === "PASSION_ELEMENT"){
                controller.set('passion', supply.textValue);
            }

            if (supply.profileElementDescription === 'QUALITY_TAGS_ELEMENT'){
                supply.collectTagHolders.extract().then(function(result){
                    var qualities = [];
                    $.each(result, function(i, tagholder){
                        qualities.push(tagholder.tag.title);
                    });
                    controller.set('qualities', qualities);
                });
            }
        });
    },
});

export default MeIndexRoute;
