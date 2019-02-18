<template>
  <div id='overlay' @click='close' >
    <img ref="imgbox" :src='imgsource.imgUrl' alt='' />
    <div class="rote" @click.stop="imgRotate"></div>
  </div>
  
  
</template>
<script>
export default {
  props: {
    imgsource: Object,
    close: Function
  },
  data () {
    return {
      num: 0,
      flag: true
    }
  },
  methods: {
    imgRotate () {
      if (this.flag) {
        this.flag = false
        this.num++
        this.$refs.imgbox.style.transform = `rotate(${this.num * 90}deg)`
        setTimeout(() => {
          this.flag = true
        }, 500)
      }
    }
  },
  mounted () {
    var overlay = document.getElementById('overlay')
    overlay.setAttribute('style', 'height:' + window.innerHeight + 'px; ' + 'width:' + window.innerWidth + 'px')
  }
}
</script>
<style lang="scss" scoped>
#overlay {
  position: fixed;
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  flex-direction: column;
  justify-content: center;    
  align-items: center;
  top: 0;
  left: 0;
  user-select: none;
  z-index: 3004;
}
.box{
  position: relative;
}
.rote{
  width: 40px;
  height: 40px;
  position: absolute;
  left: 0;
  right: 0;
  bottom:100px;
  margin: 0 auto;
  background-image: url('../../assets/img/rotate.png');
  background-repeat: no-repeat;
  background-size: 100%;
}
#overlay img {
  height: 80%;
  width: auto;
}



</style>
