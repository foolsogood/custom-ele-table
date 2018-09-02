<template>
  <div id="app" style="padding:20px 30px">
    <p style="line-height:60px">基本情况表</p>
    <staticTable :tableData="tableData" />
    <p style="line-height:60px">跨行单元格</p>
    <rowEditableTable @TableDataChange="rowEditTableDataChangeHandler" :tableData="tableDatas" :tableHeader="tableHeader" :bodyNotShowProps="['code']" :uniqueKey="'code'" />
    <p style="line-height:60px">多层表头</p>
    <p>
      <span @click="toggle(item)" style="padding-right:20px" :style="curTitle==item.title?{color:'red'}:{}" v-for="(item,idx) in list" :key="idx">{{item.title}}</span>
    </p>
    <mutilTable @TableDataChange="changeDataHandler" :firstThStyle="{color:'#ff0000'}" :firstThClickHandler="triggerFn" :isFirstThEableClick="true" :tableData="tableDatas_1" :tableHeader="tableHeader_1" :bodyNotShowProps="['code']" :uniqueKey="'code'" />
    <p style="line-height:60px">运算公式表</p>
    <formulaTable @TableDataChange="formulaTableDataChangeHandler" :tableData="tableDatas_2" :tableHeader="tableHeader_2" :bodyNotShowProps="['code']" uniqueKey="code" />
  </div>
</template>

<script>
  const {
    staticTable,
    rowEditableTable,
    mutilTable,
    formulaTable
  } = require("custom-ele-table").default;
  export default {
    name: "App",
    data() {
      return {
        triggerFn: () => {
          alert(1)
        },
        tableDatas_2: require("./mock/func").default.tableBody,
        tableHeader_2: require("./mock/func").default.tableHeader,
        tableData: require("./mock/data_2").default.tableBody,
        tableDatas: require("./mock/data_3").default.tableBody,
        tableHeader: require("./mock/data_3").default.tableHeader,
        curTitle: "电表",
        tableDatas_1: [],
        tableHeader_1: [],
        list: [{
            title: "唐总看这个",
            data: require("./mock/data_1").default.tableBody,
            header: require("./mock/data_1").default.tableHeader
          },
          {
            title: "电表",
            data: require("./mock/electricity").default.tableBody,
            header: require("./mock/electricity").default.tableHeader
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
    components: {
      staticTable,
      rowEditableTable,
      mutilTable,
      formulaTable
    },
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
    created() {
      let tableBody=require("./mock/func").default.tableBody
      console.log(this.getFn(tableBody))
    },
    methods: {
      getFn(tableBody) {
        let arr= tableBody.map(item => {
          for (let [key, value] of Object.entries(item)) {
            if (typeof value == 'object' && value.fn) {
              return value.fn
            }
          }
        }).filter(item=>item)
        return [...new Set(arr)]
      },
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

