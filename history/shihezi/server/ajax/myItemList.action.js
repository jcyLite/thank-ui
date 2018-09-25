export default function(reset){
	this.$http.post('myItemList.action', {
		cpage: this.page,
		len: 10
	}).then(d => {
		if(this.page == 1) {
			this.d = d.data;
		} else if(d.data.length == 0) {
			reset&&reset('nodata')
		} else {
			this.d = this.d.concat(d.data)
		}
		reset && reset(true);
	})
}
