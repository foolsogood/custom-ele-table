<template>
  <div id="app" style="padding:20px 30px">
    <p style="line-height:60px">staticTable</p>
    <staticTable :tableData="tableData"/>
    <p style="line-height:60px">rowEditableTable</p>
    <p>
      <span
        @click="toggleEdit(item)"
        style="padding:0 20px;cursor:pointer;line-height:40px"
        :style="rowEdit.cur==item.title?{color:'red'}:{}"
        v-for="(item,idx) in rowEdit.list"
        :key="idx"
      >{{item.title}}</span>
    </p>
    <rowEditableTable
      @TableDataChange="rowEditTableDataChangeHandler"
      :tableData="edit_tableData"
      :tableHeader="edit_tableHeader"
      :bodyNotShowProps="['code']"
      uniqueKey="code"
    />
    <p style="line-height:60px">mutilTable</p>
    <p>
      <span
        @click="toggle(item)"
        style="padding:0 20px;cursor:pointer;line-height:40px"
        :style="curTitle==item.title?{color:'red'}:{}"
        v-for="(item,idx) in list"
        :key="idx"
      >{{item.title}}</span>
    </p>
    <mutilTable
      @TableDataChange="changeDataHandler"
      :firstThStyle="{color:'#ff0000'}"
      :firstThClickHandler="triggerFn"
      :isFirstThEableClick="true"
      :isReadOnly="isMutilReadOnly"
      :tableData="tableDatas_1"
      :tableHeader="tableHeader_1"
      :bodyNotShowProps="['code','id']"
      uniqueKey="code"
    />
    <!-- <p style="line-height:60px">参数说明</p>
    <explainCom :tableData="explain.prop.data" :tableHeader="explain.prop.header" />
    <p style="line-height:60px">回调方法说明</p>
    <explainCom :tableData="explain.func.data" :tableHeader="explain.func.header" />
    <p style="line-height:60px">直接操作节点方法说明</p>
    <explainCom :tableData="explain.method.data" :tableHeader="explain.method.header" /> -->
  </div>
</template>
<script>
import { staticTable, rowEditableTable, mutilTable } from "custom-ele-table";
// import explainCom from "./explain";

export default {
  name: "App",
  data() {
    return {
      triggerFn: () => {
        console.log("表头首位被点击");
      },
      // explain: {
      //   prop: {
      //     data: require("./mock/explain").default.propTableBody,
      //     header: require("./mock/explain").default.propTableHeader
      //   },
      //   func: {
      //     data: require("./mock/explain").default.funcTableData,
      //     header: require("./mock/explain").default.funcTableHeader
      //   },
      //   method: {
      //     data: require("./mock/explain").default.methodTableData,
      //     header: require("./mock/explain").default.methodTableHeader
      //   }
      // },
      tableData:require("./mock/baseInfo").tableBody ,
      edit_tableData: [],
      edit_tableHeader: [],
      rowEdit: {
        cur: "table1-计算-多行表头",
        list: [
          {
            title: "table1-计算-多行表头",
            data: require("./mock/table1").tableBody,
            header: require("./mock/table1").tableHeader
          },
          {
            title: "table2-计算-单行表头",
            data: require("./mock/table2").tableBody,
            header: require("./mock/table2").tableHeader
          }
        ]
      },
      curTitle: "table3-计算-多行表头",
      tableDatas_1: [],
      tableHeader_1: [],
      isMutilReadOnly: false,
      list: [
        {
          title: "table3-计算-多行表头",
          data: require("./mock/table3").tableBody,
          header: require("./mock/table3").tableHeader,
          isReadOnly: false
        },
        {
          title: "table4-纯展示-多行表头",
          data: require("./mock/table4").tableBody,
          header: require("./mock/table4").tableHeader,
          isReadOnly: true
        },
        {
          title: "table5-计算-多行表头",
          data: require("./mock/table5").tableBody,
          header: require("./mock/table5").tableHeader,
          isReadOnly: false
        }
      ]
    };
  },
  components: {
    staticTable,
    rowEditableTable,
    mutilTable,
    // explainCom
  },
  watch: {
    curTitle: {
      handler(val) {
        const _temp = this.list.find(item => item.title == val);
        this.tableDatas_1 = _temp.data;
        this.tableHeader_1 = _temp.header;
        this.isMutilReadOnly = _temp.isReadOnly;
      },
      immediate: true
    },
    "rowEdit.cur": {
      handler(val) {
        const _temp = this.rowEdit.list.find(item => item.title == val);
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

