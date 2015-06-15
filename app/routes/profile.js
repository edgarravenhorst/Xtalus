import Ember from 'ember';
import Auth from './auth';
/* global $ISIS */

var ProfileRoute = Auth.extend({

    model: function(params) {
        var personModel = this.store.createRecord('person')
        if(params.user_id){
            return $ISIS.init().then(function(isis){
                return isis.findPersonByUniqueId.invoke({
                    uUID: params.user_id,
                });
            }).then(function(person){
                console.log(person);
                return personModel.initData(person);
            });
        }else{
            return params;
        }
    },
});

export default ProfileRoute;
