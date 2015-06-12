import Ember from 'ember';

var MeController = Ember.Controller.extend({

    actions: {
		toggleAccountNav:function(){
            Ember.$('body').toggleClass('account-nav-visible');
            return false;
        },
		toggleUsernav:function(){
            Ember.$('body').toggleClass('user-nav-small');
            return false;
        },
    }

});

export default MeController;
