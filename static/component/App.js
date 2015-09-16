/**
 * Created by Administrator on 2015/9/14.
 */

var React = require('react');
var Reflux = require('reflux');
var AppAction = require('./AppAction');
var AppStore = require('./AppStore');
var AppRemove=require('./AppRemove');


var App = React.createClass({
    mixins: [Reflux.connect(AppStore, 'loginUser')],
    getInitialState: function () {
        return {
            loginUser: {},
            input:''
        };
    },
    componentDidMount: function () {
        AppAction.login();
    },
    onAddFriends: function () {
        var name = this.refs.name.getDOMNode().value;
        if (!name) {
            alert('name not null');
            return;
        }
        AppAction.addFriend({name: name});
        this.setState({input:''});
    },
    onClearFriends: function () {
        AppAction.clear();
    },
    onChange:function(){
        this.setState({input:this.refs.name.getDOMNode().value});
    },
    render: function () {
        var loginUser = this.state.loginUser,
            lis = loginUser.friends || [];
        var viewLis = lis.map(function (li, index) {
            return (<AppRemove user={li} key={index} />);
        }, this);
        return (
            <div>
                <h3>React-Reflux</h3>
                <button onClick={this.onAddFriends}>add</button>
                <input type="text" ref="name" value={this.state.input} onChange={this.onChange}/>
                <button onClick={this.onClearFriends}>clear</button>
                <div>
                    <p>但前登录：{loginUser.name}</p>

                    <p>性&nbsp;&nbsp;别：{loginUser.sex}</p>

                    <p>好&nbsp;&nbsp;友：</p>
                    <ul>
                        {viewLis}
                    </ul>
                </div>
            </div>
        )
    }
});

module.exports = App;