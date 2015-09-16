/**
 * Created by Administrator on 2015/9/14.
 */

var Reflux=require('reflux'),
    AppAction=require('./AppAction'),
    _=require('lodash');

var AppStore=Reflux.createStore({
    loginUser:{name:'NoManReady',sex:'男',id:'0521'},
    listenables:[AppAction],
    '_getFriend':function(query){
        var lis=JSON.parse(localStorage.getItem('UserLis')||'[]');
        if(query){
            lis=_.where(lis,query)||[];
        }
        return lis;
    },
    '_getUUID':function(size){
        var chars='1234567890',
            len=chars.split('').length,
            temp=[];
        for(var i=0;i<size;i++){
            temp.push(chars.charAt(Math.floor(Math.random()*len)));
        }
        return temp.join('');
    },
    'onLogin':function(){
        var loginUser=this.loginUser;
        var friends=this._getFriend({mappingBy:loginUser.id});
        loginUser.friends=friends;
        this.trigger(loginUser);
    },
    'onAddFriend':function(user){
        var loginUser=this.loginUser,
            friends=loginUser.friends,
            info={success:true};
        if(_.find(friends,{name:user.name})){
            info.success=false;
            info.msg='好友已存在';
        }else{
            user.id=this._getUUID(4);
            user.sex=_.sample(['男','女']);
            user.mappingBy=loginUser.id;
            friends.push(user);
            this.trigger(loginUser);
            localStorage.setItem('UserLis',JSON.stringify(friends));
        };
        console.log(info);
        return info;
    },
    'onDelFriend':function(id){
        var loginUser=this.loginUser,
            friends=loginUser.friends;
        var delFriend= _.remove(friends,function(friend,index){
            return friend.id===id;
        },this);
        this.trigger(loginUser);
        localStorage.setItem('UserLis',JSON.stringify(friends));
        return delFriend;
    },
    'onClear':function(){
        var friends=this._getFriend();
        _.remove(friends,function(friend){
            return friend.mappingBy===this.loginUser.id;
        },this);
        localStorage.setItem('UserLis',JSON.stringify(friends));
        this.loginUser.friends=[];
        this.trigger(this.loginUser);
    },
    'onInfoTab':function(id){
        var info=_.find(this.loginUser.friends,{id:id});
        this.trigger(info);
    }
});

module.exports=AppStore;
