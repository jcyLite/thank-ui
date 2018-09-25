import Vue from 'vue';
import {
  mycamera,
  choosePic
} from '%/mycordova/camera.js';
import {
  sendImage
} from '@/server/ajax.js';
import {
  faces
} from '@/module/faces.js';
import {
  showNew
} from './showNew.js';
import {
  pushChatlog,
  setHistory
} from './local.js';
import {
  getMylocal
} from '@/module/local.js';
import store from '@/store';
import router from '@/router';
import playAudio from '%/mycordova/playAudio.js';
var v = '2.1.0';
var $ = layui.zepto;
var laytpl = layui.laytpl;
var layer = layui['layer-mobile'];
var upload = layui['upload-mobile'];
var device = layui.device();

var SHOW = 'layui-show',
  THIS = 'layim-this',
  MAX_ITEM = 20;

//回调
var call = {};
var isOver=true;
var events = {
  playAudio: function(othis) {
  	  if(!isOver) return;
  	  isOver=false;
      othis.addClass('play');
      othis.append('<span class="myaudio-icon glyphicon glyphicon-volume-up"></span>')
      var time=othis.data('time');
      setTimeout(()=>{
           othis.find('.glyphicon').remove()
           isOver=true;
      },time)
      playAudio(othis.data('src'));
  }
    //播放视频
    ,
  playVideo: function(othis) {
    var videoData = othis.data('src'),
      video = document.createElement('video');
    if (!video.play) {
      return layer.msg('您的浏览器不支持video');
    }
    layer.close(events.playVideo.index);
    events.playVideo.index = layer.open({
      type: 1,
      anim: false,
      style: 'width: 100%; height: 50%;',
      content: '<div style="background-color: #000; height: 100%;"><video style="position: absolute; width: 100%; height: 100%;" src="' + videoData + '" autoplay="autoplay"></video></div>'
    });
  }
};
//对外API
var LAYIM = function() {
  this.v = v;
  touch($('body'), '*[layim-event]', function(e) {
    var othis = $(this),
      methid = othis.attr('layim-event');
    events[methid] ? events[methid].call(this, othis, e) : '';
  });
};

//避免tochmove触发touchend
var touch = function(obj, child, fn) {
  var move, type = typeof child === 'function',
    end = function(e) {
      !move && fn.call(this, e);
    };

  if (type) {
    fn = child;
  }

  obj = typeof obj === 'string' ? $(obj) : obj;
  if (!isTouch) {
    if (type) {
      obj.on('click', end);
    } else {
      obj.on('click', child, end);
    }
    return;
  }

  if (type) {
    obj.on('touchstart', function() {
      move = false;
    }).on('touchmove', function() {
      move = true;
    }).on('touchend', end);
  } else {
    obj.on('touchstart', function() {
      move = false;
    }).on('touchmove', child, function() {
      move = true;
    }).on('touchend', child, end);
  }
};

//是否支持Touch
var isTouch = /Android|iPhone|SymbianOS|Windows Phone|iPad|iPod/.test(navigator.userAgent);

//底部弹出
layer.popBottom = function(options) {
  layer.close(layer.popBottom.index);
  layer.popBottom.index = layer.open($.extend({
    type: 1,
    content: options.content || '',
    shade: false,
    className: 'layim-layer'
  }, options));
};

//基础配置
LAYIM.prototype.config = function(options) {
  options = options || {};
  options = $.extend({
    title: '我的IM',
    isgroup: 0,
    isNewFriend: !0,
    voice: 'default.mp3',
    chatTitleColor: '#36373C'
  }, options);
  init(options);
};
//监听事件
LAYIM.prototype.on = function(events, callback) {
  if (typeof callback === 'function') {
    call[events] ? call[events].push(callback) : call[events] = [callback];
  }
  return this;
};
LAYIM.prototype.clearCall = function() {
  call = {};
}
LAYIM.prototype.getMessage = function() {
  getMessage.apply(this, arguments)
}
//获取所有缓存数据
LAYIM.prototype.cache = function() {
  return cache;
};

//添加好友/群
LAYIM.prototype.addList = function(data) {
  return addList(data), this;
};

//删除好友/群
LAYIM.prototype.removeList = function(data) {
  return removeList(data), this;
};

//设置好友在线/离线状态
LAYIM.prototype.setFriendStatus = function(id, type) {
  var list = $('.layim-friend' + id);
  list[type === 'online' ? 'removeClass' : 'addClass']('layim-list-gray');
};

//设置当前会话状态
LAYIM.prototype.setChatStatus = function(str) {
  var thatChat = thisChat(),
    status = thatChat.elem.find('.layim-chat-status');
  return status.html(str), this;
};

//标记新动态
LAYIM.prototype.showNew = function(alias, show) {
  showNew(alias, show);
};

//解析聊天内容
LAYIM.prototype.content = function(content) {
  return layui.data.content(content);
};
LAYIM.prototype.events = function() {
  return events;
}


var digit = function(num) {
  return num < 10 ? '0' + (num | 0) : num;
};

//转换时间
layui.data.date = function(timestamp) {
  /*当天0点的时间戳*/
  var a = new Date(new Date().toLocaleDateString()).getTime()

  var d = new Date(timestamp || new Date());
  if (timestamp > a) {
    return '今天 ' + digit(d.getHours()) + ':' + digit(d.getMinutes());
  } else {
    return digit(d.getMonth() + 1) + '-' + digit(d.getDate()) +
      ' ' + digit(d.getHours()) + ':' + digit(d.getMinutes());
  }

};
Vue.prototype.date = layui.data.date;
//转换内容
layui.data.content = function(content) {
  //支持的html标签
  var html = function(end) {
    return new RegExp('\\n*\\[' + (end || '') + '(pre|div|p|table|thead|th|tbody|tr|td|ul|li|ol|li|dl|dt|dd|h2|h3|h4|h5)([\\s\\S]*?)\\]\\n*', 'g');
  };
  content = (content || '').replace(/&(?!#?[a-zA-Z0-9]+;)/g, '&amp;')
    .replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/'/g, '&#39;').replace(/"/g, '&quot;') //XSS
    .replace(/@(\S+)(\s+?|$)/g, '@<a href="javascript:;">$1</a>$2') //转义@

    .replace(/face\[([^\s\[\]]+?)\]/g, function(face) { //转义表情
      var alt = face.replace(/^face/g, '');
      return '<img alt="' + alt + '" title="' + alt + '" src="' + faces[alt] + '">';
    })
    .replace(/img\[([^\s]+?)\]/g, function(img) { //转义图片
      var src = baseImageURL + img.replace(/(^img\[)|(\]$)/g, '')
      return '<img class="layui-layim-photos" src="' + src + '">';
    })
    .replace(/file\([\s\S]+?\)\[[\s\S]*?\]/g, function(str) { //转义文件
      var href = (str.match(/file\(([\s\S]+?)\)\[/) || [])[1];
      var text = (str.match(/\)\[([\s\S]*?)\]/) || [])[1];
      if (!href) return str;
      return '<a class="layui-layim-file" href="' + href + '" download target="_blank"><i class="layui-icon">&#xe61e;</i><cite>' + (text || href) + '</cite></a>';
    })
    .replace(/audio\([\s\S]+?\)\[[\s\S]*?\]/g, function(audio) { //转义音频
       var time = (audio.match(/audio\(([\s\S]+?)\)\[/) || [])[1];
       console.log(time);
      var src =baseImageURL+ (audio.match(/\)\[([\s\S]*?)\]/) || [])[1];
      return '<div data-time="'+time+'" class="layui-unselect layui-layim-audio" layim-event="playAudio" data-src="' + src + '"><i class="layui-icon">&#xe652;</i><p>音频消息</p></div>';
    })
    .replace(/video\[([^\s]+?)\]/g, function(video) { //转义视频
      return '<div class="layui-unselect layui-layim-video" layim-event="playVideo" data-src="' + video.replace(/(^video\[)|(\]$)/g, '') + '"><i class="layui-icon">&#xe652;</i></div>';
    })

    .replace(/a\([\s\S]+?\)\[[\s\S]*?\]/g, function(str) { //转义链接
      var href = (str.match(/a\(([\s\S]+?)\)\[/) || [])[1];
      var text = (str.match(/\)\[([\s\S]*?)\]/) || [])[1];
      if (!href) return str;
      return '<a href="' + href + '" target="_blank">' + (text || href) + '</a>';
    }) //转移HTML代码
    .replace(/\n/g, '<br>') //转义换行 
  return content;
};
Vue.prototype.content = layui.data.content;
//消息页最新消息的编译
Vue.prototype.text = function(content) {
  if (!content) {
    return '';
  }
  content = content.replace(/img\[([^\s]+?)\]/g, function(img) { //转义图片
    return '[图片]';
  }).replace(/face\[([^\s\[\]]+?)\]/g, function(face) { //转义表情
    var alt = face.replace(/^face/g, '');
    return alt;
  }).replace(/audio\([\s\S]+?\)\[[\s\S]*?\]/g, function(audio) { //转义音频
    return '[音频]';
  }).replace(/video\[([^\s]+?)\]/g, function(video) { //转义音频
    return '[视频]';
  }).replace(/&nbsp;/g,' ')
  return content;
}
//处理初始化信息
var cache = {
    message: {},
    chat: []
  },
  init = function(options) {
    var init = options.init || {};
    var mine = init.mine || {};
    var local = layui.data('layim-mobile')[mine.id] || {},
      obj = {
        base: options,
        local: local,
        mine: mine,
        history: local.history || []
      },
      create = function(data) {
        var mine = data.mine || {};
        var local = layui.data('layim-mobile')[mine.id] || {},
          obj = {
            base: options //基础配置信息
              ,
            local: local //本地数据
              ,
            mine: mine //我的用户信息
              ,
            friend: data.friend || [] //联系人信息
              ,
            group: data.group || [] //群组信息
              ,
            history: local.history || [] //历史会话信息
          };
        obj.sortHistory = sort(obj.history, 'historyTime');
        cache = $.extend(cache, obj);
        layui.each(call.ready, function(index, item) {
          item && item(obj);
        });
      };
    cache = $.extend(cache, obj);
    if (options.brief) {
      return layui.each(call.ready, function(index, item) {
        item && item(obj);
      });
    };
    create(init)
  };

//显示好友列表面板
var layimMain = $('.index');
//显示聊天面板
var layimChat, layimMin, To = {};

//修复IOS设备在边界引发无法滚动的问题
var fixIosScroll = function(othis) {
  if (device.ios) {
    othis.on('touchmove', function(e) {
      var top = othis.scrollTop();
      if (top <= 0) {
        othis.scrollTop(1);
        e.preventDefault(e);
      }
      if (this.scrollHeight - top - othis.height() <= 0) {
        othis.scrollTop(othis.scrollTop() - 1);
        e.preventDefault(e);
      }
    });
  }
};

//同步置灰状态
var syncGray = function(data) {
  $('.layim-' + data.type + data.id).each(function() {
    if ($(this).hasClass('layim-list-gray')) {
      layui.layim.setFriendStatus(data.id, 'offline');
    }
  });
};

//获取当前聊天面板
var thisChat = function() {
  layimChat = $('.ChatRoom');
  if (layimChat.length == 0) {
    return {};
  }
  var cont = layimChat.find('.layim-chat');
  var to = JSON.parse(decodeURIComponent(cont.find('.layim-chat-tool').data('json')));
  return {
    elem: cont,
    data: to,
    textarea: cont.find('input')
  };
};

//将对象按子对象的某个key排序
var sort = function(data, key, asc) {
  var arr = [],
    compare = function(obj1, obj2) {
      var value1 = obj1[key];
      var value2 = obj2[key];
      if (value2 < value1) {
        return -1;
      } else if (value2 > value1) {
        return 1;
      } else {
        return 0;
      }
    };
  layui.each(data, function(index, item) {
    arr.push(item);
  });
  arr.sort(compare);
  if (asc) arr.reverse();
  return arr;
};
//消息声音提醒
var voice = function(data) {
  var mineId = layui.data('layim-mobile').mine.id;
  var local = layui.data('layim-mobile')[mineId];
  local.set = local.set || {};
  var set = local.set[data.type + data.id] || {};
  var noVoice = set.noVoice || false;
  if (!getMylocal('noVoice') && !noVoice) {
    if (navigator.platform != 'Win32') {
      var media = new Media("http://10.1.163.37:8080/platform/layim-v3.7.5/src/css/modules/layim/voice/default.mp3", function() {}, function() {
        alert("error!");
      });
      media.play();
    } else {
      var audio = document.createElement("audio");
      audio.src = require('@/voice/default.mp3');
      audio.play();
    }
  }
};

//接受消息
var messageNew = {},
  getMessage = function(data) {
    data = data || {};
    store.state.showNew = true;
    var group = {},
      thatChat = thisChat(),
      thisData = thatChat.data || {};
    var isThisData = thisData.id == data.id && thisData.type == data.type; //是否当前打开联系人的消息
    data.timestamp = parseInt(data.timestamp) || new Date().getTime();
    data.system || pushChatlog(data);
    messageNew = JSON.parse(JSON.stringify(data));
    voice(data);
    if ((!layimChat && data.content) || !isThisData) {
      if (cache.message[data.type + data.id]) {
        cache.message[data.type + data.id].push(data)
      } else {
        cache.message[data.type + data.id] = [data];
      }
    }

    //记录聊天面板队列
    var group = {};
    if (data.type === 'friend') {
      var friend;
      layui.each(cache.friend, function(index1, item1) {
        layui.each(item1.list, function(index, item) {
          if (item.id == data.id) {
            data.type = 'friend';
            data.name = item.username;
            return friend = true;
          }
        });
        if (friend) return true;
      });
      if (!friend) {
        data.temporary = true; //临时会话
      }
    } else if (data.type === 'group') {
      layui.each(cache.group, function(index, item) {
        if (item.id == data.id) {
          data.type = 'group';
          data.name = data.groupname = item.groupname;
          group.avatar = item.avatar;
          return true;
        }
      });
    } else {
      data.name = data.name || data.username || data.groupname;
    }
    var newData = $.extend({}, data, {
      avatar: group.avatar || data.avatar
    });
    if (data.type === 'group') {
      delete newData.username;
    }
    setHistory(newData, 'get');
    if (router.currentRoute.path === '/chatroom') {
      var typeid = router.currentRoute.query.type + router.currentRoute.query.id
      if (data.type + data.id != typeid) {
        return;
      } else {
        //如果当前会话是收到消息的人的时候
        $('.layim-chat-main').scrollTop($('.layim-chat-main')[0].scrollHeight)
      }
    } else {
      return;
    }
    var layimChatMain = layimChat.find('.layim-chat-main');
    layimChatMain.scrollTop(layimChatMain[0].scrollHeight)
    var cont = layimChat.find('.layim-chat'),
      ul = cont.find('.layim-chat-main ul');
    //系统消息
    console.log(data);
    var prevTime;
    if (ChatRoom.chatList.length == 0) {
      prevTime = 0;
    } else {
      for (var i = ChatRoom.chatList.length - 1; i >= 0; i--) {
        if (!ChatRoom.chatList[i].isSystem) {
          prevTime = ChatRoom.chatList[i].timestamp;
          break;
        }
      }
    }
    if (data.timestamp - prevTime > 60 * 1000) {
      ChatRoom.chatList.push({
        timestamp: layui.data.date(data.timestamp),
        isSystem: true
      })
    }
    ChatRoom.chatList.push(data);
    //总消息数同步
    var sortHistory=Vue.prototype.$store.state.cache.sortHistory;
    var AllMsg=0;
    for(var i=0;i<sortHistory.length;i++){
    	AllMsg+=sortHistory[i].unReadCount;
    }
    cordova.plugins.notification.badge.set(AllMsg);
    cordova.plugins.notification.local.schedule({
    	id:Math.random(),
    	title:data.username,
    	text:data.content,
    	foreground:true,
    	actions:[
    		{id:'yes',title:'确认查看'},
    		{id:'no',title:'忽略'}
    	]
    })
  };

layui['layim-mobile'] = new LAYIM();
module.exports = {
  cache
};