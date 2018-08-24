let tableBody = [
    {
        name: '工业总产值',//指标名称
        bqz: '100',//本期值
        lastyear_value: '',//上年同期值
        unit: '万元',//计量单位
        change_rate: '',//同比变化率
        shuoming:'说明123'
    },
    {
        unit: '万元',
        name: '工业增加值',
        bqz: '120',
        lastyear_value: '',
        change_rate: '85%',
        shuoming:'说明aaa'
        
    },
    {
        name: '销售收入',
        unit: '万元',
        bqz: '100',
        lastyear_value: '120',
        change_rate: '',
        shuoming:'说明ccc'
        
    },
]
let tableHeader = [
    {
        title: '指标名称',
        key: 'name',
    },
    {
        title: '计量单位',
        key: 'unit',
    },
    {
        title: '本期值',
        key: 'bqz',
    },
    {
        title: '上年同期值',
        key: 'lastyear_value',
    },
    {
        title: '同比变化率',
        key: 'change_rate',
    },
    {
        title: '产值及能耗消费变化情况说明',
        key: 'shuoming',
    },

]
export default {
    tableBody, tableHeader
}