var NodeHelper = require('node_helper');
var request = require('request');

module.exports = NodeHelper.create({
  start: function () {
    console.log('helper started...');
  },

  getTickers: function (url) {
      var self = this;

      request({ url: url, method: 'GET' }, function (error, response, body) {
          if (!error && response.statusCode == 200) { //den lyckas hämta
            var result = JSON.parse(body);
            self.sendSocketNotification('Quote', result);
          }
      });

  },

  //Subclass socketNotificationReceived received.
  socketNotificationReceived: function(notification, quote) {
    if (notification === 'Quote') {
      this.getTickers(quote);
    }
  }

});
