///**
// * Created by Administrator on 2015/9/10.
// */
//
var Reflux = require('reflux');
var React = require('react');
//
//var UserAction=Reflux.createActions(['addItem','delItem']);
//
//
//var UserStore=Reflux.createStore({
//    items:[1,2,3,5],
//    listenables: [UserAction],
//    onAddItem:function(payload){
//        this.items.unshift(payload);
//        this.trigger(this.items);
//    },
//    onDelItem:function(payload){
//        for(var i=0;i<this.items.length;i++){
//            if(this.items[i]===payload){
//                this.items.splice(i,1);
//                break;
//            }
//        }
//        this.trigger(this.items);
//    }
//});
//var UserComponent=React.createClass({
//    getInitialState:function(){
//        return {
//            items:[]
//        }
//    },
//    //mixins:[Reflux.connect(UserStore,'items')],
//    //    trigger:function(){
//    //        UserAction.onAddItem('NoManReady');
//    //    },
//
//    ////    方法一：组件初始化时监听，移除时手动取消监听
//    //    componentDidMount:function(){
//    //        this.enents=UserStore.listen(this.onChange);
//    //        UserStore.onAddItem('kitty');
//    //    },
//    //    componentWillUnmount:function(){
//    //        this.enents();
//    //    },
//    //    onChange:function(items){
//    //        this.setState({items:items});
//    //    },
//    ////    方法二：组件初始化时监听，移除交给mixins去做
//    //    mixins:[Reflux.ListenerMixin],
//    //    componentDidMount:function(){
//    //        this.enents=UserStore.listen(this.onChange);
//    //        UserAction.addItem('kitty');
//    //    },
//    //    onChange:function(items){
//    //        this.setState({items:items});
//    //    },
//    //    方法三：全部交给mixins去做，并自动更新state（推荐做法）--connect(listenTo需要指定方法去更新state)
//        mixins:[Reflux.connectFilter(UserStore,'items',function(list){
//            return list.map(function(l){
//                return 'hello '+l;
//            })
//        })],
//        componentDidMount:function(){
//            UserAction.addItem('kitty');
//        },
//        render:function(){
//            return (
//                <div>
//                {this.state.items.map(function (item) {
//                    return <p>{item}</p>
//                })}
//                </div>
//            );
//        }
//});
//
//module.exports=UserComponent;

/**
 * reflux Demo
 * 定义Action、Store、Component
 * 主要事件流程为： Action定义事件；
 *                  Store监听Action集合，定义相对Action的on事件，对数据进行相应的处理后调用trigger事件触发view-state更新；
 *                  Component监听Store数据变化（多种方式，mixins比较好用），进而更新state渲染页面，Component中可定义事件触发Action；
 *
 *
 */
var TodoActions = Reflux.createActions([
    'getAll',
    'addItem',
    'deleteItem',
    'updateItem'
]);
var TodoStore = Reflux.createStore({
    items: [],
    listenables: [TodoActions],
    onGetAll: function () {
        this.trigger(this.items);
    },
    onAddItem: function (model) {
        this.items.unshift(++count);
        this.trigger(this.items);
    },
    onDeleteItem: function (index) {
        if (index) {
            this.items.splice(index,1);
            this.trigger(this.items);
        } else {
            if (this.items.shift()) {
                count--;
                this.trigger(this.items);
            }
        }
    },
    onUpdateItem: function (model, index) {
        this.items.unshift(++count);
        this.trigger(this.items);
    }
});

var count = 0;
var TodoComponent = React.createClass({
    mixins: [Reflux.connect(TodoStore, 'list')],
    getInitialState: function () {
        return {list: []};
    },
    componentDidMount: function () {
        TodoActions.getAll();
    },
    handlerAddClick: function (e) {
        //e.preventDefault;
        //e.stopPropagation();
        TodoActions.addItem();
    },
    handlerDelClick: function (e) {
        //e.preventDefault;
        //e.stopPropagation();
        TodoActions.deleteItem();
    },
    render: function () {
        var todoItems = this.state.list.map(function (l, i) {
            return <TodoItem data={l} key={i} index={i}/>
        });
        return (<div>
            <button onClick={this.handlerAddClick}>add</button>
            &nbsp;
            <button onClick={this.handlerDelClick}>del</button>
            {todoItems}
        </div>);
    }
});

var TodoItem = React.createClass({
    handleDelete: function (e) {
        TodoActions.deleteItem(this.props.index);
    },
    render: function () {
        var item = this.props.data,
            key = this.props.index;
        ;
        return (
            < div >
                < p onClick={this.handleDelete} index={key}> {item} </ p >
            </div >
        );
    }
});
//module.exports = TodoComponent;

//React.render(< TodoComponent/>, document.getElementById('container'));
