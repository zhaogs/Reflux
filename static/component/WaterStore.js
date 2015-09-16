/**
 * Created by NoManReady on 2015/9/15.
 */

var Reflux = require('reflux');
var $ = require('jquery');
var _ = require('lodash');
var Q = require('q');
var WaterAction = require('./WaterAction');

var WaterStore = Reflux.createStore({
    listenables: [WaterAction],
    pictures: [],
    count: 0,
    _fetchData: function () {
        "use strict";
        //if(this.count>5)return;
        var ajaxData = _.shuffle(require('./test'));
        [].push.apply(this.pictures, ajaxData);
        console.log(++this.count);
        this.trigger(this.pictures);
    },
    'onBoot': function () {
        "use strict";
        this._fetchData();

    },
    'onAddMore': function () {
        "use strict";
        this._fetchData();
    }
});

module.exports = WaterStore;