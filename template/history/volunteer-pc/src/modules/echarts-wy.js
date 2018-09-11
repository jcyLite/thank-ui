!function(){
	//功能：毕业生就业薪酬统计的图表
	//传参：selector（dom节点），data（后台数据 json形式）
	//返回值：无返回值
	//依赖：echarts.js
	var polyChart=function(selector,data){  //selector的值要固定值，不能写百分比
		var myChart = echarts.init(document.querySelector(selector));
        // 指定图表的配置项和数据
       	option = {
            title: {
                text: '单位：元',
                textStyle: {
                    fontSize: 18,
                    color: '#333'          // 主标题文字颜色
                }
            },
            backgroundColor:'#fff',
            tooltip: {
                trigger: 'axis'
            },
            legend: {
                data:['本校毕业生','全国毕业生']
            },
            
            xAxis: {
                type: 'category',
                boundaryGap: false,
                data: ['毕业一年','毕业两年','毕业五年','毕业十年'],
                textStyle: {
                    fontSize: 36,
                    color: '#f40'          // 主标题文字颜色
                }
            },
            yAxis: {
                type: 'value'
            },
            series: [
                {
                    name:'本校毕业生',
                    type:'line',
                    stack: '总量',
                    color:['#11BDC5'],
//                    data:[8531, 12617, 15924, 16565.5,18653, 17883,18888]
					data:data.data1
                },
                {
                    name:'全国毕业生',
                    type:'line',
                    stack: '总量',
                    color:["#f40"],
//                  data:[1531, 11617, 12924, 13565.5,14653, 13883,10888]
					data:data.data2
                }

            ]
        };
        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
	}
	
	//功能：毕业生行业分布统计的图表
	//传参：selector（dom节点），data（后台数据 json形式）
	//		data = {
	//			data1:[1,2,3,4],  //data1为y轴数据  data2为x轴数据
	//			data2:[1,2,3,4]
	//		}
	//返回值：无返回值
	//依赖：echarts.js
	var distribution = function(selector,data){
		var myChart = echarts.init(document.querySelector(selector));
//		var myChart = echarts.init(document.getElementById(selector));
        // 指定图表的配置项和数据
        option1 = {
            color: ['#3398DB'],
            tooltip : {
                trigger: 'axis',
                axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                    type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                }
            },
            grid: {
                left: '1%',
                right: '5%',
                bottom: '3%',
                containLabel: true
            },
            yAxis : [
                {
                    type : 'category',
                    data : data.data1,
                    axisTick: {
                        alignWithLabel: true
                    }
                }
            ],
            xAxis : [
                {
                    type : 'value'
                }

            ],
            series : [
                {
                    name:'直接访问',
                    type:'bar',
                    color:['#11BDC5'],
                    barWidth: '40%',
                    data:data.data2
                }
            ]
        };

        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option1);
	}
	window['echartsWy'] = {
		polyChart:polyChart,
		distribution:distribution
	};
}()
