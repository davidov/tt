/*global ToTwitter DS */
'use strict';

ToTwitter.Store = DS.Store.extend({
	revision: 11,
	adapter: 'Todos.LSAdapter'
});

ToTwitter.LSAdapter = DS.LSAdapter.extend({
	namespace: 'todos-emberjs'
});
