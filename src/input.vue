<template>
  <div>
    <div class="el-input">
      <input type="text" :disabled="readonly" v-model="newValue" :parentColumnId="parentColumnId" autocomplete="off" class="el-input__inner__1" :readonly="readonly" :style="addStyle" />
    </div>
  </div>
</template>
<script>
import event from "./event.js";
export default {
  name: "My-Input",
  props: {
    value: {
      type: [String, Number]
    },
    addStyle: {
      type: Object,
      default: () => new Object()
    },
    readonly: {
      type: Boolean,
      default: false
    },
    //所在行的id唯一标识
    parentColumnId: {
      type: String,
      default: ""
    },
    //编辑属性字段
    editPropName: {
      type: String,
      default: ""
    },
    //父组件名字
    componentName: {
      type: String,
      // default: ""
    },
  },
  data() {
    return {
      newValue: ""
    };
  },
  watch: {
     value:{
      handler(val){
        this.newValue=val
      },
      immediate:true
    },
    newValue: {
      handler(val) {
        if(this.readonly&&Object.is(Number(val),NaN)){return}
        let data={
            value:Object.is(Number(val),NaN)?val:val-0,
            prop: this.editPropName,
            parentColumnId: this.parentColumnId
          }
        try{
            event.emit(`inputChange-${this.componentName}`,data );
        }catch(err){
          console.error('error',data,val,err)
        }
      }
    },
   
  },
};
</script>
<style scoped>
.el-input {
  position: relative;
  font-size: 14px;
  display: inline-block;
  width: 100%;
}
.el-input::-webkit-scrollbar {
  z-index: 11;
  width: 6px;
}
.el-input::-webkit-scrollbar:horizontal {
  height: 6px;
}
.el-input::-webkit-scrollbar-thumb {
  border-radius: 5px;
  width: 6px;
  background: #b4bccc;
}
.el-input::-webkit-scrollbar-corner {
  background: #fff;
}
.el-input::-webkit-scrollbar-track {
  background: #fff;
}
.el-input::-webkit-scrollbar-track-piece {
  background: #fff;
  width: 6px;
}
.el-input .el-input__clear {
  color: #c0c4cc;
  font-size: 14px;
  line-height: 16px;
  cursor: pointer;
  -webkit-transition: color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
  transition: color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
}
.el-input .el-input__clear:hover {
  color: #909399;
}
.el-input__inner__1 {
  -webkit-appearance: none;
  background-color: #fff;
  background-image: none;
  border-radius: 4px;
  border: 1px solid #ddd;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  color: #606266;
  display: inline-block;
  font-size: inherit;
  height: 40px;
  line-height: 40px;
  outline: 0;
  padding: 0 15px;
  -webkit-transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
  transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
  width: 100%;
}
.el-input__prefix,
.el-input__suffix {
  position: absolute;
  top: 0;
  -webkit-transition: all 0.3s;
  text-align: center;
  height: 100%;
  color: #c0c4cc;
}
.el-input__inner__1::-webkit-input-placeholder {
  color: #c0c4cc;
}
.el-input__inner__1:-ms-input-placeholder {
  color: #c0c4cc;
}
.el-input__inner__1::placeholder {
  color: #c0c4cc;
}
.el-input__inner__1:hover {
  border-color: #c0c4cc;
}
.el-input.is-active .el-input__inner__1,
.el-input__inner__1:focus {
  border-color: #409eff;
  outline: 0;
}
.el-input__suffix {
  right: 5px;
  transition: all 0.3s;
  pointer-events: none;
}
.el-input__suffix-inner {
  pointer-events: all;
}
.el-input__prefix {
  left: 5px;
  transition: all 0.3s;
}
.el-input__icon {
  height: 100%;
  width: 25px;
  text-align: center;
  -webkit-transition: all 0.3s;
  transition: all 0.3s;
  line-height: 40px;
}
.el-input__icon:after {
  content: "";
  height: 100%;
  width: 0;
  display: inline-block;
  vertical-align: middle;
}
.el-input__validateIcon {
  pointer-events: none;
}
.el-input.is-disabled .el-input__inner__1 {
  background-color: #f5f7fa;
  border-color: #e4e7ed;
  color: #c0c4cc;
  cursor: not-allowed;
}
.el-input.is-disabled .el-input__inner__1::-webkit-input-placeholder {
  color: #c0c4cc;
}
.el-input.is-disabled .el-input__inner__1:-ms-input-placeholder {
  color: #c0c4cc;
}
.el-input.is-disabled .el-input__inner__1::placeholder {
  color: #c0c4cc;
}
.el-input.is-disabled .el-input__icon {
  cursor: not-allowed;
}
.el-input--suffix .el-input__inner__1 {
  padding-right: 30px;
}
.el-input--prefix .el-input__inner__1 {
  padding-left: 30px;
}
.el-input--medium {
  font-size: 14px;
}
.el-input--medium .el-input__inner__1 {
  height: 36px;
  line-height: 36px;
}
.el-input--medium .el-input__icon {
  line-height: 36px;
}
.el-input--small {
  font-size: 13px;
}
.el-input--small .el-input__inner__1 {
  height: 32px;
  line-height: 32px;
}
.el-input--small .el-input__icon {
  line-height: 32px;
}
.el-input--mini {
  font-size: 12px;
}
.el-input--mini .el-input__inner__1 {
  height: 28px;
  line-height: 28px;
}
.el-input--mini .el-input__icon {
  line-height: 28px;
}
.el-input-group {
  line-height: normal;
  display: inline-table;
  width: 100%;
  border-collapse: separate;
}
.el-input-group > .el-input__inner__1 {
  vertical-align: middle;
  display: table-cell;
}
.el-input-group__append,
.el-input-group__prepend {
  background-color: #f5f7fa;
  color: #909399;
  vertical-align: middle;
  display: table-cell;
  position: relative;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  padding: 0 20px;
  width: 1px;
  white-space: nowrap;
}
.el-input-group--prepend .el-input__inner__1,
.el-input-group__append {
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
}
.el-input-group--append .el-input__inner__1,
.el-input-group__prepend {
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
}
.el-input-group__append:focus,
.el-input-group__prepend:focus {
  outline: 0;
}
.el-input-group__append .el-button,
.el-input-group__append .el-select,
.el-input-group__prepend .el-button,
.el-input-group__prepend .el-select {
  display: inline-block;
  margin: -10px -20px;
}
.el-input-group__append button.el-button,
.el-input-group__append div.el-select .el-input__inner__1,
.el-input-group__append div.el-select:hover .el-input__inner__1,
.el-input-group__prepend button.el-button,
.el-input-group__prepend div.el-select .el-input__inner__1,
.el-input-group__prepend div.el-select:hover .el-input__inner__1 {
  border-color: transparent;
  background-color: transparent;
  color: inherit;
  border-top: 0;
  border-bottom: 0;
}
.el-input-group__append .el-button,
.el-input-group__append .el-input,
.el-input-group__prepend .el-button,
.el-input-group__prepend .el-input {
  font-size: inherit;
}
.el-input-group__prepend {
  border-right: 0;
}
.el-input-group__append {
  border-left: 0;
}
.el-input-group--append .el-select .el-input.is-focus .el-input__inner__1,
.el-input-group--prepend .el-select .el-input.is-focus .el-input__inner__1 {
  border-color: transparent;
}
.el-input__inner__1::-ms-clear {
  display: none;
  width: 0;
  height: 0;
}
</style>


