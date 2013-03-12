/*global Ember */
ToTwitter = Ember.Application.create({
    ready: function () {
    // Polling
        setInterval(function() {
          ToTwitter.SearchResults.refresh();
        }, 20000);

        ToTwitter.SearchResults.set("query", "emberjs");
        var oneTimer = setTimeout(function () {
            ToTwitter.SearchResults.applyExtraSettings();
        }, 500);

        oneTimer = undefined;

        this._super();
    }
});

// Views
ToTwitter.NavbarView = Ember.View.extend({
    templateName: 'navbar_view'
});

ToTwitter.SettingsView = Ember.View.extend({
    templateName: 'settings_view'
});

ToTwitter.FooterView = Ember.View.extend({
    templateName: 'footer_view'
});

