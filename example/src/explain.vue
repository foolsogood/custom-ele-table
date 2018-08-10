<script>
export default {
  name: "explainTable",
  props: {
    tableData: {
      type: Array,
      default: () => new Array()
    },
    //表头
    tableHeader: {
      type: Array,
      default: () => new Array()
    },
    //表体不显示得属性
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
    //唯一标识
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
    //首位th样式
    firstThStyle: {
      type: Object,
      default: () => {}
    },
    //该表格是否只读
    isReadOnly: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      ossTableHeader: [], //处理过的表头
      ossTableData: [], //处理过表体
      curEditTdId: "", //当前编辑状态的td 的id
      headerArr: [],
      bodyNotShowPropData: ["table_id"],
      curTableData: [] //
    };
  },
  computed: {
    //表头层级
    headerClasses() {
      let arr = [];
      this.headerArr.map(item => {
        arr.push(item.classifyId);
      });
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
    deepCopy(obj1) {
      let type = Object.prototype.toString.call(obj1);
      let resObj = undefined;
      //引用类型
      if (type.includes("object")) {
        if (type === "[object Array]") {
          resObj = [];
          for (let i = 0; i < obj1.length; i++) {
            if (typeof obj1[i] == "object") {
              resObj[i] = this.deepCopy(obj1[i]);
            } else {
              resObj[i] = obj1[i];
            }
          }
        }
        if (type === "[object Object]") {
          resObj = {};
          for (let key in obj1) {
            if (typeof obj1[key] == "object") {
              resObj[key] = this.deepCopy(obj1[key]);
            } else {
              resObj[key] = obj1[key];
            }
          }
        }
      } else {
        //基本类型
        resObj = obj1;
      }
      return resObj;
    },
    guid() {
      function S4() {
        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
      }
      return (
        S4() +
        S4() +
        "-" +
        S4() +
        "-" +
        S4() +
        "-" +
        S4() +
        "-" +
        S4() +
        S4() +
        S4()
      );
    },
    initData() {
      this.headerArr = [];
      this.ossTableData = this.deepCopy(this.tableData);
      this.ossTableHeader = this.deepCopy(this.tableHeader);
      this.curTableData = this.deepCopy(this.tableData);
      this.bodyNotShowProps.map(item => {
        this.bodyNotShowPropData.push(item);
      });
      this.ossTableData.map(item => {
        if (!this.uniqueKey) {
          if (!item.table_id) {
            item.table_id = this.guid();
          }
        } else {
          item.table_id = item[this.uniqueKey];
        }
      });
      this.giveIdx2Item(this.ossTableHeader);
      this.getHeaderItemArr(this.ossTableHeader);
    },
    //将表头中的层级分类
    classifyHeaderHandler() {
      let common = {
        verticalAlign: "middle",
        borderRight: `1px solid ${this.tableBorderColor}`
      };
      return (
        <thead>
          {" "}
          {this.headerClasses.map(i => {
            return (
              <tr
                style={{
                  borderTop: `1px solid ${this.tableBorderColor}`
                }}
              >
                {this.headerArr
                  .filter(item => item.classifyId == i)
                  .filter(item => item.title)
                  .map((item, _idx) => {
                    return (
                      <th
                        rowspan={this.getRowspan(item)}
                        colspan={item.colSpan ? item.colSpan : 1}
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
                          // if (_idx != 0) {
                          //   return;
                          // }
                          // if (item.sortIdx != 0) {
                          //   return;
                          // }
                          // 点击第一个th单元格触发事件
                          this.firstThClickHandler();
                        }}
                      >
                        <span> {item.title} </span>{" "}
                      </th>
                    );
                  })}{" "}
              </tr>
            );
          })}{" "}
        </thead>
      );
    },
    //单元格点击事件
    tdClickHandler(tableId, isCanEdit) {
      if (!isCanEdit) {
        return;
      }
      this.curEditTdId = tableId;
    },
    //渲染表body
    renderPanelBody() {
      return (
        <table
          cellspacing="0"
          cellpadding="0"
          style={{
            width: "100%",
            borderLeft: `1px solid ${this.tableBorderColor}`,
            borderRight: `1px solid ${this.tableBorderColor}`
          }}
        >
          {this.classifyHeaderHandler()}{" "}
          <tbody
            style={{
              width: "100%",
              borderTop: `1px solid ${this.tableBorderColor}`
            }}
          >
            {this.ossTableData.map(item => this.renderTableColumn(item))}{" "}
          </tbody>{" "}
        </table>
      );
    },
    //返回header某项的排列索引
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
        arr.map(item => {
          if (item.children && item.children.length) {
            let idx = this.headerArr.findIndex(
              _ => _.title == item.title && _.sortIdx == item.sortIdx
            );
            if (idx == -1) {
              let _temp = deepCopy(item);
              delete _temp.children;
              this.headerArr.push({
                ..._temp
                // childLength: item.children.length
              });
            }
            bianli(item.children);
          } else {
            let _idx = this.headerArr.findIndex(_ => _.key == item.key);
            if (_idx == -1) {
              this.headerArr.push({
                ...item
                // childLength: 0
              });
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
      let _temp = this.headerArr.find(item => item.key == key);
      return _temp;
    },
    //渲染表的每行
    renderTableColumn(colOptions) {
      return (
        <tr
          style={{
            width: "100%"
          }}
        >
          {" "}
          {Object.keys(colOptions)
            .filter(item => !this.bodyNotShowPropData.includes(item))
            .sort(
              (a, b) => this.getHeaderItemIndex(a) - this.getHeaderItemIndex(b)
            )
            .map((item, idx) => {
              return this.bodyNotShowPropData.includes(item) ? null : (
                <td
                  class="edit-el-td"
                  style={{
                    borderBottom: `1px solid ${this.tableBorderColor}`,borderLeft:`1px solid ${this.tableBorderColor}`,lineHeight:'40px',textAlign:'center'
                  }}
                  colspan="1"
                  rowspan="1"
                >
                  <span> {colOptions[item]} </span>
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
    //赋值id
    giveIdx2Item(arr, parentSortId = "", classifyId = 0) {
      arr.map((item, idx) => {
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
    return <section> {this.renderPanelBody()} </section>;
  }
};
</script>


