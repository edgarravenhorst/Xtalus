import Ember from 'ember';
/* global $ISIS */

var MeProjectsController = Ember.Controller.extend({

    actions: {

        showDetails: function(itemID){
            $('section#page').addClass('aside-right');
            this.set('selectedDemand', this.store.find('demand', itemID));
        },

        hideDetails:function(){
            $('section#page').removeClass('aside-right');
            return false;
        },

        showPopup: function(name){
            Ember.$('section#page.projects').toggleClass('popup-' + name);
            return false;
        },

        closePopup: function(name){
            Ember.$('section#page.projects').removeClass('popup-' + name);
            return false;
        },

        delProject: function(){
            var self = this;
            var demand = this.get('selectedDemand');
            var confirmed = confirm("Weet je het zeker?");

            if(confirmed) {
                demand.deleteDemand.invoke({confirmDelete: confirmed}).then(function(){
                    self.send('refreshDemands');
                    self.send('hideDetails');
                });
            }
        },

        createProject: function(){
            var self = this;
            var title = this.get("title");
            var summary = this.get("summary");
            var story = this.get("story");

            this.get('activePerson').createPersonsDemand.invoke({
                demandDescription: title,
                demandSummary: summary,
                demandStory: story
            }).then(function(){
                self.send('refreshDemands');
                self.send('closePopup', 'new-project');
            });

        }
    }
});

export default MeProjectsController;
