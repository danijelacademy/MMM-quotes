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
    wrapper.className = 'medium bright ticker';

    var data = this.result;
    var quote = data.quote;
    if (quote) {

      var element = document.createElement("span");
      element.innerHTML = quote;
      wrapper.appendChild(element);
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
      this.updateDom(this.config.fadeSpeed);
    }
  }

});
