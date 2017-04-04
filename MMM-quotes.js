'use strict';

Module.register("MMM-quotes", {

  result: {},
  defaults: {
      updateInterval: 10 * 1000,
      fadeSpeed: 2.5 * 1000
  },

  getStyles: function () {
      return ["MMM-quotes.css"];
  },

  start: function() {
    this.getTickers();
    this.scheduleUpdate();
  },

  getDom: function() {
    var wrapper = document.createElement("ticker");
    wrapper.className = 'medium bright';
    wrapper.className = 'ticker';

    var data = this.result;
    var quote = data.quote;
    if (quote) {
 
      var priceElement = document.createElement("span");
      priceElement.innerHTML = quote;
      wrapper.appendChild(priceElement);
    }
    return wrapper;
  },

  scheduleUpdate: function(delay) {
    var nextLoad = this.config.updateInterval;
    if (typeof delay !== "undefined" && delay >= 0) {
      nextLoad = delay;
    }

    var self = this;
    setInterval(function() {
      self.getTickers();
    }, nextLoad);
  },

  getTickers: function () {
    var url = 'https://magicwidgets.herokuapp.com/api/quotes';
    this.sendSocketNotification('Quote', url);
  },

  socketNotificationReceived: function(notification, quote) {
    if (notification === "Quote") {
      this.result = quote;
      this.updateDom(self.config.fadeSpeed);
    }
  }

});
