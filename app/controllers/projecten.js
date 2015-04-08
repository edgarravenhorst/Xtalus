import Ember from 'ember';
/* global $ISIS */

var ProjectenController = Ember.Controller.extend({

    demands:[],

    init: function() {
        this._super();

        $ISIS.init(function(data){
            data.activePerson.invoke({}, function(person){
                var demands = person.collectDemands;

                demands.extract(this.setISISVars.bind(this));
            }.bind(this));
        }.bind(this));

    },

    setISISVars: function(demands){
        console.log(demands);
        this.setProperties({
            demands: demands,
        });
    },

    actions: {
        showDetails: function(){
            Ember.$('body').toggleClass('aside-right-visible');
        },
    }
});

export default ProjectenController;
