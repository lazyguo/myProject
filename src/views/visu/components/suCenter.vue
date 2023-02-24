<template>
  <dv-border-box-1 class="contain">
    <dv-flyline-chart :config="config" style="width:100%;height:100%;" />
  </dv-border-box-1>
</template>

<script lang="ts" setup>
import {ref} from 'vue'
import mapConfig from '../map/config'
let config = ref(mapConfig)
</script>

<style lang="scss" scoped>
.contain {
    width:800px;
    height:500px;
    overflow: hidden;
    background:url('../map/map.jpg') no-repeat 50% 50%
}
</style>