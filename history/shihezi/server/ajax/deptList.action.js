var cache;
export default function(reset){
	if(cache){
		this.deptList=cache;
	}else{
		this.$http.post('deptList.action',{
			busiType:1
		}).then(d=>{
			this.deptList=d.data;
			cache=d.data;
			reset&&reset(true);
		})
	}
}