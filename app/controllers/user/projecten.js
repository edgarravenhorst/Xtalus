import Ember from 'ember';
import UserController from '../user';

/* global $ISIS */

var ProjectenController = Ember.Controller.extend({

    getDemandByID:function(uniqueID){
        return $ISIS.init().then(function(isis){
            return isis.findDemandByUniqueId.invoke({
                uUID: uniqueID,
            });
        });
    },

    actions: {

        showDetails: function(itemID){
            this.set('selectedDemand', null);
            this.getDemandByID(itemID).then(function(demand){
                this.set('selectedDemand', demand);
            }.bind(this));

            Ember.$('body').addClass('aside-right-visible');
            return false;
        },

        hideDetails:function(){
            Ember.$('body').removeClass('aside-right-visible');
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

            if(confirmed)
                demand.deleteDemand.invoke({confirmDelete: confirmed}).then(function(){
                    self.send('refreshDemands');
                    self.send('hideDetails')
                });
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

export default ProjectenController;
