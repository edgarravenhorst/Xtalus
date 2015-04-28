import Ember from 'ember';
import UserRoute from '../user';

var ProfileGetRoute = Ember.Route.extend({
    model: function(params) {
        if(params.id){
            return $ISIS.init().then(function(isis){
                return isis.findPersonByUniqueId.invoke({
                    uUID: params.id,
                });
            })
        }else{
            return params;
        }
    },

    setupController: function(controller, model) {
        console.log(model);
        controller.setPersonData(model);
    }
});

export default ProfileGetRoute;
