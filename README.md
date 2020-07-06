## tips

有改进建议或 bug 请提 issue

## 准备工作

- 3.x 已使用 typescript，增加对 ts 的支持，直接使用即可
- 如果项目仍在使用 2.x 版本
  - 确保你的 vue 项目已经安装以下插件：babel-plugin-transform-vue-jsx,babel-plugin-syntax-jsx
  - .babelrc 中配置
    "plugins": ["transform-vue-jsx", "transform-runtime"]

## 安装

- npm i custom-ele-table
- 或 yarn add custom-ele-table

## 在线演示

[狠狠戳我](https://foolsogood.github.io/custom-ele-table/index.html)

## 为什么要做这个组件？这个组件能干嘛

- 1.之前做 vue 的报表都是使用了 element-ui 的 table 组件，用过的都知道该组件并不是很符合数据驱动的思想，公司中多个项目需要做大量的报表展示或者修改提交的操作，因此产生了做自定义报表的需求
- 2.目前有如下报表类型：
  - 展示基本信息(staticTable)
  - 支持多层级表头的混合表格(mutilTable)
  - 跨列单元格(rowEditableTable)

## 示例&&参数说明

导入

```
import { staticTable, rowEditableTable, mutilTable } from "custom-ele-table";
```

#### staticTable 组件

```
    <staticTable :tableData="tableData" />
```

#### mutilTable 组件

```
    <mutilTable ref="TEST_NODE" @TableDataChange="changeDataHandler"  :firstThClickHandler="triggerFn" :isFirstThEableClick="true" :isReadOnly="isMutilReadOnly" :tableData="tableDatas_1" :tableHeader="tableHeader_1" :bodyNotShowProps="['code','id']" uniqueKey="code" />

```

#### rowEditableTable 组件

```
    <rowEditableTable  @TableDataChange="rowEditTableDataChangeHandler" :tableData="edit_tableData" :tableHeader="edit_tableHeader" :bodyNotShowProps="['code']" uniqueKey="code" />
```

#### 参数说明

| 属性                | 说明                             | 类型     | 默认值                                           | staticTable | rowEditableTable | mutilTable |
| ------------------- | -------------------------------- | -------- | ------------------------------------------------ | ----------- | ---------------- | ---------- |
| tableData           | 表体数据                         | Array    | []                                               | ✔️          | ✔️               | ✔️         |
| tableHeader         | 表头数据                         | Array    | []                                               | ❌          | ✔️               | ✔️         |
| tableBorderColor    | 表格边框颜色                     | String   | #ddd                                             | ✔️          | ✔️               | ✔️         |
| cellHeight          | 单元格高度                       | Number   | 40                                               | ✔️          | ✔️               | ✔️         |
| bodyNotShowProps    | 表体不显示的属性                 | Array    | []                                               | ❌          | ✔️               | ✔️         |
| uniqueKey           | 每一行的唯一标识(如 code,id)     | String   |                                                  | ❌          | ✔️               | ✔️         |
| firstThClickHandler | 点击表头首个 th 触发事件         | Function | /                                                | ❌          | ✔️               | ✔️         |
| isFirstThEableClick | firstThClickHandler 属性是否可用 | Boolean  | false                                            | ❌          | ✔️               | ✔️         |
| firstThStyle        | 表头首个 th 样式                 | Object   | {}                                               | ❌          | ✔️               | ✔️         | – |
| isReadOnly          | 该表格是否只读                   | Boolean  | false                                            | ❌          | ✔️               | ✔️         |
| bodyEmptyTips       | 表体无数据显示的提示语           | String   | 暂无数据                                         | ❌          | ✔️               | ✔️         |
| headerStyle         | header 样式                      | Object   | {background: "rgb(230, 242, 246)",color: "#333"} | ✔️          | ✔️               | ✔️         |
| cellStyle           | body 单元格样式                  | Object   | {background: "#fff",color: "#333"}               | ✔️          | ✔️               | ✔️         |
| calcCellStyle       | 公式计算结果的单元格样式         | Object   | {background: "#999",color: "#fff"}               | ❌          | ✔️               | ✔️         |

#### 回调方法

| 方法            | 说明                 | staticTable | rowEditableTable | mutilTable |
| --------------- | -------------------- | ----------- | ---------------- | ---------- |
| TableDataChange | 表体数据变化回调方法 | ❌          | ✔️               | ✔️         |

#### 节点方法

| 直接操作 ref 节点方法               | 说明                 | staticTable | rowEditableTable | mutilTable |
| ----------------------------------- | -------------------- | ----------- | ---------------- | ---------- |
| this.\$refs.TEST_NODE.reCalculate() | 表体数据公式重新计算 | ❌          | ❌               | ✔️         |
