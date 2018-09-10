var $=require('jquery');
import Vue from 'vue';
console.log(1)
import './tap.js';
import './index.less';
new Vue({
    el: '#app',
    data: {
        msg: 'hello'
    },
    methods: {
        aaa: function(e) {
            console.log(this);
        },
        bbb: function(e) {
        	console.log(this);
            console.log('loooongtap');
            console.log(e);
        },
        df(){
        	console.log(this);
        }
    }
})

