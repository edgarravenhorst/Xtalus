import Ember from 'ember';
/* global $ISIS */

var AppController = Ember.Controller.extend({
    init: function() {
        this._super();

    },

    actions: {
        collapseAside: function(){
            Ember.$('body').toggleClass('aside-left-collapsed');
        },
        showDetails: function(){
            Ember.$('body').toggleClass('aside-left-collapsed');
        },
        logout: function(){
            $ISIS.auth.logout();
            this.transitionToRoute('login');
        },
    }

});
export default AppController;



