<template>
    <div id="app">
      <router-view />
    </div>
</template>
<style>
    
</style>
<script>
export default {
  mounted(){
    window.document.title = global.config.documentTile
  }
}
</script>
