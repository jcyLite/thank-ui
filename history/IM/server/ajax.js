import axios from 'axios';
import {im} from '@/module/socket.js';
import init from '@/module/init.js';
import {clearOneLog} from '@/module/local.js';
/**
 * this action can let a vue component's data's d change to be a url
 * @param  {imageData:String}
 * @param  {fn:Function}
 * @return {undefined}
 */
export function uploadPhoto(imageData,fn){
	var result=imageData.replace("data:image/jpeg;base64,",'');
	axios.post('websocket/changeAvatar.action',{
		uid:layui.data('layim-mobile').mine.id,
		avatarFile:result
	}).then(d=>{
		fn.call(this,d)
	})
}
/**
 * this action make a video data port
 * @param  {[type]}
 * @param  {Function}
 * @return {[type]}
 */
export function uploadVideo(videoData,fn){
	var time=new Date().getTime();
	var data=videoData.replace('data:video/mp4;base64,','');
	axios.post('websocket/upload.action',{
		fileFileName:time+'.mp4',
		fileData:data
	}).then(d=>{
		fn(d)
	})
}
/**
 * this action is set to send a audio
 * @param  {[type]}
 * @param  {Function}
 * @return {[type]}
 */
export function updateAudio(audioData,fn){
	var time=new Date().getTime();
	var data=audioData.replace('data:audio/x-wav;base64,','');
	axios.post('websocket/upload.action',{
		fileFileName:time+'.wav',
		fileData:data
	}).then(d=>{
		fn(d)
	})
}
/**
 * this action is set to send a image
 * @param  {[type]}
 * @param  {Function}
 * @return {[type]}
 */
export function sendImage(imageData,fn){
	var time=new Date().getTime();
	axios.post('websocket/upload.action',{
		fileFileName:time+'.jpeg',
		fileData:imageData
	}).then(d=>{
		fn(d)
	})
}
/**
 * this action is set to let all init port start;
 * @param  {[type]}
 * @param  {Function}
 * @return {[type]}
 */
export function AllInit(cache,socket){
	var that=this;
	var uid=this.$route.query.userId||layui.data('layim-mobile').mine.id;
	axios.all([
		axios.post('websocket/getOnLineUser.action',{uid}),
		axios.post('websocket/getGroup.action',{uid})
	]).then(d=>{
		cache.mine=d[0].data.mine;
		init(d[0].data);
		var local=layui.data('layim-mobile')[cache.mine.id]||{}
		local.set=local.set||{};
		cache.group=d[1].data;
		cache.friend=d[0].data.friend;
		for(var key in cache.friend[0].list){
			cache.friend[0].list[key].active=false;
			if(!local.set['friend'+cache.friend[0].list[key].id]){
				local.set['friend'+cache.friend[0].list[key].id]={};
			}
		}
		layui.data('layim-mobile',{
			key:'mine',
			value:cache.mine
		})
		layui.data('layim-mobile',{
			key:cache.mine.id,
			value:local
		})
		that.$store.state.cache=cache;
		that.$store.commit('login');
		im.send('record');
	})
}
/**
 * this action is set to delete a group or disband a group,
 * @param  if isOwner is '1' it means Owner
 * @param  {Function}
 * @return {[type]}
 */
export function dismissGroup(item){
	var that=this;
	var mineId=layui.data('layim-mobile').mine.id;
	this.$http.post('websocket/dismissGroup.action',{
		gid:item.id,
		uid:mineId,
		type:item.isOwner?'1':'2'
	}).then(d=>{
		clearOneLog.call(that,'group',item.id);
	})
}