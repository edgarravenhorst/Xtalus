import Ember from 'ember';

var ProfileIndexRoute = Ember.Route.extend({
    model: function() {
        console.log(this.modelFor('application'));
        return {
            activePerson: this.modelFor('application'),
            profile:this.modelFor('profile')
        }
    },

    setupController: function(controller, model) {
        var activePerson = model.activePerson;
        var profile = model.profile;

        var picture = profile.picture.split(':');
        var fullname = profile.firstName + " " + profile.lastName
        if (profile.middleName) fullname = profile.firstName + " " + profile.middleName + " " + profile.lastName

        controller.setProperties({
            activePerson: activePerson,
            fullname: fullname,
            birthdate: profile.dateOfBirth,
            roles: profile.roles,
            profilePicture: 'data:image/png;base64,'+picture[2],
        });

        profile.collectSupplies.extract().then(function(result){
            return result[0].collectSupplyProfiles.extract().then(function(result) {
                return result[0].collectProfileElements.extract();
            });
        }).then(function(supplies){

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
        });
    },
});

export default ProfileIndexRoute;
