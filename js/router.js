/*global ToTwitter Ember */
'use strict';

ToTwitter.Router.map(function () {
	this.resource('totwitter', { path: '/' }, function () {
		this.route('active');
		this.route('completed');
	});
});
