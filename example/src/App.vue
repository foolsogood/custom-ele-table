<template>
  <div id="app" style="padding:20px 30px">
    <p style="line-height:60px">基本情况表</p>
    <staticTable :tableData="tableData" />
    <p style="line-height:60px">跨行单元格</p>
    <rowEditableTable @TableDataChange="rowEditTableDataChangeHandler" :tableData="tableDatas" :tableHeader="tableHeader" :bodyNotShowProps="['code']" :uniqueKey="'code'" />
    <p style="line-height:60px">多层表头</p>
    <p>
      <span @click="toggle(item)" :style="curTitle==item.title?{color:'red'}:{}" v-for="(item,idx) in list" :key="idx">{{item.title}}</span>
    </p>
    <mutilTable @TableDataChange="changeDataHandler" :firstThStyle="{color:'#ff0000'}" :firstThClickHandler="triggerFn" :isFirstThEableClick="true"  :tableData="tableDatas_1" :tableHeader="tableHeader_1" :bodyNotShowProps="['code']" :uniqueKey="'code'" />
    <p style="line-height:60px">运算公式表</p>

    <formulaTable @TableDataChange="formulaTableDataChangeHandler" :tableData="tableDatas_2" :tableHeader="tableHeader_2" :bodyNotShowProps="['code']" uniqueKey="code" />
    <p style="line-height:60px">参数&&方法说明</p>
    <explainCom  :tableData="tableDatas_5" :tableHeader="tableHeader_5"  />
    
  </div>
</template>
<script>
const {
  staticTable,
  rowEditableTable,
  mutilTable,
  formulaTable
} = require("custom-ele-table").default;
import explainCom from './explain'
export default {
  name: "App",
  data() {
    return {
      triggerFn:()=>{alert(1)},
      tableDatas_5: require("./mock/abc").default.tableBody,
      tableHeader_5: require("./mock/abc").default.tableHeader,
      tableDatas_2: require("./mock/func").default.tableBody,
      tableHeader_2: require("./mock/func").default.tableHeader,
      tableData: require("./mock/data_2").default.tableBody,
      tableDatas: require("./mock/data_3").default.tableBody,
      tableHeader: require("./mock/data_3").default.tableHeader,
      curTitle: "工业表",
      tableDatas_1: [],
      tableHeader_1: [],
      list: [
        {
          title: "工业表",
          data: require("./mock/energy_qiye").default.tableBody,
          header: require("./mock/energy_qiye").default.tableHeader
        },
        {
          title: "GHG",
          data: require("./mock/GHG").default.tableBody,
          header: require("./mock/GHG").default.tableHeader
        },
        {
          title: "三层表头",
          data: require("./mock/data_5").default.tableBody,
          header: require("./mock/data_5").default.tableHeader
        }
      ]
    };
  },
  components: { staticTable, rowEditableTable, mutilTable, formulaTable,explainCom },
  watch: {
    curTitle: {
      handler(val) {
        let _idx = this.list.findIndex(item => item.title == val);
        if (_idx != -1) {
          this.tableDatas_1 = this.list[_idx].data;
          this.tableHeader_1 = this.list[_idx].header;
        }
      },
      immediate: true,
      deep: true
    }
  },
  methods: {
    toggle(item) {
      this.curTitle = item.title;
    },
    changeDataHandler(data) {
      // console.log(data);
    },
    rowEditTableDataChangeHandler(data) {},
    formulaTableDataChangeHandler(data) {}
  }
};
</script>

