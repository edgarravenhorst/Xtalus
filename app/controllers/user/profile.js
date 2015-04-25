import Ember from 'ember';
import UserController from '../user';
/* global $ISIS */

var ProfileController = UserController.extend({

    title:'',

    init: function() {
        this._super();
        this.initPerson().then(this.setUserData.bind(this));
    },

    setUserData: function(person){
        self = this;
        console.log(person);

        person.collectSupplies.extract(function(supplies){
            console.log('supplies:', supplies);
            supplies[0].collectSupplyProfiles.extract(function(result) {
                console.log('supplies:', result);
                result[0].collectProfileElements.extract(function(result) {
                    console.log('supplies:', result);

                    $.each(result, function(i, supply){
                        if (supply.profileElementDescription == "PASSION_ELEMENT"){
                            self.set('passion', supply.textValue);
                        }

                        if (supply.profileElementDescription == 'QUALITY_TAGS_ELEMENT'){
                            supply.collectTagHolders.extract(function(result){
                                var qualities = [];
                                $.each(result, function(i, tagholder){
                                    qualities.push(tagholder.tag.title);
                                });

                                self.set('qualities', qualities);
                            })
                        }
                    });


                });
            });
        });



        this.setProperties({
            birthdate: person.dateOfBirth,
            roles: person.roles
        });
    }
});

export default ProfileController;
