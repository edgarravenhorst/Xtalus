import Ember from 'ember';

var AppView = Ember.View.extend({
    init: function() {
        this._super();
        console.log('appview called');
    },
    actions: {
        collapseAside: function(){
            alert('click')
        },
    }
});

export default AppView;


