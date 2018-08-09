## 准备工作
- 确保你的vue项目已经安装以下插件：babel-plugin-transform-vue-jsx,babel-plugin-syntax-jsx
- .babelrc中配置
 "plugins": ["transform-vue-jsx", "transform-runtime"]
## 安装
- npm i custom-ele-table
- 或 yarn add custom-ele-table
<!-- ## 在线演示 -->
## 为什么要做这个组件？这个组件能干嘛

- 1.之前做vue的报表都是使用了element-ui的table组件，用过的都知道该组件并不是很符合数据驱动的思想，本人公司中多个项目需要做大量的报表展示或者修改提交的操作，因此产生了做自定义报表的需求
- 2.目前有如下报表类型：
   - 展示基本信息(staticTable)
   - 支持多层级表头的混合表格(mutilTable)
   - 支持公式运算(formulaTable)
   - 跨列单元格(rowEditableTable)

## 示例&&参数说明
```
    staticTable 组件
    ![Image text](https://github.com/foolsogood/custom-ele-table/blob/master/example/static/img/1.png?raw=true)
```
```
mutilTable组件
![Image text](https://github.com/foolsogood/custom-ele-table/blob/master/example/static/img/2.png?raw=true)
```
```
formulaTable组件
![Image text](https://github.com/foolsogood/custom-ele-table/blob/master/example/static/img/3.png?raw=true)
```
```
rowEditableTable组件
![Image text](https://github.com/foolsogood/custom-ele-table/blob/master/example/static/img/4.png?raw=true)
```
