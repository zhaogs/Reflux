/**
 * Created by Administrator on 2015/9/14.
 */
var Reflux=require('reflux');

var AppAction=Reflux.createActions([
    'getUserList',
    'getInfoByUser',
    'addFriend',
    'delFriend',
    'login',
    'infoTab',
    'clear'
]);

module.exports=AppAction;