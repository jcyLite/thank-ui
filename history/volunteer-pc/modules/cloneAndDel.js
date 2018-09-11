function clone(o,d){
	for(var key in d){
		o[key]=d[key]
	}
}
function delAll(o){
	for(var key in o){
		delete o[key]
	}
}
export {clone,delAll}
