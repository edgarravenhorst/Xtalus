import Ember from 'ember';
import UserRoute from '../user';

var ProfileGetRoute = Ember.Route.extend({
    model: function(params) {
        var activePerson = this.modelFor('user');
        return activePerson.collectSupplies.extract().then(function(result){
            return result[0].collectSupplyProfiles.extract().then(function(result) {
                return result[0].collectProfileElements.extract();
            });
        })
    },

    setupController: function(controller, supplies) {
        var activePerson = this.modelFor('user');
        var picture = activePerson.picture.split(':');

        controller.setProperties({
            birthdate: activePerson.dateOfBirth,
            roles: activePerson.roles,
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
                })
            }
        });
    },
});

export default ProfileGetRoute;
