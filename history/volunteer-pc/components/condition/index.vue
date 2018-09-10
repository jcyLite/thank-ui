<template>
	<div class="select-item">
		<div class="percent percent-area">更多筛选:</div>
		<div class="per-cell per-cell-2">
			<div class="condition" v-for='(condition,index) of conditions'>
				<select
					v-model=condition.name
					@change='change($event,condition)'
					:type=condition.type>
					<option class="hide">{{condition.name}}</option>
					<option  v-for='val of condition.child' :orderid=val.level :datavalue=val.datavalue>{{val.dataname}}</option>
				</select>
			</div>
		</div>
	</div>
</template>
<script>
	const cache={};
	export default{		
		data() {
			return {
				conditions: null
			};
		},
		created(){
			if(!cache.conditions){
				this.$http.get('?service=App.School.Filtrate').then(d=>{
					cache.conditions=this.conditions = d.data
				})	
			}else{
				this.conditions=cache.conditions;
			}		
		},
		methods: {
			change(e,condition) {
				this.$emit('changeCondition',condition);				
			}
		}
	};
</script>