<template>
  <div class="pot-scroll-nav-panel">
    <pot-sticky-ele :ele-key="label">
      <h2 class="pot-scroll-nav-panel-title" v-html="title"></h2>
    </pot-sticky-ele>
    <slot></slot>
  </div>
</template>

<script type="text/ecmascript-6">
  import potStickyEle from '../sticky/sticky-ele.vue'

  const COMPONENT_NAME = 'pot-scroll-nav-panel'

  export default {
    name: COMPONENT_NAME,
    inject: ['scrollNav'],
    props: {
      label: {
        type: [String, Number],
        required: true
      },
      title: {
        type: [String, Number],
        default() {
          /* istanbul ignore next */
          return this.label
        }
      }
    },
    mounted() {
      this.scrollNav.addPanel(this)
    },
    beforeDestroy() {
      this.scrollNav.removePanel(this)
    },
    components: {
      potStickyEle
    }
  }
</script>
