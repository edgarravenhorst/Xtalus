import Ember from 'ember';
import UserController from '../user';

/* global $ISIS */

var ProjectenController = UserController.extend({

    demands:[],

    init: function() {
        this._super();
        this.set('demands', null);
        this.initDemands()
    },

    initDemands: function(){
        var self = this;
        return this.initPerson().then(function(person){
            person.collectDemands.extract().then(function(projecten){
                self.setProperties({
                    demands: projecten,
                    projectCount: projecten.length,
                });
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
            var r = confirm("Weet je het zeker?");

            if(r == true){
                demand.deleteDemand.invoke({confirmDelete: r}).then(function(result){
                    console.log(result);
                    self.initDemands();
                    Ember.$('body').removeClass('aside-right-visible');
                })
            }
            else{
                return false;
            }


        },
        createProject: function(){
            var self = this;
            var title = this.get("title");
            var summary = this.get("summary");
            var story = this.get("story");

            this.initPerson().then(function(person){
                person.createPersonsDemand.invoke({
                    demandDescription: title,
                    demandSummary: summary,
                    demandStory: story
                }).then( function(response){
                    self.initDemands();
                    Ember.$('section#page.projects').removeClass('popup-new-project');
                });

            });
        }
    }
});

export default ProjectenController;
