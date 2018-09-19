<template>
    <div class="wrap flexBox alItSt" v-show="showWrap" :class="showContent ?'fadein':'fadeout'">
        <span>{{text}}</span>
    </div>
</template>
<script>
import event from "./event.js";
export default {
  data() {
    return {
      showWrap: true,
      showContent: false,
      text: "文本"
    };
  },
  created() {
    event.on("show-toast", ({ text }) => {
      this.text = text;
      this.showWrap = true;
      this.showContent = true;
      setTimeout(() => {
        this.showContent = false;
        setTimeout(() => {
          this.showWrap = false;
        }, 0);
      }, 1000 * 3);
    });
  }
};
</script>

<style scoped>
.wrap {
  position: fixed;
  left: 50%;
  top: 10%;
  z-index: 999;
  background: rgba(0, 0, 0, 0.35);
  padding: 10px;
  border-radius: 5px;
  transform: translate(-50%, -50%);
  color: #fff;
}
.fadein {
  animation: animate_in 0.25s;
}
.fadeout {
  animation: animate_out 0.25s;
  opacity: 0;
}
@keyframes animate_in {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
@keyframes animate_out {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
</style>
