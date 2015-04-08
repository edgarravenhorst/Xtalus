import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
    location: config.locationType
});

export default Router.map(function() {
    this.route('about');
    this.route('favorites', { path: '/favs' });
    this.route('profile');
    this.resource('profile');
});
