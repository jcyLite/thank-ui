<style lang="less">
	.document{
		padding:10px;
		.title{
			font-size:22px;
			font-weight:600;
		}
		.content{
			span{
				color:#333;
				font-weight: 600;
			}
		}
		table{
			border-right:1px solid #ddd;
			border-bottom:1px solid #ddd;
			thead{
				td{
					text-align: center;
					border-top:1px solid #ddd;
					border-left:1px solid #ddd;
				}
			}
			tbody{
				tr{
					td{
						text-align: center;
						border-top:1px solid #ddd;
						border-left:1px solid #ddd;
					}
				}
			}
		}
	}
</style>

<template>
	<div class="document">
		<div class="title">开始</div>
		<div class="content">
			1、安装Thank-UI npm包：
			<br />
			npm install thank-ui
			<br />
			2、引入Thank-UI：
			<br />
			import Thank form 'thank-ui'
			<br />
			Vue.use(Thank)
		</div>
		<div class="title">Button按钮</div>
		<table>
			<thead>
				<td>标签</td>
				<td>传参</td>
				<td>类型</td>
				<td>使用方法</td>
			</thead>
			<tbody>
				<tr>
					<td>tk-button</td>
					<td>type</td> 
					<td>String</td>
					<td>双标记，内容写中间</td>
				</tr>
				<tr>
					<td>tk-button-group</td>
					<td>contents</td>
					<td>Array</td>
					<td>单标记</td>
				</tr>
			</tbody>
		</table>
		<div class="title">Cell单元格</div>
		<table>
			<thead>
				<td>标签</td>
				<td>传参</td>
				<td>类型</td>
				<td>使用方法</td>
			</thead>
			<tbody>
				<tr>
					<td rowspan="4">tk-cell</td>
					<td>title</td> 
					<td>String</td>
					<td rowspan="4">单标记</td>
				</tr>
				<tr>
					<td>status</td>
					<td>String</td>
				</tr>
				<tr>
					<td>content</td>
					<td>String</td>
				</tr>
				<tr>
					<td>time</td>
					<td>String</td>
				</tr>
			</tbody>
		</table>
		<div class="title">According手风琴</div>
		<div class="title">poper-bottom弹出层（下弹出）</div>
		<div class="title">Tips 弹出层（提示）</div>
		<div class="title">jquery插件</div>
	</div>
</template>

<script>
	export default{
	}
</script>


