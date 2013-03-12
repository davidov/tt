/*global ToTwitter Ember */

ToTwitter.SearchResults = Ember.ArrayController.create({
    content: [],

    query: null,

    _idCache: {},

    addTweet: function (tweet) {
        var id = tweet.id,
            ago = this.timeAgo(tweet.created_at);
        var img_link = undefined, img_picture = undefined;
        if (tweet.entities.media) {
            img = (tweet.entities.media.length > 0 ? tweet.entities.media[0].media_url : '');
            tweet.set('img_link', img + ':large');
            tweet.set('img_picture', img + ':thumb');
        }

        tweet.set('ago', ago);

        if (typeof this._idCache[id] === "undefined") {
            this.pushObject(tweet);
            this._idCache[id] = tweet.id;
        }
    },

    /**
      * relative time calculator FROM TWITTER
      * @param {string} twitter date string returned from Twitter API
      * @return {string} relative time like "2 minutes ago"
      */

    timeAgo: function (dateString) {
        var rightNow = new Date(),
            then = new Date(dateString);

        if (BrowserDetect.browser == "Explorer") {
            // IE can't parse these crazy Rubi dates
            then = Date.parse(dateString.replace(/( \+)/, ' UTC$1'));
        }

        var diff = rightNow - then,
            second = 1000, minute = 60 * second, hour = 60 * minute,
            day = 24 * hour, week = 7 * day;

        if (isNaN(diff) || diff < 0) {
            return ""; // return blank string if unknown
        }

        if (diff < second * 2) {
            // within 2 seconds
            return "right now";
        }

        if (diff < minute) {
            return (Math.floor(diff / second) + " seconds ago");
        }

        if (diff < minute * 2) {
            return "about a minute ago";
        }

        if (diff < hour) {
            return Math.floor(diff / minute) + " minutes ago";
        }

        if (diff < hour * 2) {
            return "about an hour ago";
        }

        if (diff < day) {
            return  Math.floor(diff / hour) + " hours ago";
        }

        if (diff > day && diff < day * 2) {
            return "yesterday";
        }
        if (diff < day * 365) {
            return Math.floor(diff / day) + " days ago";
        }  else {
            return "over a year ago";
        }
    },

    applyExtraSettings: function () {
        var that = this,
            container = $('#jstwitter');

        container.imagesLoaded(function() {
          container.masonry({
            itemSelector : '.tweet',
                columnWidth : 0,
                isAnimated: true
          });
        });

        //the last step, activate fancybox
        $("a.fancy").fancybox({
            'overlayShow'   : false,
            'transitionIn'  : 'elastic',
            'transitionOut' : 'elastic',
            'overlayShow'   : true
        });
    },

    refresh: function () {
        var query = this.get("query");

        if (Ember.empty(query)) {
            this.set("content", []);
            return;
        }

        var that = this;
        $.getJSON("http://search.twitter.com/search.json?q=" + query + "&include_entities=true&callback=?", function (data) {
            for (var i = 0; i < data.results.length; i++) {
                that.addTweet(ToTwitter.Tweet.create(data.results[i]));
            }
        });

        that.applyExtraSettings();
    }.observes("query")
});
