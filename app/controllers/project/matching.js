import Ember from 'ember';
/* global $ */
/* global $ISIS */

var ProjectMatchingController = Ember.Controller.extend({
    newProfileParams: {},
    actions: {

        showCreateDemandProfileForm:function(){

        },

        createDemandProfile:function() {
            var _this = this;
            var demand = this.get('model')
            var name = this.get('newProfileParams.name');
            demand.get('isisObj').then(function(demandObj){
                demandObj.createPersonDemandProfile.invoke({profileName:name}).then(function(result){
                    _this.send('closePopup', 'new-demand-profile');
                    _this.get('model').reload();
                });
            });
        },

        deleteDemandProfile:function() {
            var _this = this;
            this.get('selectedProfile').get('isisObj').then(function(profileObj){
                profileObj.deleteProfile.invoke({confirmDelete:true}).then(function(result){
                    _this.set('selectedProfile', undefined);
                    _this.get('model').reload();
                });
            });
        },

        saveWidget:function(element, params){
            console.log(this.get('selectedProfile'), params)
            var profile = this.get('selectedProfile');

            profile.get('isisObj').then(function(isisProfile){
                console.log(isisProfile, element.action);
                isisProfile[element.action].invoke(params).then(function(result){
                    console.log(result);
                })
            })
        },

        selectMatchingProfile: function(id){
            var profile = this.store.find('demandprofile', id).then(function(profile){
                this.set('selectedProfile', profile);
                this.send('calculateMatches', profile);
            }.bind(this))
            },

        calculateMatches: function(profile){
            var profile = profile || this.get('selectedProfile');
            var _this = this;
            profile.get('isisObj').then(function(profileObj){

                if (profileObj.chosenProfileMatch) {
                    $ISIS.init(profileObj.chosenProfileMatch.href).then(function(a){
                        console.log(a);
                    });
                }

                profileObj.updateSupplyProfileComparisons.invoke().then(function(){
                    profileObj.collectSupplyProfileComparisons.getValues().then(function(matches) {
                        console.log(matches)
                        var a_promises = [];
                        var filteredMatches = [];

                        $.each(matches, function(i, match){
                            if(match) {
                                filteredMatches.push(match);
                                match.contactName = match.proposedPerson.title;
                                _this.initMatchInfo(match);
                            }
                        });

                        matches = Ember.ArrayController.create({
                            model: filteredMatches,
                            sortProperties: ['calculatedMatchingValue'],
                            sortAscending: false
                        });

                        console.log(filteredMatches);
                        profile.set('matches', matches)
                    });
                });
            });
        },

        saveMatch: function(match){
            console.log(match)
            match.SaveMatch.invoke();
        },
    },

    initMatchInfo: function(match){
        $ISIS.init(match.proposedPerson.href).then(function(person){
            var picture = person.picture ? person.picture.split(':') : '';
            if(picture[2]) Ember.set(match, 'profilePicture', 'data:image/png;base64,'+picture[2]);
            Ember.set(match, 'roles', person.roles);
        });
    }
});

export default ProjectMatchingController;
