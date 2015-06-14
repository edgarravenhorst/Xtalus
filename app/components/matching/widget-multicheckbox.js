import matchingWidget from './matching-widget';

export default matchingWidget.extend({
    classNames: 'widget-multi-checkbox',
    currentValue: '',
	options: Ember.A([{value: 'foo', label: 'Foo', group: 'Foos'}, {value: 'bar', label: 'Bar', group: 'Bars'}, {value: 'bar2', label: 'Bar2', group: 'Bars'}, {value: 'foo2', label: 'Foo2', group: 'Foos'}]),

    actions: {

    }
});
