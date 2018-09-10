// 利用 cordova 播放音频时，要对src进行处理
// 安卓的本地资源需要去掉‘file://’
// ios的线上资源无法利用cordova播放，需下载在本地后，才可播放
import {hndsDirectoryPath,hndsDirectory} from './file.js';
export default function playAudio(src){
	if(!window.device){return}
	var isOnline=/http:\/\//.test(src);
	if (device.platform == "Android") { // 安卓系统下
		if(!isOnline){
			src=src.replace('file://','');
		}
	    _playAudio(src);
	} else { // ios系统下
	    if (isOnline) {
	        // 线上资源的src
	        var name =src.substring(src.lastIndexOf('/')+1);
	        localSrc = hndsDirectoryPath + '/' + name
	        hndsDirectory.getFile(name, {create:false, exclusive:false}, function(fileEntry){
	            // 存在文件
	            _playAudio(src)
	        }, function(){
	            // 不存在文件
	            var uri = encodeURI(src)
	            var fileTransfer = new FileTransfer()
	            fileTransfer.download(
	                uri,
	                localSrc,
	                function(entry) {
	                    _playAudio(localSrc)
	                },
	                function(error) {
	                    alert("播放失败，请稍后再试")
	                },
	                false,
	                true
	            )
	        });
	    } else {
	    	_playAudio(src);
	    }
	}
}
function audioPlay(audioPlayObj) {
	window.audioPlayObj=audioPlayObj;
    if (device.platform == "Android") {
        audioPlayObj.play()
    } else {
        audioPlayObj.play({
            numberOfLoops: 1, // 播放循环次数
            audioSrcHandleWhenScreenIsLocked: false // 锁屏时是否播放
        })
    }
}
function _playAudio(src){
    // 本地资源的src （不作处理） 
    audioPlay(new Media(src));
}
