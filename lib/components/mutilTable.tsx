import { Component, Watch, Vue, Prop } from "vue-property-decorator";
import tools from "../tools/index";
import MyInput from "./input";
import event from "../tools/event";
import fnModules from "../tools/fns";
import Toast from "./toast";
interface ICellData {
  code: string;
  key: string;
}
interface ITableData {
  [prop: string]: any;
}
interface IOssTableData extends ITableData {
  key?: string;
}
// props 传入的header
interface IHeaderItem {
  colSpan?: number;
  isCanEdit?: boolean;
  onlyOneCell?: boolean;
  rowSpan?: number;
  key?: string;
  title: string;
  children?: IHeaderItem[];
}
// 处理过后的header
interface IHeaderArrItem extends IHeaderItem {
  classifyId: number;
  sortIdx: string;
}
interface IData {
  value: string;
  prop: string;
  parentColumnId: string | number;
}
@Component({
  name: "MutilTable"
})
export default class MutilTable extends Vue {
  @Prop({
    type: Array,
    default: []
  })
  public readonly tableData!: ITableData[];
  //表头
  @Prop({
    type: Array,
    default: []
  })
  public readonly tableHeader!: IHeaderItem[];
  //表体不显示得属性
  @Prop({
    type: Array,
    default: []
  })
  public readonly bodyNotShowProps!: string[];
  //表格边框颜色
  @Prop({
    type: String,
    default: "#ddd"
  })
  public readonly tableBorderColor!: string;
  //单元格高度
  @Prop({
    type: Number,
    default: 40
  })
  public readonly cellHeight!: number;
  //唯一标识
  @Prop({
    type: String,
    default: ""
  })
  public readonly uniqueKey!: string;
  //点击第一个th触发事件
  @Prop({
    type: Function,
    default: () => null
  })
  public readonly firstThClickHandler!: () => void;
  //firstThClickHandler属性是否可用
  @Prop({
    type: Boolean,
    default: false
  })
  public readonly isFirstThEableClick!: boolean;
  //首位th样式
  @Prop({
    type: Object,
    default: () => {}
  })
  public readonly firstThStyle!: object;
  //该表格是否只读
  @Prop({
    type: Boolean,
    default: false
  })
  public readonly isReadOnly!: boolean;
  //表体无数据显示的提示语
  @Prop({
    type: String,
    default: "暂无数据"
  })
  public readonly bodyEmptyTips!: string;
  //header样式
  @Prop({
    type: Object,
    default: () => ({
      background: "rgb(230, 242, 246)",
      color: "#333"
    })
  })
  public readonly headerStyle!: CSSStyleDeclaration;
  //body单元格样式
  @Prop({
    type: Object,
    default: () => ({
      background: "#fff",
      color: "#333"
    })
  })
  public readonly cellStyle!: CSSStyleDeclaration;
  //需要公式计算的单元格的样式
  @Prop({
    type: Object,
    default: () => ({
      background: "#999",
      color: "#fff"
    })
  })
  public readonly calcCellStyle!: CSSStyleDeclaration;

  public ossTableHeader: IHeaderArrItem[] = [];
  public ossTableData: IOssTableData[] = []; //处理过表体
  public headerArr: IHeaderArrItem[] = [];
  public bodyNotShowPropData: string[] = ["cell_id"];
  public curTableData: ITableData[] = [];
  public curEditTdId: string = "";
  public isBodyEmpty: boolean = false; //表体是否无数据

  //表头层级
  get headerClasses() {
    const arr = this.headerArr.map(item => item.classifyId);
    return [...new Set(arr)];
  }

  public created() {
    event.on(`inputChange-${this.$options.name}`, (val: IData) => {
      tools.throttle(() => this.numberChangeHandler(val), 1000);
    });
  }
  @Watch("tableHeader", {
    immediate: true,
    deep: true
  })
  public onTableHeaderChange(val: any[]) {
    this.initData();
  }

  //重新计算
  public reCalculate() {
    this.ossTableData.forEach(item => {
      Object.keys(item).forEach(_key => {
        if (item[_key] - 0) {
          const data: IData = {
            value: Object.is(Number(item[_key]), NaN)
              ? item[_key] === ""
                ? 0
                : item[_key]
              : item[_key] - 0,
            prop: _key,
            parentColumnId: item[this.uniqueKey]
          };
          tools.throttle(() => this.numberChangeHandler(data), 1000);
        }
      });
    });
  }
  public numberChangeHandler(val: IData) {
    // console.log(val.prop, val.value, val.parentColumnId);
    //如果该组件为纯展示，没有编辑功能
    if (this.isReadOnly) {
      return;
    }
    //  输入的是非数字
    if (Object.is(Number(val.value), NaN)) {
      event.emit("show-toast", { text: "请输入数字" });
      return;
    }
    const _check = (obj: ITableData) => {
      for (const [k, v] of Object.entries(obj)) {
        if (val.prop === k) {
          return true;
        }

        if (typeof v === "object") {
          const flag =
            v.fnParms &&
            (v.fnParms as any[]).some(item => {
              return (
                item[this.uniqueKey] === val.parentColumnId &&
                item.key === val.prop
              );
            });

          if (flag) {
            return true;
          }
        }
      }
      return false;
    };
    //该数据变化后 受影响的行
    const target_arr = this.curTableData.filter(
      item => item[this.uniqueKey] === val.parentColumnId || _check(item)
    );
    const _idx = this.curTableData.findIndex(
      item => item[this.uniqueKey] === val.parentColumnId
    );
    //找到数据变化的那一行tr
    const _temp = this.curTableData.find(
      item => item[this.uniqueKey] === val.parentColumnId
    );
    try {
      if (!_temp) {
        return;
      }
      if (_temp[val.prop] && typeof _temp[val.prop] === "object") {
        this.$set(
          _temp,
          val.prop,
          Object.assign({}, _temp[val.prop], { value: val.value })
        );
      } else {
        this.$set(_temp, val.prop, val.value);
      }
      if (_temp) {
        this.$set(this.curTableData, _idx, _temp);
        this.$emit("TableDataChange", this.curTableData);
      }
    } catch (e) {
      throw e;
    }

    const _temp_oss = this.ossTableData.find(
      item => item[this.uniqueKey] === val.parentColumnId
    );
    if (_temp_oss && _temp_oss[val.prop]) {
      if (typeof _temp_oss[val.prop] === "object") {
        const _copy = tools.deepCopy(_temp_oss[val.prop]);
        if (_copy.value !== val.value) {
          // console.log('11222', _copy.value, val.value);
          this.$set(
            _temp_oss,
            val.prop,
            Object.assign({}, _temp_oss[val.prop], { value: val.value })
          );
        }
      } else {
        this.$set(_temp_oss, val.prop, val.value);
      }
    }

    const _idx_oss = this.ossTableData.findIndex(
      item => item[this.uniqueKey] === val.parentColumnId
    );
    if (target_arr.length) {
      try {
        target_arr.forEach(item => {
          for (const [k, v] of Object.entries(item)) {
            if (typeof v === "object") {
              if (v.fn && v.fnParms && v.fnParms.length) {
                if (
                  v.fnParms.some((_val: ICellData) => _val.key === val.prop)
                ) {
                  //参数数值的数组
                  const argsArr = v.fnParms.map((_val: ICellData) => {
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
                    // console.log(res,argsArr.toString(),v)
                    if (["false", false].includes(res)) {
                      event.emit("show-toast", {
                        text: "公式运算错误,请检查"
                      });
                      return;
                    }
                    if (!Object.is(Number(res), NaN)) {
                      res = Number(res).toFixed(3);
                    }
                    // console.log(k, v.code, res, f, argsArr);
                    const flag = [
                      "NaN%",
                      "Infinity%",
                      "NaN",
                      "Infinity"
                    ].includes(res);
                    //如果输入非数字或0则不变化
                    const _copy__ = tools.deepCopy(v);
                    if (flag) {
                      this.$set(v, "value", "");
                    } else {
                      if (_copy__.value - 0 !== res - 0) {
                        this.$set(v, "value", res);
                      }
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
      const copyCurTD = tools.deepCopy(this.curTableData);
      const copyOssTD = tools.deepCopy(this.ossTableData);
      target_arr.forEach(item => {
        copyCurTD.forEach((_val, _index) => {
          if (item[this.uniqueKey] === _val.code) {
            this.$set(this.curTableData, _index, item);
            const c_index = copyOssTD.findIndex(
              _item => _item[this.uniqueKey] === _val.code
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
  }
  //匹配对应行的值
  public getValueFromColumn(code: string, key: string) {
    const _target = this.curTableData.find(
      item => item[this.uniqueKey] === code
    );
    if (_target) {
      if (typeof _target[key] === "object") {
        return _target[key].value ? _target[key].value : 0;
      } else {
        return _target[key] ? _target[key] : 0;
      }
    } else {
      return 0;
    }
  }
  //判断是否为数字，不是则输出0
  public checkIfNum(n: string) {
    return !Object.is(Number(n), NaN) ? Number(n) : 0;
  }
  public initData() {
    this.headerArr = [];
    this.ossTableData = tools.deepCopy(this.tableData);
    const ossTableHeader = tools.deepCopy(this.tableHeader);
    this.curTableData = tools.deepCopy(this.tableData);
    this.bodyNotShowPropData = [
      ...new Set([...tools.deepCopy(this.bodyNotShowProps), "table_id"])
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
      for (const [k, v] of Object.entries(this.ossTableData[0])) {
        if (typeof v === "object") {
          this.combineCellByKey(k);
        }
      }
      this.isBodyEmpty = false;
    } else {
      this.isBodyEmpty = true;
    }

    this.ossTableHeader = this.giveIdx2Item(ossTableHeader);
    this.getHeaderItemArr(this.ossTableHeader);
  }
  //将表体中跨行的相同单元格合并(其实是将多余的单元格去除)
  public combineCellByKey(key: string) {
    const arr: string[] = [];
    this.ossTableData.forEach(item => {
      const _idx = arr.findIndex(_ => tools.checkIfObjectEqual(_, item[key]));
      if (_idx === -1) {
        arr.push(item[key]);
      } else {
        delete item[key];
      }
    });
  }

  //将表头中的层级分类
  public classifyHeaderHandler() {
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
              }}>
              {this.headerArr
                .filter(item => item.classifyId === val)
                .filter(item => item.title)
                .map((item, _idx) => {
                  return (
                    <th
                      rowspan={this.getRowspan(item)}
                      colspan={item.colSpan ? item.colSpan : 1}
                      style={
                        _idx === 0 &&
                        this.isFirstThEableClick &&
                        item.sortIdx === "0" &&
                        item.classifyId === 0
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
                          _idx !== 0 ||
                          item.sortIdx !== "0" ||
                          item.classifyId !== 0
                        ) {
                          return;
                        }
                        // 点击第一个th单元格触发事件
                        this.firstThClickHandler();
                      }}>
                      <span>{item.title}</span>
                    </th>
                  );
                })}
            </tr>
          );
        })}
      </thead>
    );
  }
  //单元格点击事件
  public tdClickHandler(tableId: string, isCanEdit: boolean) {
    if (!isCanEdit) {
      return;
    }

    this.curEditTdId = tableId;
  }

  //渲染表body
  public renderPanelBody() {
    //body无数据
    const emptyBody = () => {
      return (
        <div
          class="flexBox"
          style={{
            height: "100px",
            border: `1px solid ${this.tableBorderColor}`
          }}>
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
          }}>
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
          }}>
          {this.classifyHeaderHandler()}
          {this.isBodyEmpty === false ? renderBody() : null}
        </table>
        {this.isBodyEmpty === false ? null : emptyBody()}
      </div>
    );
  }
  //返回header某项的排列索引
  public getHeaderItemSortIndex(target_key: string) {
    const _idx = this.headerArr.findIndex(item => item.key === target_key);
    if (_idx === -1) {
      // console.error(_idx, target_key);
      return "";
    }
    return this.headerArr[_idx].sortIdx;
  }
  //返回header某项
  public getHeaderItemArr(arr1: IHeaderArrItem[]) {
    const bianli = (arr: IHeaderArrItem[]) => {
      arr.map(item => {
        if (item.children && item.children.length) {
          const idx = this.headerArr.findIndex(
            _ => _.title === item.title && _.sortIdx === item.sortIdx
          );
          if (idx === -1) {
            const _temp = tools.deepCopy(item);
            delete _temp.children;
            this.headerArr.push(_temp);
          }
          bianli(Reflect.get(item, "children"));
        } else {
          const _idx = this.headerArr.findIndex(_ => _.key === item.key);
          if (_idx === -1) {
            this.headerArr.push(item);
          }
        }
      });
    };
    bianli(arr1);
  }
  public getRowspan(cell: IHeaderArrItem) {
    return cell.rowSpan ? cell.rowSpan : 1;
  }
  //通过key查找表头
  public getIfHeaderItemCanEditByKey(key: string): boolean {
    const _idx = this.headerArr.findIndex(item => item.key === key);
    if (_idx === -1) {
      return false;
    }
    return this.headerArr[_idx].isCanEdit!;
  }
  //排序A是否应该排在B前面 -1是1否
  public isAfrontB(A: string, B: string) {
    if (!A || !B) {
      return 0;
    }
    const A_arr = A.split("_").map(item => Number(item));
    const B_arr = B.split("_").map(item => Number(item));
    const len = Math.min(...[A_arr.length, B_arr.length]);
    for (let i = 0; i < len; i++) {
      if (A_arr[i] - B_arr[i] > 0) {
        return 1;
      } else if (A_arr[i] - B_arr[i] < 0) {
        return -1;
      }
    }
    return 0;
  }
  //渲染表的每行
  public renderTableColumn(colOptions: ITableData) {
    //根据sortIdx排好序
    const sortArr = Object.keys(colOptions)
      .filter(item => !this.bodyNotShowPropData.includes(item))
      .sort((a, b) => {
        const flag = this.isAfrontB(
          this.getHeaderItemSortIndex(a),
          this.getHeaderItemSortIndex(b)
        );
        return flag;
      });
    return (
      <tr style={{ ...this.cellStyle, width: "100%" }}>
        {sortArr.map((item, idx) => {
          const common = {
            padding: "0 25px",
            minWidth: "100px",
            height: `${this.cellHeight *
              (typeof colOptions[item] === "object"
                ? colOptions[item].rowSpan
                : 1)}px`
          };
          const isReadOnlySpan = (() => {
            const common = {
              ...this.cellStyle,
              minWidth: "120px",
              borderTop: "none",
              borderBottom: "none",
              borderRight: "none",
              borderRadius: 0,
              textAlign: "center",
              height:
                this.cellHeight *
                  (typeof colOptions[item] === "object"
                    ? colOptions[item].rowSpan
                      ? colOptions[item].rowSpan
                      : 1
                    : 1) +
                "px"
            };
            return (
              <MyInput
                addStyle={
                  colOptions[item].fn
                    ? {
                        ...common,
                        ...this.calcCellStyle
                      }
                    : {
                        ...common
                      }
                }
                parentColumnId={
                  this.uniqueKey
                    ? colOptions[this.uniqueKey]
                      ? colOptions[this.uniqueKey]
                      : colOptions["table_id"]
                    : colOptions["table_id"]
                }
                componentName={this.$options.name}
                editPropName={item}
                isReadonly
                value={
                  typeof colOptions[item] === "object"
                    ? colOptions[item].value
                    : colOptions[item]
                }
              />
            );
          })();
          const editInput = (() => {
            return (
              <MyInput
                style={{ minWidth: "100px" }}
                value={
                  typeof colOptions[item] === "object"
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
                  `td_id_${colOptions[this.uniqueKey]}_${item}_${idx}` !==
                  this.curEditTdId
                    ? {
                        ...this.cellStyle,
                        borderTop: "none",
                        borderBottom: "none",
                        borderRight: "none",
                        textAlign: "center",
                        borderRadius: 0
                      }
                    : {
                        textAlign: "center"
                      }
                }
                editPropName={item}
                componentName={this.$options.name}
              />
            );
          })();
          return this.bodyNotShowPropData.includes(item) ? null : (
            <td
              id={`td_id_${colOptions[this.uniqueKey]}_${item}_${idx}`}
              style={{
                borderBottom: `1px solid ${this.tableBorderColor}`,
                verticalAlign: "middle"
              }}
              colspan="1"
              rowspan={
                typeof colOptions[item] === "object"
                  ? colOptions[item].rowSpan
                  : 1
              }
              onClick={() =>
                this.tdClickHandler(
                  `td_id_${colOptions[this.uniqueKey]}_${item}_${idx}`,
                  this.getIfHeaderItemCanEditByKey(item)
                )
              }>
              {this.isReadOnly
                ? isReadOnlySpan
                : this.getIfHeaderItemCanEditByKey(item)
                ? typeof colOptions[item] === "object" &&
                  !colOptions[item].isCanEdit
                  ? isReadOnlySpan
                  : editInput
                : isReadOnlySpan}
            </td>
          );
        })}
      </tr>
    );
  }
  //赋值id
  public giveIdx2Item(arr: IHeaderItem[], parentSortId = "", classifyId = 0) {
    return arr.map((v, idx) => {
      const item: IHeaderArrItem = {
        ...tools.deepCopy(v),
        sortIdx: "",
        classifyId: -1
      };
      if (!item.sortIdx) {
        item.sortIdx = (parentSortId ? parentSortId + "_" : "") + idx;
      }
      item.classifyId = classifyId;
      if (
        Reflect.has(item, "children") &&
        Reflect.get(item, "children").length
      ) {
        item.children = this.giveIdx2Item(
          Reflect.get(v, "children"),
          item.sortIdx,
          classifyId + 1
        );
      }
      return item;
    });
  }

  public render() {
    return (
      <section class="nui-scroll nui-scroll-x">
        <Toast />
        {this.renderPanelBody()}
      </section>
    );
  }
}
