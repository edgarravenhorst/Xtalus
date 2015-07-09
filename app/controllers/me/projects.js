import Ember from 'ember';
/* global $ISIS */

var MeProjectsController = Ember.Controller.extend({

    newProjectParams: {
    },

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
                    //self.send('refreshDemands');
                    self.model.reload();
                });
            }
        },

        createProject: function(){
            var self = this;
            var store = this.store;
            var params = this.get('newProjectParams');
            console.log(params)
            this.model.get('isisObj').then(function(isisObj){
                console.log(isisObj);
                isisObj.createPersonsDemand.invoke({
                    demandDescription: params.title,
                    demandSummary: params.summary,
                    demandStory: params.summary
                }).then(function(){
                    //self.send('refreshDemands');
                    self.send('closePopup', 'new-project');
                    self.set('newProjectParams', {});
                    self.model.reload();
                });
            })

        }
    }
});

export default MeProjectsController;
