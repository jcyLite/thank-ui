export function mycamera(callback,type){
	function successCallback(imageData){
		callback(imageData);
	}
	function errorCallback(message){
		
	}
	navigator.camera.getPicture(successCallback,errorCallback,{
		quality: 50,
		destinationType:type?Camera.DestinationType.DATA_URL:Camera.DestinationType.FILE_UR
	});
}
export function choosePic(callback,type){
	function successCallback(imageData){
		callback(imageData);
	}
	function errorCallback(message){
	}
	navigator.camera.getPicture(successCallback,errorCallback,{
		quality: 50,
		destinationType: type?Camera.DestinationType.DATA_URL:Camera.DestinationType.FILE_UR,
		sourceType :Camera.PictureSourceType.SAVEDPHOTOALBUM
	});
}
