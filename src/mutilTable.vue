<script>
import tools from "./tools/index";
import MyInput from "./input.vue";
import event from "./event.js";
import fnModules from "./tools/fns";
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
      isBodyEmpty: undefined //表体是否无数据
    };
  },
  components: { MyInput },
  created() {
    event.on(`inputChange-${this.$options.name}`, val => {
      // console.log(val);
      let _check = obj => {
        let flag = false;
        for (let [k, v] of Object.entries(obj)) {
          if (val.prop == k) {
            return true;
          }
          if (typeof v == "object") {
            return (
              v.fnParms &&
              v.fnParms.some(item => {
                return item.code == val.parentColumnId || item.key == val.prop;
              })
            );
          }
        }
        return flag;
      };
      //该数据变化后 受影响的
      let target_arr = this.curTableData.filter(
        // item => _check(item)
        item => item[this.uniqueKey] == val.parentColumnId || _check(item)
      );
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
      if (_temp) {
        this.$set(this.curTableData, _idx, _temp);
        this.$emit("TableDataChange", this.curTableData);
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
      if (target_arr.length) {
        try {
          target_arr.forEach(item => {
            for (let [k, v] of Object.entries(item)) {
              if (typeof v == "object") {
                if (v.fn && v.fnParms && v.fnParms.length) {
                  if (v.fnParms.some(_val => _val.key == val.prop)) {
                    //参数数值的数组
                    let argsArr = v.fnParms.map(_val => {
                      return this.getValueFromColumn(_val.code, _val.key);
                    });
                    let f = v.fn;
                    //加入浮点型计算
                    const { floatAdd, floatMul, floatDiv } = tools;
                    if (fnModules[f]) {
                      f = fnModules[f];
                    }

                    // console.log(f)
                    /**
                     * 解析函数字符串，计算公式
                     * TODO 性能不好 后期考虑用 new Function() @fsg 2018.8.16
                     */
                    try {
                      let res = eval("(" + f + `)(${argsArr.toString()})`);
                      if (["false", false].includes(res)) {
                        alert("公式运行错误，请检查参数!");
                      }
                      if (Number(res) !== NaN) {
                        res = Number(res).toFixed(3);
                      }
                      // console.log(k, v.code, res, f, argsArr);
                      let flag = [
                        "NaN%",
                        "Infinity%",
                        "NaN",
                        "Infinity"
                      ].includes(res);
                      //如果输入非数字或0则不变化
                      if (flag) {
                        this.$set(v, "value", "");
                      } else {
                        this.$set(v, "value", res);
                      }
                    } catch (error) {
                      throw error;
                    }
                  }
                }
              }
            }
          });
        } catch (err) {
          throw err;
        }
        let copyCurTD = tools.deepCopy(this.curTableData);
        let copyOssTD = tools.deepCopy(this.ossTableData);
        target_arr.forEach(item => {
          copyCurTD.forEach((_val, _index) => {
            if (item[this.uniqueKey] == _val.code) {
              this.$set(this.curTableData, _index, item);
              let c_index = copyOssTD.findIndex(
                _item => _item[this.uniqueKey] == _val.code
              );
              this.$set(
                this.ossTableData,
                c_index,
                Object.assign({}, this.ossTableData[c_index], item)
              );
            }
          });
        });
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
    //匹配对应行的值
    getValueFromColumn(code, key) {
      let _target;
      let res;
      _target = this.curTableData.find(item => item[this.uniqueKey] == code);
      if (_target) {
        if (typeof _target[key] == "object") {
          return _target[key].value ? _target[key].value : 0;
        } else {
          return _target[key] ? _target[key] : 0;
        }
      } else {
        return 0;
      }
    },
    //判断是否为数字，不是则输出0
    checkIfNum(n) {
      return Number(n) != NaN ? Number(n) : 0;
    },
    initData() {
      this.headerArr = [];
      this.ossTableData = tools.deepCopy(this.tableData);
      this.ossTableHeader = tools.deepCopy(this.tableHeader);
      this.curTableData = tools.deepCopy(this.tableData);
      this.bodyNotShowPropData = [
        ...tools.deepCopy(this.bodyNotShowProps),
        "table_id"
      ];

      this.ossTableData.forEach(item => {
        if (!this.uniqueKey) {
          if (!item.table_id) {
            item.table_id = tools.guid();
          }
        } else {
          item.table_id = item[this.uniqueKey]
            ? item[this.uniqueKey]
            : tools.guid();
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
      const common = {
        verticalAlign: "middle",
        borderRight: `1px solid ${this.tableBorderColor}`
      };
      return (
        <thead>
          {this.headerClasses.map(val => {
            return (
              <tr
                style={{
                  ...this.headerStyle,
                  borderTop: `1px solid ${this.tableBorderColor}`
                }}
              >
                {this.headerArr
                  .filter(item => item.classifyId == val)
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
            // const isHtml = !!colOptions[item]._html;
            const common = {
              padding: "0 25px",
              minWidth: "100px",
              height: `${this.cellHeight *
                (typeof colOptions[item] == "object"
                  ? colOptions[item].rowSpan
                  : 1)}px`
            };
            const isReadOnlySpan = (() => {
              return (
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
                // <MyInput
                //   style={{ minWidth: "100px" }}
                //   value={
                //     typeof colOptions[item] == "object"
                //       ? colOptions[item].value
                //       : colOptions[item]
                //   }
                //   parentColumnId={
                //     this.uniqueKey
                //       ? colOptions[this.uniqueKey]
                //         ? colOptions[this.uniqueKey]
                //         : colOptions["table_id"]
                //       : colOptions["table_id"]
                //   }
                //   addStyle={
                //     {
                //           borderTop: "none",
                //           borderBottom: "none",
                //           borderLeft: "none",
                //           borderRight: "none",
                //           // cursor:'pointer',
                //           borderRadius: 0,
                //           ...this.cellStyle
                //         }
                //   }
                //   editPropName={item}
                //   componentName={this.$options.name}
                //   readonly
                // />
              );
            })();
            const editInput = (() => {
              return (
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
                        ? colOptions[this.uniqueKey]
                        : colOptions["table_id"]
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
                          // cursor:'pointer',
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
              );
            })();
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
                {this.isReadOnly
                  ? isReadOnlySpan
                  : this.getHeaderItemByKey(item).isCanEdit
                    ? typeof colOptions[item] == "object" &&
                      colOptions[item].isCanEdit == 0
                      ? isReadOnlySpan
                      : editInput
                    : isReadOnlySpan}
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

