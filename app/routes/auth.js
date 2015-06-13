import Ember from 'ember';
/* global $ISIS */

var AuthRoute = Ember.Route.extend({

    beforeModel:function(){
        if(!$ISIS.getCookie('auth')) {
          this.transitionTo('login');
        }
    },

    actions: {
        getProject:function(projectIDs){
            this.transitionTo('project', projectIDs);
        },

        getProfile: function(userID){
            this.transitionTo('profile', userID);
        },

        changeView:function(viewID, slideID, type) {

            for(var i=0; i<10; i++){
                $("#" + viewID).removeClass('slide-'+i)
            }

            $("#" + viewID).addClass('slide-'+slideID)
            console.log('slide-'+slideID);
            return false;
        }
    }
});

export default AuthRoute;
