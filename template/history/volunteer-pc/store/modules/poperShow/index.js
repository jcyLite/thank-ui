class cus{
	constructor(type){
		this.state={
			show:!1
		}
	}
}
const login=new cus('login');
const register=new cus('register');
const forget=new cus('forget');
const tips=new cus('tips');
export  {login,register,forget,tips}