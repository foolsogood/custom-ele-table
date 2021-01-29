<template>
  <div id="app" style="padding:20px 30px">
    <div>
      <vue-slider v-model="value" />
    </div>
    <div class="bd-btm-2 pd-btm-30">
      <p class="lh-60">staticTable</p>
      <staticTable :tableData="tableData" />
      <div>
        <button @click="view1Handler" class="btn">
          {{ showText(isView1Show) }}
        </button>
        <div v-show="isView1Show">
          <JsonViewer
            :value="tableData"
            :expand-depth="5"
            copyable
            sort
          ></JsonViewer>
        </div>
      </div>
    </div>
    <div class="bd-btm-2 pd-btm-30">
      <p class="lh-60">rowEditableTable</p>
      <p>
        <span
          @click="toggleEdit(item)"
          style="padding:0 20px;cursor:pointer;line-height:40px"
          :style="rowEdit.cur == item.title ? { color: 'red' } : {}"
          v-for="(item, idx) in rowEdit.list"
          :key="idx"
          >{{ item.title }}</span
        >
      </p>
      <rowEditableTable
        @TableDataChange="rowEditTableDataChangeHandler"
        :tableData="edit_tableData"
        :tableHeader="edit_tableHeader"
        :bodyNotShowProps="['code']"
        uniqueKey="code"
      />
      <div>
        <button @click="view2Handler" class="btn">
          {{ showText(isView2Show) }}
        </button>
        <div v-show="isView2Show">
          <div>
            表头
            <JsonViewer
              :value="isView2Show && edit_tableHeader"
              :expand-depth="5"
              copyable
              sort
            ></JsonViewer>
          </div>
          <div>
            表体
            <JsonViewer
              :value="isView2Show && edit_tableData"
              :expand-depth="5"
              copyable
              sort
            ></JsonViewer>
          </div>
        </div>
      </div>
    </div>
    <div class="pd-btm-30">
      <p class="lh-60">mutilTable</p>
      <p>
        <span
          @click="toggle(item)"
          style="padding:0 20px;cursor:pointer;line-height:40px"
          :style="curTitle == item.title ? { color: 'red' } : {}"
          v-for="(item, idx) in list"
          :key="idx"
          >{{ item.title }}</span
        >
      </p>
      <mutilTable
        @TableDataChange="changeDataHandler"
        :firstThStyle="{ color: '#ff0000' }"
        :firstThClickHandler="triggerFn"
        :isFirstThEableClick="true"
        :isReadOnly="isMutilReadOnly"
        :tableData="mutil_tableData"
        :tableHeader="mutil_tableHeader"
        :bodyNotShowProps="['code', 'id']"
        uniqueKey="code"
      />
      <div>
        <button @click="view3Handler" class="btn">
          {{ showText(isView3Show) }}
        </button>
        <div v-show="isView3Show">
          <div>
            表头
            <JsonViewer
              :value="isView3Show && mutil_tableHeader"
              :expand-depth="5"
              copyable
              sort
            ></JsonViewer>
          </div>
          <div>
            表体
            <JsonViewer
              :value="isView3Show && mutil_tableData"
              :expand-depth="5"
              copyable
              sort
            ></JsonViewer>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
// import {
//   staticTable,
//   rowEditableTable,
//   mutilTable
// } from "../../dist/custom-ele-table.umd";
import { staticTable, rowEditableTable, mutilTable } from "custom-ele-table";
import JsonViewer from "vue-json-viewer";
import VueSlider from "vue-slider-component";
import "vue-slider-component/theme/antd.css";

export default {
  name: "App",
  data() {
    return {
      value: 0,
      isView1Show: false,
      isView2Show: false,
      isView3Show: false,
      triggerFn: () => {
        console.log("表头首位被点击");
      },

      tableData: require("./mock/baseInfo").tableBody,
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
      mutil_tableData: [],
      mutil_tableHeader: [],
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
    JsonViewer,
    VueSlider
  },
  watch: {
    curTitle: {
      handler(val) {
        const _temp = this.list.find(item => item.title == val);
        this.mutil_tableData = _temp.data;
        this.mutil_tableHeader = _temp.header;
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
    showText(bool) {
      return bool ? "隐藏数据" : "查看数据";
    },
    toggle(item) {
      this.curTitle = item.title;
    },
    toggleEdit(item) {
      this.rowEdit.cur = item.title;
    },
    changeDataHandler(data) {
      // console.log(data);
    },
    view1Handler() {
      this.isView1Show = !this.isView1Show;
    },
    view2Handler() {
      this.isView2Show = !this.isView2Show;
    },
    view3Handler() {
      this.isView3Show = !this.isView3Show;
    },
    rowEditTableDataChangeHandler(data) {}
  }
};
</script>
<style>
.pd-btm-30 {
  padding-bottom: 30px;
}
.bd-btm-2 {
  border-bottom: 2px dashed #ddd;
}
.lh-60 {
  line-height: 60px;
}
.btn {
  cursor: pointer;
  border: 1px solid #ddd;
  padding: 2px 5px;
  margin-bottom: 10px;
}
</style>
