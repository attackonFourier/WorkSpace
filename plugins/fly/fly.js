/**
 * Created by cloud.wong on 2016/2/16.
 */
function Fly(options){
    'use strict';
    var defaults = {
        moveSpeed: 15,
        curvature: 0.0005
    };
    var opts = $.extend({}, defaults, options);
    this.speed = opts.moveSpeed;
    this.curvature = opts.curvature;
    this.callback = opts.callback;
    this.init(opts);
};


Fly.prototype = {
    init: function(opts){
        var start,
            end;
        if(!$(opts.startElement)[0]){
            return false;
        }
        if(undefined === opts.src || typeof opts.src !== 'string'){
            return false;
        }
        this.flyElement = $('<img/>').attr('src', opts.src).css({
            position:'fixed',
            width:'45px',
            height:'45px',
            borderRadius:'50%',
            border: 0,
            backgroundColor:'#ccc',
        });
        start = this.getCoordinates(opts.startElement);
        end = this.getCoordinates(opts.endElement);
        this.startMove(start,end);
    },
    startMove: function(start,end){
        this.flyElement.css({
            left:start.x+'px',
            top:start.y+'px',
        }).appendTo('body');
        start.y <= 20 ?
            this.animateStraight(start,end):
            this.animateCurve(start,end);
    },
    /**
     * 如果距上偏移的太多 考虑直接按直线运动过去
     *
     */
    animateStraight: function(start,end){
        var x_len,
            y_len,
            z_len,
            that = this;
        y_len = end.y - start.y;
        x_len = end.x - start.x;
        time = Math.sqrt(y_len * y_len + x_len * x_len)/ this.speed;
        this.flyElement.animate({
            left: end.x,
            top: end.y,
        }, time , function(){
            that.flyElement.remove();
            if(typeof that.callback === 'function'){
                that.callback(end);
            }
        });
    },
    /**
     * @param[Object] start:运动开始时的位置
     * @param[Object] end:运动结束时的位置
     */
    animateCurve: function(start,end){
        var x_len,
            y_len,
            z_len,
            curvature = this.curvature,
            that = this;
        y_len = end.y - start.y;
        x_len = end.x- start.x;
        b = y_len / x_len - curvature * x_len;
        //b = (end.y - this.curvature * end.x * end.x)/ end.x;
        setTimeout(function(){
            that.parabolic(curvature, b , x_len,start,end);
        }, 30);
    },
    parabolic: function(curvature ,b,_x,start,end){
        var x=0,
            y=0,
            that = this;
        (function animate(){
            x += that.speed;
            y = curvature * x * x + b * x;
            that.flyElement.css({
                left: x + start.x + 'px',
                top: y + start.y + 'px',
            });
            if(x < _x){
                window.requestAnimFrame(animate);
            }
            else{
                that.flyElement.remove();
                if(typeof that.callback === 'function'){
                    that.callback(end);
                }
            }
        })();
    },
    /**
     * @param[string] element:传入的元素
     * @return[Object] coordinates:元素基于文档的x和y轴
     *
     */
    getCoordinates: function(element){
        var $ele= $(element),
            coordinates = {};
        coordinates['x'] = $ele.offset().left + $ele.outerWidth(true)/2;
        coordinates['y'] = $ele.offset().top - $(document).scrollTop();
        return coordinates;
    }
};

//现代浏览器动画兼容
window.requestAnimFrame = (function(){
    return  window.requestAnimationFrame       ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame    ||
        function( callback ){
            setTimeout(callback, 1000 / 60);
        };
})();
