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
                });
            });
        });
    },

    actions: {
        showDetails: function(){
            Ember.$('body').toggleClass('aside-right-visible');
        },
    }
});

export default ProjectenController;
