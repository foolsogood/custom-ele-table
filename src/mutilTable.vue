<script>
import tools from "./tools/index";
import MyInput from "./input.vue";
import event from "./event.js";

export default {
  name: "MutilTable",
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
    },
    //表体无数据显示的提示语
    bodyEmptyTips: {
      type: String,
      default: "暂无数据"
    },
    //在body每行后添加模板
    postfixTemplate: {
      type: Array,
      default: () => new Array()
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
      ossTableData: [], //处理过表体
      curEditTdId: "", //当前编辑状态的td 的id
      headerArr: [],
      bodyNotShowPropData: ["table_id"],
      curTableData: [], //
      tbodyId: tools.guid(),
      isBodyEmpty: undefined //表体是否无数据
    };
  },
  components: { MyInput },
  created() {
    event.on(`inputChange-${this.$options.name}`, val => {
      let _temp = this.curTableData.find(
        item => item[this.uniqueKey] == val.parentColumnId
      );
      let _idx = this.curTableData.findIndex(
        item => item[this.uniqueKey] == val.parentColumnId
      );
      if (_temp) {
        this.$set(_temp, val.prop, val.value);
        this.$set(this.curTableData, _idx, _temp);
        this.$emit("TableDataChange", this.curTableData);
      }
    });
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
    initData() {
      this.headerArr = [];
      this.ossTableData = tools.deepCopy(this.tableData);
      this.ossTableHeader = tools.deepCopy(this.tableHeader);
        //如果需要在tr后追加模板
      if (this.postfixTemplate.length) {
        console.log(this.headerClasses);
        let _tempArr = tools.deepCopy(this.ossTableData);
        this.postfixTemplate.forEach(item => {
          this.ossTableHeader.push({
            key: "caozuo",
            rowSpan: this.headerClasses.length,
            title: item._header
          });

          _tempArr.forEach((val, _idx) => {
            val.caozuo = "123";
          });
        });
        this.ossTableData=_tempArr
      }

      this.curTableData = tools.deepCopy(this.tableData);

      this.bodyNotShowProps.forEach(item => {
        this.bodyNotShowPropData.push(item);
      });
      this.ossTableData.forEach(item => {
        if (!this.uniqueKey) {
          if (!item.table_id) {
            item.table_id = tools.guid();
          }
        } else {
          item.table_id = item[this.uniqueKey];
        }
      });
      if (this.ossTableData.length) {
        for (let [k, v] of Object.entries(this.ossTableData[0])) {
          if (typeof v == "object") {
            this.combineCellByKey(k);
          }
        }
        this.isBodyEmpty = false;
      } else {
        this.isBodyEmpty = true;
      }
     
      this.giveIdx2Item(this.ossTableHeader);
      this.getHeaderItemArr(this.ossTableHeader);
     
    },
    //将表体中跨行的相同单元格合并(其实是将多余的单元格去除)
    combineCellByKey(key) {
      let arr = [];
      this.ossTableData.forEach(item => {
        let _idx = arr.findIndex(_ => tools.checkIfObjectEqual(_, item[key]));
        if (_idx == -1) {
          arr.push(item[key]);
        } else {
          delete item[key];
        }
      });
    },

    //将表头中的层级分类
    classifyHeaderHandler() {
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
                          // 点击第一个th单元格触发事件
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
    //单元格点击事件
    tdClickHandler(tableId, isCanEdit, item, trData) {
      //响应操作单元格传入的函数
      if (trData.caozuo) {
        const _handler = trData.caozuo._clickHandler;
        if (item == "caozuo" && _handler && typeof _handler == "function") {
          _handler.apply(this);
        }
      }
      if (!isCanEdit) {
        return;
      }

      this.curEditTdId = tableId;
    },

    //渲染表body
    renderPanelBody() {
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
            {this.classifyHeaderHandler()}
            {this.isBodyEmpty === false ? renderBody() : null}
          </table>
          {this.isBodyEmpty === false ? null : emptyBody()}
        </div>
      );
    },
    //返回header某项的排列索引
    getHeaderItemSortIndex(target_key) {
      let _target = this.headerArr.find(item => item.key == target_key);
      if (!_target) {
        console.error(_target, target_key);
      }
      return _target.sortIdx;
    },
    //返回header某项
    getHeaderItemArr(arr) {
      let bianli = arr => {
        arr.map(item => {
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
      let _temp = this.headerArr.find(item => item.key == key);
      return _temp;
    },
    //排序A是否应该排在B前面 -1是1否
    isAfrontB(A, B) {
      let A_arr = A.split("_");
      let B_arr = B.split("_");
      const len = Math.min(...[A_arr.length, B_arr.length]);
      for (let i = 0; i < len; i++) {
        if (A_arr[i] - B_arr[i] > 0) {
          return 1;
        } else if (A_arr[i] - B_arr[i] < 0) {
          return -1;
        }
      }
      return 0;
    },
    //渲染表的每行
    renderTableColumn(colOptions) {
      const _renderHtml = html => {
        return (
          <span
            dangerouslySetInnerHTML={{
              __html: '<span class="el-icon-delete"></span>'
            }}
          />
        );
      };
      //根据sortIdx排好序
      const sortArr = Object.keys(colOptions)
        .filter(item => !this.bodyNotShowPropData.includes(item))
        .sort((a, b) => {
          let flag = this.isAfrontB(
            this.getHeaderItemSortIndex(a),
            this.getHeaderItemSortIndex(b)
          );
          return flag;
        });
      return (
        <tr style={{ width: "100%", ...this.cellStyle }}>
          {sortArr.map((item, idx) => {
            //是否渲染成html
            const isHtml = !!colOptions[item]._html;
            const common = {
              padding: "0 25px",
              minWidth: "100px",
              height: `${this.cellHeight *
                (typeof colOptions[item] == "object"
                  ? colOptions[item].rowSpan
                  : 1)}px`
            };
            return this.bodyNotShowPropData.includes(item) ? null : (
              <td
                id={`td_id_${colOptions[this.uniqueKey]}_${item}_${idx}`}
                style={{
                  borderLeft: `1px solid ${this.tableBorderColor}`,
                  borderBottom: `1px solid ${this.tableBorderColor}`,
                  verticalAlign: "middle"
                }}
                colspan="1"
                rowspan={
                  typeof colOptions[item] == "object"
                    ? colOptions[item].rowSpan
                    : 1
                }
                onClick={this.tdClickHandler.bind(
                  this,
                  `td_id_${colOptions[this.uniqueKey]}_${item}_${idx}`,
                  this.getHeaderItemByKey(item).isCanEdit,
                  item,
                  colOptions
                )}
              >
                {this.isReadOnly ? (
                  <span
                    class="flexBox "
                    style={{
                      padding: "0 25px",
                      minWidth: "100px",
                      height: `${this.cellHeight *
                        (typeof colOptions[item] == "object"
                          ? colOptions[item].rowSpan
                          : 1)}px`
                    }}
                  >
                    {typeof colOptions[item] == "object"
                      ? colOptions[item].value
                      : colOptions[item]}
                  </span>
                ) : this.getHeaderItemByKey(item).isCanEdit ? (
                  <MyInput
                    style={{ minWidth: "100px" }}
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
                            borderLeft: "none",
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
                  <span class="flexBox ">
                    <span
                      class="flexBox "
                      style={
                        isHtml
                          ? { ...common, cursor: "pointer" }
                          : { ...common }
                      }
                    >
                      {typeof colOptions[item] == "object"
                        ? isHtml
                          ? colOptions[item]._html
                          : colOptions[item].value
                        : colOptions[item]}
                    </span>
                  </span>
                )}
              </td>
            );
          })}
        </tr>
      );
    },
    //赋值id
    giveIdx2Item(arr, parentSortId = "", classifyId = 0) {
      arr.map((item, idx) => {
        if (!item.sortIdx) {
          item.sortIdx = (parentSortId ? parentSortId + "_" : "") + idx;
        }
        item.classifyId = classifyId;
        if (item.children && item.children.length) {
          this.giveIdx2Item(item.children, item.sortIdx, classifyId + 1);
        }
      });
    }
  },

  render() {
    return <section class="nui-scroll">{this.renderPanelBody()}</section>;
  }
};
</script>

