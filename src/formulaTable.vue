<script>
import tools from "./tools/index";
import MyInput from "./input.vue";
import event from "./event.js";

export default {
  name: "FormulaTable",
  props: {
    //表体
    tableData: {
      type: Array,
      default: () => new Array()
    },
    //表头
    tableHeader: {
      type: Array,
      default: () => new Array()
    },
    //表体不显示的属性
    bodyNotShowProps: {
      type: Array,
      default: () => new Array()
    },
    //表格边框颜色
    tableBorderColor: {
      type: String,
      default: "#ddd"
    },
    //单元格高度
    cellHeight: {
      type: [String, Number],
      default: "40"
    },
    //唯一标识 如code,id之类
    uniqueKey: {
      type: String,
      default: ""
    },
    //点击第一个th触发事件
    firstThClickHandler: {
      type: Function
    },
    //firstThClickHandler属性是否可用
    isFirstThEableClick: {
      type: Boolean,
      default: false
    },
    //首位th的样式
    firstThStyle: {
      type: Object,
      default: () => {}
    },
    //该表格是否只读
    isReadOnly: {
      type: Boolean,
      default: false
    },
    //表体无数据显示的提示语
    bodyEmptyTips: {
      type: String,
      default: "暂无数据"
    },
    //header样式
    headerStyle: {
      type: Object,
      default: () =>
        new Object({
          background: "rgb(230, 242, 246)",
          color: "#333"
        })
    },
    //body单元格样式
    cellStyle: {
      type: Object,
      default: () =>
        new Object({
          background: "#fff",
          color: "#333"
        })
    }
  },
  data() {
    return {
      ossTableHeader: [], //处理过的表头
      ossTableData: [], //处理过的表体
      curEditTdId: "", //当前编辑状态的td 的id
      headerArr: [], //由表头所有项目组成
      bodyNotShowPropData: ["table_id"], //表体数据中不显示的属性
      curTableData: [], //当前表格的数据，暴露给父组件
      isBodyEmpty: false //表体是否无数据
    };
  },
  components: { MyInput },
  created() {
    //表格处于可编辑状态时 input变化要将数据改变后的表格数据同步到父组件
    event.on(`inputChange-${this.$options.name}`, val => {
      // console.log(val);
      //找到数据变化的那一行tr
      let _temp = this.curTableData.find(
        item => item[this.uniqueKey] == val.parentColumnId
      );
      if (typeof _temp[val.prop] == "object") {
        this.$set(
          _temp,
          val.prop,
          Object.assign(_temp[val.prop], { value: val.value })
        );
      } else {
        this.$set(_temp, val.prop, val.value);
      }

      let _idx = this.curTableData.findIndex(
        item => item[this.uniqueKey] == val.parentColumnId
      );
      let _temp_oss = this.ossTableData.find(
        item => item[this.uniqueKey] == val.parentColumnId
      );
      if (typeof _temp[val.prop] == "object") {
        this.$set(
          _temp_oss,
          val.prop,
          Object.assign(_temp_oss[val.prop], { value: val.value })
        );
      } else {
        this.$set(_temp_oss, val.prop, val.value);
      }
      let _idx_oss = this.ossTableData.findIndex(
        item => item[this.uniqueKey] == val.parentColumnId
      );
      let obj = {};
      for (let [k, v] of Object.entries(_temp_oss)) {
        if (typeof v == "object") {
          obj[k] = v;
        }
      }
      if (Object.values(obj).length) {
        for (let [k, v] of Object.entries(obj)) {
          //列累加计算
          if (v.isColPlus) {
            //累加合计的单元格
            let _plusCell = this.ossTableData.find(
              item => typeof item[k] == "object" && item[k].cal == "lj"
            );
            let _plusCell_Idx = this.ossTableData.findIndex(
              item => typeof item[k] == "object" && item[k].cal == "lj"
            );
            //遍历fnParms将需要计算的项目累加
            if (_plusCell[k].fnParms) {
              let h = _plusCell[k].fnParms.reduce((prev, cur) => {
                try {
                  //迭代结果一开始不是数字而是对象
                  let _q;
                  if (typeof prev == "object") {
                    _q = this.ossTableData.find(item => item.code == prev.code)[
                      prev.key
                    ];
                  } else {
                    _q = this.checkIfNum(prev);
                  }
                  //cur也有可能是对象
                  let _p = this.ossTableData.find(
                    item => item.code == cur.code
                  )[cur.key];
                  if (typeof _q == "object") {
                    _q = this.checkIfNum(_q.value);
                  } else {
                    _q = this.checkIfNum(_q);
                  }
                  if (typeof _p == "object") {
                    _p = this.checkIfNum(_p.value);
                  } else {
                    _p = this.checkIfNum(_p);
                  }
                  return _q + _p;
                } catch (e) {
                  console.error(e);
                  return null;
                }
              }, 0);
              if (h) {
                let __v = _plusCell[k];
                this.$set(__v, "value", h);
                this.$set(_plusCell, k, __v);
                this.$set(this.ossTableData, _plusCell_Idx, _plusCell);
              }
            }
          }
          if (v.fn) {
            if (v.fnParms && v.fnParms.every(item => _temp_oss[item.key])) {
              //参数数值的数组
              let argsArr = v.fnParms.map(
                item =>
                  typeof _temp_oss[item.key] == "object"
                    ? this.checkIfNum(_temp_oss[item.key].value)
                    : this.checkIfNum(_temp_oss[item.key])
              );
              let f = v.fn;
              /**
               * 解析函数字符串，计算公式
               * TODO 性能不好 后期考虑用 new Function() @fsg 2018.8.16
               */
              let res = eval("(" + f + `)(${argsArr.toString()})`);
              //如果输入非数字或0则不变化
              if (!["NaN%", "Infinity%", "NaN", "Infinity"].includes(res)) {
                this.$set(
                  _temp_oss,
                  k,
                  Object.assign(_temp_oss[k], { value: res })
                );
              }
            } else {
              this.$set(
                _temp_oss,
                k,
                Object.assign(_temp_oss[k], { value: "" })
              );
            }
          }
        }
      }
      if (_temp_oss) {
        this.$set(this.ossTableData, _idx_oss, _temp_oss);
      }
      if (_temp) {
        this.$set(this.curTableData, _idx, _temp);
        this.$emit("TableDataChange", this.curTableData);
      }
    });
  },
  computed: {
    //表头层级
    headerClasses() {
      let arr = this.headerArr.map(item => item.classifyId);
      return [...new Set(arr)];
    }
  },
  watch: {
    tableHeader: {
      handler(val) {
        this.initData();
      },
      immediate: true,
      deep: true
    }
  },

  methods: {
    initData() {
      this.headerArr = [];
      //深拷贝
      this.ossTableData = tools.deepCopy(this.tableData);
      this.ossTableHeader = tools.deepCopy(this.tableHeader);
      this.curTableData = tools.deepCopy(this.tableData);
      this.bodyNotShowProps.forEach(item => {
        this.bodyNotShowPropData.push(item);
      });
      //如果父组件不传唯一标识,子组件为每一个tr赋值一个uuid作为唯一标识（兼容作用）
      this.ossTableData.forEach(item => {
        if (!this.uniqueKey) {
          if (!item.table_id) {
            item.table_id = tools.guid();
          }
        } else {
          item.table_id = item[this.uniqueKey];
        }
      });
      this.isBodyEmpty = !this.ossTableData.length;
      //为表头每一个th赋值排序id
      this.giveIdx2Item(this.ossTableHeader);
      this.getHeaderItemArr(this.ossTableHeader);
    },
    //判断是否为数字，不是则输出0
    checkIfNum(n) {
      return Number(n) != NaN ? Number(n) : 0;
    },
    //将表头中的层级分类，渲染表头
    renderHeader() {
      //公共样式
      let common = {
        verticalAlign: "middle",
        borderRight: `1px solid ${this.tableBorderColor}`
      };
      return (
        <thead>
          {this.headerClasses.map(i => {
            return (
              <tr
                style={{
                  ...this.headerStyle,
                  borderTop: `1px solid ${this.tableBorderColor}`
                }}
              >
                {this.headerArr
                  //获取不同的层级的表头
                  .filter(item => item.classifyId == i)
                  //防止某些表头的title为空引起bug
                  .filter(item => item.title)
                  .map((item, _idx) => {
                    return (
                      <th
                        rowspan={this.getRowspan(item)}
                        colspan={item.colSpan ? item.colSpan : 1}
                        //如果需要对表头第一个th做增加点击功能、改变样式等处理
                        style={
                          _idx == 0 &&
                          this.isFirstThEableClick &&
                          item.sortIdx == 0 &&
                          item.classifyId == 0
                            ? {
                                ...common,
                                ...this.firstThStyle,
                                cursor: "pointer",
                                height: `${this.cellHeight *
                                  this.getRowspan(item)}px`
                              }
                            : {
                                ...common,
                                height: `${this.cellHeight *
                                  this.getRowspan(item)}px`
                              }
                        }
                        onClick={() => {
                          if (
                            !this.isFirstThEableClick ||
                            _idx != 0 ||
                            item.sortIdx != 0 ||
                            item.classifyId != 0
                          ) {
                            return;
                          }
                          // 点击第一个th单元格触发的事件
                          this.firstThClickHandler();
                        }}
                      >
                        <span>{item.title}</span>
                      </th>
                    );
                  })}
              </tr>
            );
          })}
        </thead>
      );
    },
    //表体单元格点击事件 主要是input变focus
    tdClickHandler(tableId, isCanEdit) {
      if (!isCanEdit) {
        return;
      }
      this.curEditTdId = tableId;
    },

    //渲染表body
    renderTableBody() {
      //body无数据
      const emptyBody = () => {
        return (
          <div
            class="flexBox"
            style={{
              height: "100px",
              border: `1px solid ${this.tableBorderColor}`
            }}
          >
            {this.bodyEmptyTips}
          </div>
        );
      };
      //body有数据
      const renderBody = () => {
        return (
          <tbody
            style={{
              width: "100%",
              borderTop: `1px solid ${this.tableBorderColor}`
            }}
          >
            {this.ossTableData.map(item => this.renderTableColumn(item))}
          </tbody>
        );
      };
      return (
        <div>
          <table
            cellspacing="0"
            cellpadding="0"
            style={{
              width: "100%",
              borderLeft: `1px solid ${this.tableBorderColor}`,
              borderRight: `1px solid ${this.tableBorderColor}`
            }}
          >
            {this.renderHeader()}
            {renderBody()}
          </table>
          {this.isBodyEmpty ? emptyBody() : null}
        </div>
      );
    },
    //返回header某项的排序索引
    getHeaderItemIndex(target_key) {
      let _target = this.headerArr.find(item => item.key == target_key);
      if (!_target) {
        console.error(_target, target_key);
      }
      return _target.sortIdx;
    },
    //获取某对象里面所有children层数
    // getChildrenFloorByItem(obj,childrenFloor=0){
    //   if(obj.children){
    //     const floor=childrenFloor+1
    //     this.getChildrenFloorByItem(,floor)
    //   }
    // },
    //返回header某项
    getHeaderItemArr(arr) {
      let bianli = arr => {
        arr.forEach(item => {
          if (item.children && item.children.length) {
            let idx = this.headerArr.findIndex(
              _ => _.title == item.title && _.sortIdx == item.sortIdx
            );
            if (idx == -1) {
              let _temp = tools.deepCopy(item);
              delete _temp.children;
              this.headerArr.push(_temp);
            }
            bianli(item.children);
          } else {
            let _idx = this.headerArr.findIndex(_ => _.key == item.key);
            if (_idx == -1) {
              this.headerArr.push(item);
            }
          }
        });
      };
      bianli(arr);
    },
    getRowspan(cell) {
      return cell.rowSpan ? cell.rowSpan : 1;
    },
    //通过key查找表头
    getHeaderItemByKey(key) {
      return this.headerArr.find(item => item.key == key);
    },
    //渲染表的每行
    renderTableColumn(colOptions) {
      return (
        <tr style={{ width: "100%" }}>
          {Object.keys(colOptions)
            .filter(item => !this.bodyNotShowPropData.includes(item))
            .sort(
              (a, b) => this.getHeaderItemIndex(a) - this.getHeaderItemIndex(b)
            )
            .map((item, idx) => {
              return this.bodyNotShowPropData.includes(item) ? null : (
                <td
                  id={`td_id_${colOptions[this.uniqueKey]}_${item}_${idx}`}
                  class="edit-el-td"
                  style={{ borderBottom: `1px solid ${this.tableBorderColor}` }}
                  colspan="1"
                  rowspan="1"
                  onClick={this.tdClickHandler.bind(
                    this,
                    `td_id_${colOptions[this.uniqueKey]}_${item}_${idx}`,
                    this.getHeaderItemByKey(item).isCanEdit
                  )}
                >
                  {this.isReadOnly ? (
                    <MyInput
                      style={{ flex: 1 }}
                      value={
                        typeof colOptions[item] == "object"
                          ? colOptions[item].value
                          : colOptions[item]
                      }
                      parentColumnId={
                        this.uniqueKey
                          ? colOptions[this.uniqueKey]
                          : colOptions["table_id"]
                      }
                      addStyle={{
                        borderTop: "none",
                        borderBottom: "none",
                        borderRight: "none",
                        borderRadius: 0,...this.cellStyle
                      }}
                      editPropName={item}
                      componentName={this.$options.name}
                      readonly
                    />
                  ) : this.getHeaderItemByKey(item).isCanEdit &&
                  colOptions[item].isCanEdit != 0 ? (
                    <MyInput
                      style={{ flex: 1 }}
                      value={
                        typeof colOptions[item] == "object"
                          ? colOptions[item].value
                          : colOptions[item]
                      }
                      parentColumnId={
                        this.uniqueKey
                          ? colOptions[this.uniqueKey]
                          : colOptions["table_id"]
                      }
                      addStyle={
                        `td_id_${colOptions.table_id}_${item}_${idx}` !=
                        this.curEditTdId
                          ? {
                              borderTop: "none",
                              borderBottom: "none",
                              borderRight: "none",
                              borderRadius: 0,
                              ...this.cellStyle
                            }
                          : {}
                      }
                      editPropName={item}
                      componentName={this.$options.name}
                      readonly={
                        `td_id_${colOptions.table_id}_${item}_${idx}` !=
                        this.curEditTdId
                      }
                    />
                  ) : (
                    <MyInput
                      style={{ flex: 1 }}
                      value={
                        typeof colOptions[item] == "object"
                          ? colOptions[item].value
                          : colOptions[item]
                      }
                      parentColumnId={
                        this.uniqueKey
                          ? colOptions[this.uniqueKey]
                          : colOptions["table_id"]
                      }
                      addStyle={{
                        borderTop: "none",
                        borderBottom: "none",
                        borderRight: "none",
                        borderRadius: 0,
                        ...this.cellStyle
                      }}
                      editPropName={item}
                      componentName={this.$options.name}
                      readonly
                    />
                  )}
                </td>
              );
            })}
        </tr>
      );
    },

    //obj1中所有属性值是否都能在obj2中找得到且值相等
    // checkIfKeyAndValueEqual(obj1, obj2) {
    //   return Object.keys(obj1).every(item => obj1[item] == obj2[item]);
    // },
    /**
     * 为表头每一个th赋值排序id
     * parentSortId:所属父层级的排序id,classifyId:该单元格处于表头第几层
     */
    giveIdx2Item(arr, parentSortId = "", classifyId = 0) {
      arr.forEach((item, idx) => {
        if (!item.sortIdx) {
          item.sortIdx = (parentSortId ? parentSortId + "" : "") + idx;
        }
        item.classifyId = classifyId;
        if (item.children && item.children.length) {
          this.giveIdx2Item(item.children, item.sortIdx, classifyId + 1);
        }
      });
    }
  },

  render() {
    return <section>{this.renderTableBody()}</section>;
  }
};
</script>


