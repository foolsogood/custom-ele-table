<template>
  <div id="app" style="padding:20px 30px">
    <p style="line-height:60px">基本情况表</p>
    <staticTable :tableData="tableData" />
    <p style="line-height:60px">跨行单元格</p>
    <p>
      <span @click="toggleEdit(item)" :style="rowEdit.cur==item.title?{color:'red'}:{}" v-for="(item,idx) in rowEdit.list" :key="idx">{{item.title}}</span>
    </p>
    <rowEditableTable  @TableDataChange="rowEditTableDataChangeHandler" :tableData="edit_tableData" :tableHeader="edit_tableHeader" :bodyNotShowProps="['code']" uniqueKey="code" />

    <p style="line-height:60px">多层表头</p>
    <p>
      <span @click="toggle(item)" style="padding-right:20px" :style="curTitle==item.title?{color:'red'}:{}" v-for="(item,idx) in list" :key="idx">{{item.title}}</span>
    </p>
    <mutilTable  @TableDataChange="changeDataHandler" :firstThStyle="{color:'#ff0000'}" :firstThClickHandler="triggerFn" :isFirstThEableClick="true" :isReadOnly="isMutilReadOnly" :tableData="tableDatas_1" :tableHeader="tableHeader_1" :bodyNotShowProps="['code','id']" uniqueKey="code" />

    <!-- <p style="line-height:60px">参数说明</p>
    <explainCom :tableData="explain.prop.data" :tableHeader="explain.prop.header" />
    <p style="line-height:60px">方法说明</p>
    <explainCom :tableData="explain.func.data" :tableHeader="explain.func.header" /> -->
  </div>
</template>
<script>
const {
  staticTable,
  rowEditableTable,
  mutilTable,
} = require("custom-ele-table").default;
import explainCom from "./explain";

export default {
  name: "App",
  data() {
    return {
      triggerFn: () => {
        alert(1);
      },
      explain: {
        prop: {
          data: require("./mock/explain").default.propTableBody,
          header: require("./mock/explain").default.propTableHeader
        },
        func: {
          data: require("./mock/explain").default.funcTableData,
          header: require("./mock/explain").default.funcTableHeader
        }
      },
      tableData: require("./mock/data_2").default.tableBody,
      edit_tableData: [],
      edit_tableHeader: [],
      rowEdit: {
        cur: "纯展示",
        list: [
          {
            title: "纯展示",
            data: require("./mock/func_4").default.tableBody,
            header: require("./mock/func_4").default.tableHeader
          },
          {
            title: "计算",
            data: require("./mock/func_3").default.tableBody,
            header: require("./mock/func_3").default.tableHeader
          }
        ]
      },
      curTitle: "计算",
      tableDatas_1: [],
      tableHeader_1: [],
      isMutilReadOnly: false,
      list: [
        {
          title: "计算",
          data: require("./mock/func_7").default.tableBody,
          header: require("./mock/func_7").default.tableHeader,
          isReadOnly: false
        },
        {
          title: "GHG",
          data: require("./mock/GHG").default.tableBody,
          header: require("./mock/GHG").default.tableHeader,
          isReadOnly: true
        },
        {
          title: "123",
          data: require("./mock/func").default.tableBody,
          header: require("./mock/func").default.tableHeader,
          isReadOnly: false
        }
      ]
    };
  },
  components: {
    staticTable,
    rowEditableTable,
    mutilTable,
    explainCom
  },
  watch: {
    curTitle: {
      handler(val) {
        let _temp = this.list.find(item => item.title == val);
        this.tableDatas_1 = _temp.data;
        this.tableHeader_1 = _temp.header;
        this.isMutilReadOnly = _temp.isReadOnly;
      },
      immediate: true
    },
    "rowEdit.cur": {
      handler(val) {
        let _temp = this.rowEdit.list.find(item => item.title == val);
        this.edit_tableData = _temp.data;
        this.edit_tableHeader = _temp.header;
      },
      immediate: true
    }
  },
  methods: {
    toggle(item) {
      this.curTitle = item.title;
    },
    toggleEdit(item) {
      this.rowEdit.cur = item.title;
    },
    changeDataHandler(data) {
      // console.log(data);
    },
    rowEditTableDataChangeHandler(data) {}
  }
};
</script>

