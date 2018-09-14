export default function (reset,isAll) {
	if(isAll){
		return this.$http.post("infoList.action", {
				cpage: 1,
				len: 5
			})
	}
	this.$http.post("infoList.action", {
		cpage: 1,
		len: 5
	}).then(d => {
		this.d = d.data;
		reset && reset(true)
	})
}