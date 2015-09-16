/**
 * Created by NoManReady on 2015/9/15.
 */

var React=require('react');

var WaterItem=React.createClass({
    render:function(){
        "use strict";
        var picture=this.props.picture;
        return (
            <li className="waterfall-item item-box">
                <a href="javascript:;">
                    <img src={picture.url} alt=""/>
                </a>
                <p className="item-des" title={picture.description}>{picture.description}</p>
            </li>
        )
    }
});

module.exports=WaterItem;