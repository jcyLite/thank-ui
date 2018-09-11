class setAndGet{
	constructor(type) {
	 	this.type=type;
	}
	setItem(id,options){
		window[this.type].setItem(id,window['JSON'].stringify(options))
	}
	getItem(id,options){
		return window['JSON'].parse(window[this.type].getItem(id))
	}
	delAll(){
		window[this.type].clear()
	}
}
let session=new setAndGet('sessionStorage');
let local=new setAndGet('localStorage');
export {session,local}

