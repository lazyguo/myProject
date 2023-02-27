<template>
  <div class="not_found">
    <div class="title">404</div>
    <div class="title_t">Not Found</div>
  </div>
</template>

<script></script>

<style lang="scss" scoped>
.not_found {
  width: 100%;
  height: 100%;
  position: relative;
  background: url('@/assets/imgs/404.jpg') no-repeat;
  .title {
    color: rgba(255,255,255,.8);
    font-size: 120px;
    font-weight: 700;
    position: absolute;
    top: 0px;
    right: 0;
  }
  .title_t {
    color: rgba(255,255,255,.8);
    font-size: 100px;
    font-weight: 700;
    position: absolute;
    top: 120px;
    right: 5px;
  }
}
</style>
