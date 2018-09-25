require('./index.less');
function isChildOf(child, parent) {
    var parentNode;
    if(child && parent) {
        parentNode = child.parentNode;
        while(parentNode) {
            if(parent === parentNode) {
                return true;
            }
            parentNode = parentNode.parentNode;
        }
    }
    return false;
}
function loading(type){
	type=type||0;
	loading.t=loading.t||[];
	if(loading.t.length){
		for(var key in loading.t){
			clearTimeout(loading.t[key])
		}
	}
	console.log(888)
	document.getElementsByClassName('oloading').length
	&&document.body.removeChild(document.getElementsByClassName('oloading')[0]);
	var div=document.createElement('div');
	div.className="oloading";
	div.innerHTML=require('./index.tpl')({type});
	document.body.appendChild(div);
	loading.close=()=>{
		div.className="loadComplete";
		loading.t.push(setTimeout(()=>{
			isChildOf(div,document.body)&&document.body.removeChild(div);
		},200))
	}
}
export default  loading;