import Ember from 'ember';
import UserController from '../user';

/* global $ISIS */

var ProjectenController = UserController.extend({

    demands:[],

    init: function() {
        var self = this;
        this._super();

        this.set('demands', null);


        this.initPerson().then(function(person){
            var projecten = person.collectDemands;
            projecten.extract(function(projecten){
                console.log(projecten);
                self.setProperties({
                    demands: projecten,
                    projectCount: projecten.length,
                });
            });
        });
    },

    actions: {
        showDetails: function(){
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
        addProject: function(){
            this.get("title");
            this.get("description");

            console.log($ISIS.initPerson());
        }
    }
});

export default ProjectenController;
