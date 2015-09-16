/**
 * Created by Administrator on 2015/9/14.
 */

var React = require('react');
var AppAction = require('./AppAction');
var AppRemove = React.createClass({
    onDelFriend: function () {
        AppAction.delFriend(this.props.user.id);
    },
    render: function () {
        return (
            <li>{this.props.user.name}---{this.props.user.sex}<a href="javascript:;" onClick={this.onDelFriend}>&times;</a></li>
        )
    }

});

module.exports=AppRemove;