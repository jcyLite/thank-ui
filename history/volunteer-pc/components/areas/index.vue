<template>
	<div class="select-item">
		<div class="percent percent-area">院校地区:</div>
		<div class="per-cell per-cell-2">
			<div @layclick="chooseArea($event,0)" class="area">
				<span :class="{active:active==0}">不限</span>
			</div>
			<div @layclick="chooseArea($event,area.datavalue)" class="area" v-for='(area,index) of d'>
				<span  :class="{active:active==area.datavalue}" :datavalue='area.datavalue'>
					{{area.dataname}}
				</span>
			</div>
		</div>
	</div>
</template>
<script>
import { baseApi } from "@/modules/common.js";

import { schoolArea } from "@/server";
export default {
  data: function data() {
    return {
      d: null,
      active: 0
    };
  },
  methods: {
    chooseArea(e, i) {
      this.active = i;
      this.$emit("chooseArea", i);
    }
  },
  created() {
    schoolArea.call(this);
  }
};
</script>
<style lang="less" scoped="scoped">
@import "./index.css";
</style>
