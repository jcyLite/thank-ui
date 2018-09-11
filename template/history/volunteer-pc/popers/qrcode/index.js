require('./index.css');
var $ = require('jquery');
var qrcode = require('./jq.qrcode.js');

function qrCode(content){	   
   var oFragmeng = document.createDocumentFragment(); 
   var divBox = document.createElement('div')
   divBox.setAttribute('id','qrCodeBox')
   //创建新的div
   var newDiv = document.createElement('div')
   //给div添加id
   newDiv.setAttribute('id','qrcoding')
   //创建h4
   var newH4 = document.createElement('h4')
   newH4.innerHTML = "请使用手机扫描下方二维码图标"
   //创建span关闭
   var closeSpan = document.createElement('span')
   closeSpan.innerHTML = 'X'
   newH4.appendChild(closeSpan)   
   //将newH4添加到新div中
   newDiv.appendChild(newH4)
   divBox.appendChild(newDiv)
   oFragmeng.appendChild(divBox)
   document.body.appendChild(oFragmeng)
   $('#qrcoding').qrcode(content);
   var height = parseInt((window.innerHeight * 0.3))
   $('#qrcoding').css('margin',''+height+'px auto')  
   $(closeSpan).on('click',function(){
   		document.body.removeChild(divBox);
   })
}

export default qrCode