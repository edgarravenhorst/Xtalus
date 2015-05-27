import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
    location: config.locationType
});

export default Router.map(function() {
    this.route('login');

    this.resource('me',function(){
        this.route('connections');
        this.route('projects');
    });

    this.resource('profile', {path:"profile/:user_id"}, function(){
        this.route('connections');
        this.route('projects');
    });

    this.resource('project', {path:"project/:project_id"}, function(){
        this.route('matching')
    })
});
