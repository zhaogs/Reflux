/**
 * Created by NoManReady on 2015/9/15.
 */
var React = require('react');
var Reflux = require('reflux');
var _ = require('lodash');
var $ = require('jquery');
var WaterStore = require('./WaterStore');
var WaterAction = require('./WaterAction');
var WaterColumn = require('./WaterColumn');

var WaterApp = React.createClass({
    mixins: [Reflux.connect(WaterStore, 'pictures')],
    getInitialState: function () {
        "use strict";
        return {
            pictures: [],
            columns: this._getColumns()
        }
    },
    componentWillMount: function () {
        "use strict";
        //监听窗口大小变化
        window.addEventListener('resize', this._resize);
        window.addEventListener('scroll', this._scroll);
    },
    componentDidMount: function () {
        "use strict";
        WaterAction.boot();
    },
    componentWillUpdate: function () {
        "use strict";
        var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;//滚轮高度
        var viewHeight = document.documentElement.clientHeight || document.body.clientHeight;//视口高度
        var totalHeight = document.documentElement.offsetHeight || document.body.offsetHeight;//视口高度+滚轮高度
        var waterItems = document.querySelectorAll('.waterfall-item');//所有元素
        var lastItem = waterItems[waterItems.length - 1];//最后一个元素
        //检测最后一个元素是否全部显示
        if (totalHeight - scrollTop <= viewHeight || lastItem.offsetTop + lastItem.offsetHeight <= viewHeight) {
            WaterAction.addMore();
        }
    },
    componentWillUnmount:function(){
        "use strict";
        window.removeEventListener('resize', this._resize);
        window.removeEventListener('scroll', this._scroll);
    },
    _resize:function () {
        var _newColumns = this._getColumns();
        if (_newColumns !== this.state.columns) {
            this.setState({
                columns: _newColumns
            });
        }
    },
    _scroll:function () {
        var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;//滚轮高度
        var viewHeight = document.documentElement.clientHeight || document.body.clientHeight;//视口高度
        var totalHeight = document.documentElement.offsetHeight || document.body.offsetHeight;//视口高度+滚轮高度
        var waterItems = document.querySelectorAll('.waterfall-item');//所有元素
        //检测把不在视口内的元素hidden
        _.forEach(waterItems, function (item) {
            if (item.offsetTop + item.offsetHeight < scrollTop || item.offsetTop - 200 > scrollTop + viewHeight) {
                item.style.visibility = 'hidden';
            } else {
                item.style.visibility = 'visible';
            }
        });
        //检测滚轮已经滚到底部（判断是否加载）
        if ((totalHeight - scrollTop) <= viewHeight) {
            WaterAction.addMore();
        }
    },
    _getColumns: function () {
        "use strict";
        var clientWidth = document.querySelector('#container').clientWidth;
        var columns;
        if (clientWidth > 1440) {
            columns = 7;
        } else if (clientWidth > 1200) {
            columns = 6;
        } else if (clientWidth > 980) {
            columns = 5;
        } else if (clientWidth > 780) {
            columns = 4;
        } else if (clientWidth > 540) {
            columns = 3;
        } else {
            columns = 2;
        }
        return columns;
    },
    render: function () {
        "use strict";
        var pictures = this.state.pictures;
        var columns = {};
        var columnComponent = [];
        var persent = (10 / this.state.columns) * 10 + '%';
        for (var i = 0; i < this.state.columns; i++) {
            if (!columns['column' + i]) {
                columns['column' + i] = [];
            }
        }
        for (var i = 0; i < pictures.length; i++) {
            columns['column' + (i % this.state.columns)].push(pictures[i]);
        }
        for (var column in columns) {
            columnComponent.push(<WaterColumn pictures={columns[column]} key={column} columns={persent}/>);
        }
        return (
            <div className="waterfall-container">
                {columnComponent}
            </div>
        )
    }
});

module.exports = WaterApp;