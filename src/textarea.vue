<template>
  <div class="el-textarea">
    <textarea class="el-textarea__inner__1" :readonly="isReadonly" wrap="off" v-model="textAreaContent" style="border-top: none; border-bottom: none; border-left: none; line-height:30px; margin: 0;padding: 0;" :style="{height: `${ossTableDataLength * 40 + ossTableDataLength - 1}px`}" placeholder="说明" />
  </div>
</template>
<script>
import event from "./event.js";

export default {
  props: {
    ossTableDataLength: { type: [String, Number] },
    propContent: { type: String },
    isReadonly:{type:Boolean,default:false}
  },
  data() {
    return {
      textAreaContent: ""
    };
  },
  mounted() {
    this.textAreaContent = this.propContent;
  },
  watch: {
    textAreaContent: {
      handler(val) {
        event.emit("textarea-change", val);
      }
    }
  }
};
</script>
<style scoped>
.el-textarea {
  display: inline-block;
  width: 100%;
  vertical-align: bottom;
  font-size: 14px;
}
.el-textarea__inner__1 {
  display: block;
  resize: vertical;
  padding: 5px 15px;
  line-height: 1.5;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  width: 100%;
  font-size: inherit;
  color: #606266;
  background-color: #fff;
  background-image: none;
  border: 1px solid #ddd;
  -webkit-transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
  transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
}
.el-textarea__inner__1::-webkit-input-placeholder {
  color: #c0c4cc;
}
.el-textarea__inner__1:-ms-input-placeholder {
  color: #c0c4cc;
}
.el-textarea__inner__1::placeholder {
  color: #c0c4cc;
}
.el-textarea__inner__1:hover {
  border-color: #c0c4cc;
}
.el-textarea__inner__1:focus {
  outline: 0;
  border-color: #409eff;
}
.el-textarea.is-disabled .el-textarea__inner__1 {
  background-color: #f5f7fa;
  border-color: #e4e7ed;
  color: #c0c4cc;
  cursor: not-allowed;
}
.el-textarea.is-disabled .el-textarea__inner__1::-webkit-input-placeholder {
  color: #c0c4cc;
}
.el-textarea.is-disabled .el-textarea__inner__1:-ms-input-placeholder {
  color: #c0c4cc;
}
.el-textarea.is-disabled .el-textarea__inner__1::placeholder {
  color: #c0c4cc;
}
</style>

