const phone_RE=/^0?(13[0-9]|15[012356789]|17[013678]|18[0-9]|14[57])[0-9]{8}$/;/* 手机校验 */
const password_RE_tooShort=/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,}$/;
const password_RE_tooWeak=/^(?:(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])).{8,}$/
export default {
	state:{
		
	},
	mutations:{
		phone_blur(a){
			console.log(this.phone)
			if(!phone_RE.test(this.phone)){
				return toast("手机号码格式不正确")
			}
		},
		password_blur(){
			if(!password_RE_tooShort.test(this.password)){
				return toast("请输入至少8位数字和字母的组合")
			}else if(!password_RE_tooWeak.test(this.password)){
				return toast("密码强度太低，请包含大写和小写字母")
			}
		}
	}
}
