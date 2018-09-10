window.testAjax=function(data){
	$.ajax({
		data:data,
		type:'post',
		url:'https://192.168.1.113:3333/test',
		success(){
			
		},
		dataType:'JSON'
	})
}
