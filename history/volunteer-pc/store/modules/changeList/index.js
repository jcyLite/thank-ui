function changeList(){
	this.namespaced=true;
	this.state = new createState()
	this.mutations=new createMutation()
}
function createState(){
	this['page']=1;
	this['city']=0
	this['category']=0
	this['manbili']=0
	this['abroad']=0
	this['school_rank']=0
	this['school_level']=0
	this['graduate']=0
	this['sname']=0
}
function createMutation(){	
	this['toPage']=(state,{i})=>{
		state.page = i
	}
	this['chooseArea']=(state,{i})=>{
		state.city=i;
		state.page=1;
	}
	this['chooseCategorys']=(state,{i})=>{
		state.category=i;
		state.page=1;
	}
	this['changeCondition']=(state,{i,type})=>{
		state[type]=i;
		state.page=1;
	}
	this['changeSname']=(state,{name})=>{
		state.sname=name;
	}
	this['reset']=(state)=>{
		createState.call(state);
	}
}
//看职业选专业
const seeJobChoseSchool=new changeList;
const changeSchoolList=new changeList;
export {changeSchoolList,seeJobChoseSchool}
