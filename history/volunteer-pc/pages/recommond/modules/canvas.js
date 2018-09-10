var $ = require('jquery')
function canvasMycanvas() {
	var canvas = $("#mycanvas")[0].getContext('2d');
	canvas.moveTo(68, 72);
	canvas.lineTo(87, 72);
	canvas.lineTo(87, 90);
	canvas.lineTo(68, 72);
	canvas.strokeStyle = "#e5e5e5";
	canvas.fillStyle = '#e5e5e5';
	canvas.fill();
	canvas.stroke();
	canvas.moveTo(297, 72);
	canvas.lineTo(278, 72);
	canvas.lineTo(278, 90);
	canvas.lineTo(297, 72);
	canvas.strokeStyle = "#e5e5e5";
	canvas.fillStyle = '#e5e5e5';
	canvas.fill();
	canvas.stroke();
	canvas.save();
	canvas.moveTo(0, 39);
	canvas.lineTo(87, 39);
	canvas.lineTo(87, 89);
	canvas.lineTo(0, 89);
	canvas.lineTo(12, 70);
	canvas.lineTo(0, 39);
	canvas.strokeStyle = "#fe6a23";
	canvas.fillStyle = '#fffaf8';
	canvas.fill();
	canvas.stroke();
	canvas.moveTo(365, 39);
	canvas.lineTo(278, 39);
	canvas.lineTo(278, 89);
	canvas.lineTo(365, 89);
	canvas.lineTo(353, 70);
	canvas.lineTo(365, 39);
	canvas.strokeStyle = "#fe6a23";
	canvas.fillStyle = '#fffaf8';
	canvas.fill();
	canvas.stroke();
	canvas.fillRect(69, 0, 229, 72);
	canvas.lineWidth = 1;
	canvas.strokeRect(69, 1, 229, 72);
	canvas.restore();
}
// 成绩分析报告配图
function scoreCanvas(sel, percent) {
	var c = document.getElementById(sel);
	var ctx = c.getContext("2d");
	ctx.beginPath();
	ctx.arc(123, 123, 86, 0, 2 * Math.PI); // 画圆，边框#eee，背景#fff
	ctx.strokeStyle = '#eee';
	ctx.fillStyle = '#fff';
	ctx.lineWidth = '15';
	ctx.fill();
	ctx.stroke();
	ctx.closePath();
	ctx.beginPath();
	ctx.arc(123, 123, 86, -.5 * Math.PI, (2 * (percent / 100) - .5) * Math.PI); // 根据percent/100的值画圆，边框#fe6a23
	ctx.strokeStyle = '#fe6a23';
	ctx.font = '50px Arial';
	ctx.textAlign = 'center';
	ctx.textBaseline = "middle";
	ctx.fillStyle = '#fe6a23';
	ctx.fillText(percent + '%', 123, 123);
	ctx.lineCap = 'round';
	ctx.stroke();
	ctx.closePath();
	ctx.beginPath();
	ctx.font = '24px Arial';
	ctx.textBaseline = "bottom";
	ctx.fillText('可冲刺', 123, 178);
	ctx.stroke();
	ctx.closePath();
}
export  {canvasMycanvas,scoreCanvas}