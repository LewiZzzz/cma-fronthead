<template>
  <NavBar :role=1>
  </NavBar>
  <router-view/>
</template>

<script>
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap'
import 'element-plus/dist/index.css'
import NavBar from '@/components/NavBar.vue'

export default {
  name: "App",
  components: {
    NavBar: NavBar,
  }  
}
</script>

<style>

@font-face {
  font-family: '未来荧黑';
  /* 字体名称 */
  src: url('/public/font/GlowSansSC-Normal-Book.otf') format('opentype');
  font-weight: normal;
  font-style: normal;
}

* {
  font-family: '未来荧黑', Arial, sans-serif;
  font-weight: 500;
}


</style>
