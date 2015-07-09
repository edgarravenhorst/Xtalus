import Ember from 'ember';
/* global $ */

var ProfileIndexRoute = Ember.Route.extend({
	model:function(){
		return this.modelFor('profile');
	},


	actions: {

		createPersonalContact: function(){
			var self = this;
			var ISISdemand = this.controller.get('model.isisObj');

			ISISdemand.then(function(profileObj){
				console.log(profileObj);


				profileObj.addAsPersonalContact.invoke().then(function(){
					alert(profileObj.firstName + ' is toegevoegd aan uw connecties');
					//self.transitionTo('me.projects');
					self.modelFor('me').reload();
				});
			})
		},

		deletePersonalContact: function(){



		},

	},
});

export default ProfileIndexRoute;
