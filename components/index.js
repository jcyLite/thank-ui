/*嵌入式组件*/
import Basic from './Basic';
import Form from './Form';
import Scroll from './Scroll'
import Menu from './Menu'
/*挂载组件*/
import Bottom from './Poper/Bottom';
import Tip from './Poper/Tip';
import Voice from './Cordova_Plugin/Voice';
/*引入样式*/
import './Style/Style.less';
function install_component(options){
	for(var key in options){
		var name=key.toLowerCase();
		name=name.replace('_','-');
		this.component('tk-'+name,options[key])
	}
}
function install_jquery(){
	!window.$&&(window.$=require('jquery'))
}
const Thank={
  version:1.0,
  install(Vue){
  	install_jquery.call(Vue)
  	install_component.call(Vue,Basic);
  	install_component.call(Vue,Form);
  	install_component.call(Vue,Scroll);
  	install_component.call(Vue,Menu);
  	Vue.prototype['tk_bottom']=Bottom;
  	Vue.prototype['tk_tip']=Tip;
  	Vue.prototype['tk_voice']=Voice;
  }
}
export default Thank;