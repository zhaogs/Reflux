/**
 * Created by NoManReady on 2015/9/15.
 */

var React=require('react');
var WaterItem=require('./WaterItem');

var WaterColumn=React.createClass({
    render:function(){
        "use strict";
        var pictures=this.props.pictures||[];
        var style={width:this.props.columns};
        var waterItems=pictures.map(function(picture,index){
            return (
                <WaterItem picture={picture} key={index}/>
            )
        });
        return (
            <ul className="waterfall-column" style={style}>
                {waterItems}
            </ul>
        )
    }
});

module.exports=WaterColumn;