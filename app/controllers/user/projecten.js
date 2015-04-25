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
            var projecten = person.collectDemands;
            projecten.extract(function(projecten){
                self.setProperties({
                    demands: projecten,
                    projectCount: projecten.length,
                });
            });
        });
    },

    actions: {
        showDetails: function(itemID){

            this.getDemandByID(itemID).then(function(demand){
                console.log(demand);

                this.set('selectedDemand', demand);

            }.bind(this));

            Ember.$('body').toggleClass('aside-right-visible');
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
        createProject: function(){
            var title = this.get("title");
            var description = this.get("description");

            this.initPerson().then(function(person){
                person.createPersonsDemand.invoke({
                    demandDescription: title,
                    demandSummary: description
                }, function(response){
                    this.initDemands();
                    Ember.$('section#page.projects').removeClass('popup-new-project');
                }.bind(this));

            }.bind(this));
        }
    }
});

export default ProjectenController;
