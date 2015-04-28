import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
    location: config.locationType
});

export default Router.map(function() {
    this.route('login');
    this.resource('user', function(){
        this.resource('profile', function(){
            this.route('me')
            this.route('get:id', {path:":id"})
        })
        this.route('projecten');
        this.route('network');
    });
});
