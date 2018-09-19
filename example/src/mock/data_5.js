
let tableBody = [
    // {
    //     "explain": "",
    //     "numer_value_this": "",
    //     "serialNum": "1",
    //     "code": "01000401",
    //     "indexName": "",
    //     "numer_value_last": "",
    //     "index_value_this": "",
    //     "denom_value_last": "",
    //     "index_value_last": "",
    //     "change_value": "",
    //     "denom_unit": "",
    //     "energy_code": "",
    //     "numer_unit": "",
    //     "unit_coeff": "",
    //     "denom_value_this": "",
    //     "quota_value": "",
    //     "index_unit": "",
    //     "energy_value_save": ""
    // },
    // {
    //     "explain": "",
    //     "numer_value_this": "",
    //     "serialNum": "2",
    //     "code": "01000402",
    //     "indexName": "",
    //     "numer_value_last": "",
    //     "index_value_this": "",
    //     "denom_value_last": "",
    //     "index_value_last": "",
    //     "change_value": "",
    //     "denom_unit": "",
    //     "energy_code": "",
    //     "numer_unit": "",
    //     "unit_coeff": "",
    //     "denom_value_this": "",
    //     "quota_value": "",
    //     "index_unit": "",
    //     "energy_value_save": ""
    // },
    // {
    //     "explain": "",
    //     "numer_value_this": "",
    //     "serialNum": "3",
    //     "code": "01000403",
    //     "indexName": "",
    //     "numer_value_last": "",
    //     "index_value_this": "",
    //     "denom_value_last": "",
    //     "index_value_last": "",
    //     "change_value": "",
    //     "denom_unit": "",
    //     "energy_code": "",
    //     "numer_unit": "",
    //     "unit_coeff": "",
    //     "denom_value_this": "",
    //     "quota_value": "",
    //     "index_unit": "",
    //     "energy_value_save": ""
    // },
    // {
    //     "explain": "",
    //     "numer_value_this": "",
    //     "serialNum": "4",
    //     "code": "01000404",
    //     "indexName": "",
    //     "numer_value_last": "",
    //     "index_value_this": "",
    //     "denom_value_last": "",
    //     "index_value_last": "",
    //     "change_value": "",
    //     "denom_unit": "",
    //     "energy_code": "",
    //     "numer_unit": "",
    //     "unit_coeff": "",
    //     "denom_value_this": "",
    //     "quota_value": "",
    //     "index_unit": "",
    //     "energy_value_save": ""
    // },
    // {
    //     "explain": "",
    //     "numer_value_this": "",
    //     "serialNum": "5",
    //     "code": "01000405",
    //     "indexName": "",
    //     "numer_value_last": "",
    //     "index_value_this": "",
    //     "denom_value_last": "",
    //     "index_value_last": "",
    //     "change_value": "",
    //     "denom_unit": "",
    //     "energy_code": "",
    //     "numer_unit": "",
    //     "unit_coeff": "",
    //     "denom_value_this": "",
    //     "quota_value": "",
    //     "index_unit": "",
    //     "energy_value_save": ""
    // }
]
for(let i=0;i<2;i++){
    tableBody.push({
        "explain": "说明"+i,
        "numer_value_this": "本期值子项值"+i,
        "serialNum": i+1,
        "code": "010000"+(i+1),
        "indexName": "甲"+i,
        "numer_value_last": "同期值子项值"+i,
        "index_value_this": "本期值指标值"+i,
        "denom_value_last": "同期值母项值"+i,
        "index_value_last": "同期值指标值"+i,
        "change_value": "变化率(%)"+i,
        "denom_unit": "母项单位"+i,
        "energy_code": "己"+i,
        "numer_unit": "子项单位"+i,
        "unit_coeff": "单位换算系数"+i,
        "denom_value_this": "本期值母项值"+i,
        "quota_value": "国家(地区)定额"+i,
        "index_unit": "指标单位"+i,
        "energy_value_save": "节能量"+i,
    })
}
let tableHeader = [
    {
        "title": "序号",
        "onlyOneCell": 0,
        "isCanEdit": 0,
        "key": "serialNum",
        "isClick": 0,
        "rowSpan": 3,
        "colSpan": 1,
        "children": [
            {
                "title": "",
                "onlyOneCell": 0,
                "isCanEdit": 0,
                "isClick": 0,
                "rowSpan": 3,
                "colSpan": 1,
                "children": [
                    {
                        // "key": "serialNum",
                        "title": "",
                        "onlyOneCell": 0,
                        "isCanEdit": 0,
                        "isClick": 0,
                        "rowSpan": 3,
                        "colSpan": 1,
                        "children": [

                        ]
                    }
                ]
            }
        ]
    },
    {
        "title": "能源名称",
        "onlyOneCell": 0,
        "isCanEdit": 0,
        "isClick": 0,
        "rowSpan": 2,
        "colSpan": 1,
        "children": [
            {
                "title": "",
                "onlyOneCell": 0,
                "isCanEdit": 0,
                "isClick": 0,
                "rowSpan": 2,
                "colSpan": 1,
                "children": [
                    {
                        "key": "indexName",
                        "title": "甲",
                        "onlyOneCell": 0,
                        "isCanEdit": 0,
                        "isClick": 0,
                        "rowSpan": 1,
                        "colSpan": 1,
                        "children": [

                        ]
                    }
                ]
            }
        ]
    },
    {
        "title": "计量单位",
        "onlyOneCell": 0,
        "isCanEdit": 0,
        "isClick": 0,
        "rowSpan": 1,
        "colSpan": 3,
        "children": [
            {
                "title": "指标单位",
                "onlyOneCell": 0,
                "isCanEdit": 0,
                "isClick": 0,
                "rowSpan": 1,
                "colSpan": 1,
                "children": [
                    {
                        "key": "index_unit",
                        "title": "乙",
                        "onlyOneCell": 0,
                        "isCanEdit": 0,
                        "isClick": 0,
                        "rowSpan": 1,
                        "colSpan": 1,
                        "children": [

                        ]
                    }
                ]
            },
            {
                "title": "子项单位",
                "onlyOneCell": 0,
                "isCanEdit": 0,
                "isClick": 0,
                "rowSpan": 1,
                "colSpan": 1,
                "children": [
                    {
                        "key": "numer_unit",
                        "title": "丙",
                        "onlyOneCell": 0,
                        "isCanEdit": 0,
                        "isClick": 0,
                        "rowSpan": 1,
                        "colSpan": 1,
                        "children": [

                        ]
                    }
                ]
            },
            {
                "title": "母项单位",
                "onlyOneCell": 0,
                "isCanEdit": 0,
                "isClick": 0,
                "rowSpan": 1,
                "colSpan": 1,
                "children": [
                    {
                        "key": "denom_unit",
                        "title": "丁",
                        "onlyOneCell": 0,
                        "isCanEdit": 0,
                        "isClick": 0,
                        "rowSpan": 1,
                        "colSpan": 1,
                        "children": [

                        ]
                    }
                ]
            }
        ]
    },
    {
        "title": "单位换算系数",
        "onlyOneCell": 0,
        "isCanEdit": 0,
        "isClick": 0,
        "rowSpan": 2,
        "colSpan": 1,
        "children": [
            {
                "title": "",
                "onlyOneCell": 0,
                "isCanEdit": 0,
                "isClick": 0,
                "rowSpan": 1,
                "colSpan": 1,
                "children": [
                    {
                        "key": "unit_coeff",
                        "title": "戊",
                        "onlyOneCell": 0,
                        "isCanEdit": 0,
                        "isClick": 0,
                        "rowSpan": 1,
                        "colSpan": 1,
                        "children": [

                        ]
                    }
                ]
            }
        ]
    },
    {
        "title": "代码",
        "onlyOneCell": 0,
        "isCanEdit": 0,
        "isClick": 0,
        "rowSpan": 2,
        "colSpan": 1,
        "children": [
            {
                "title": "",
                "onlyOneCell": 0,
                "isCanEdit": 0,
                "isClick": 0,
                "rowSpan": 1,
                "colSpan": 1,
                "children": [
                    {
                        "key": "energy_code",
                        "title": "己",
                        "onlyOneCell": 0,
                        "isCanEdit": 0,
                        "isClick": 0,
                        "rowSpan": 1,
                        "colSpan": 1,
                        "children": [

                        ]
                    }
                ]
            }
        ]
    },
    {
        "title": "本期值",
        "onlyOneCell": 0,
        "isCanEdit": 0,
        "isClick": 0,
        "rowSpan": 1,
        "colSpan": 3,
        "children": [
            {
                "title": "指标值",
                "onlyOneCell": 0,
                "isCanEdit": 0,
                "isClick": 0,
                "rowSpan": 1,
                "colSpan": 1,
                "children": [
                    {
                        "key": "index_value_this",
                        "title": "1",
                        "onlyOneCell": 0,
                        "isCanEdit": 0,
                        "isClick": 0,
                        "rowSpan": 1,
                        "colSpan": 1,
                        "children": [

                        ]
                    }
                ]
            },
            {
                "title": "子项值",
                "onlyOneCell": 0,
                "isCanEdit": 0,
                "isClick": 0,
                "rowSpan": 1,
                "colSpan": 1,
                "children": [
                    {
                        "key": "numer_value_this",
                        "title": "2",
                        "onlyOneCell": 0,
                        "isCanEdit": 0,
                        "isClick": 0,
                        "rowSpan": 1,
                        "colSpan": 1,
                        "children": [

                        ]
                    }
                ]
            },
            {
                "title": "母项值",
                "onlyOneCell": 0,
                "isCanEdit": 0,
                "isClick": 0,
                "rowSpan": 1,
                "colSpan": 1,
                "children": [
                    {
                        "key": "denom_value_this",
                        "title": "3",
                        "onlyOneCell": 0,
                        "isCanEdit": 0,
                        "isClick": 0,
                        "rowSpan": 1,
                        "colSpan": 1,
                        "children": [

                        ]
                    }
                ]
            }
        ]
    },
    {
        "title": "同期值",
        "onlyOneCell": 0,
        "isCanEdit": 0,
        "isClick": 0,
        "rowSpan": 1,
        "colSpan": 3,
        "children": [
            {
                "title": "指标值",
                "onlyOneCell": 0,
                "isCanEdit": 0,
                "isClick": 0,
                "rowSpan": 1,
                "colSpan": 1,
                "children": [
                    {
                        "key": "index_value_last",
                        "title": "4",
                        "onlyOneCell": 0,
                        "isCanEdit": 0,
                        "isClick": 0,
                        "rowSpan": 1,
                        "colSpan": 1,
                        "children": [

                        ]
                    }
                ]
            },
            {
                "title": "子项值",
                "onlyOneCell": 0,
                "isCanEdit": 0,
                "isClick": 0,
                "rowSpan": 1,
                "colSpan": 1,
                "children": [
                    {
                        "key": "numer_value_last",
                        "title": "5",
                        "onlyOneCell": 0,
                        "isCanEdit": 0,
                        "isClick": 0,
                        "rowSpan": 1,
                        "colSpan": 1,
                        "children": [

                        ]
                    }
                ]
            },
            {
                "title": "母项值",
                "onlyOneCell": 0,
                "isCanEdit": 0,
                "isClick": 0,
                "rowSpan": 1,
                "colSpan": 1,
                "children": [
                    {
                        "key": "denom_value_last",
                        "title": "6",
                        "onlyOneCell": 0,
                        "isCanEdit": 0,
                        "isClick": 0,
                        "rowSpan": 1,
                        "colSpan": 1,
                        "children": [

                        ]
                    }
                ]
            }
        ]
    },
    {
        "title": "与同期值比",
        "onlyOneCell": 0,
        "isCanEdit": 0,
        "isClick": 0,
        "rowSpan": 1,
        "colSpan": 2,
        "children": [
            {
                "title": "节能量",
                "onlyOneCell": 0,
                "isCanEdit": 0,
                "isClick": 0,
                "rowSpan": 1,
                "colSpan": 1,
                "children": [
                    {
                        "key": "energy_value_save",
                        "title": "7",
                        "onlyOneCell": 0,
                        "isCanEdit": 0,
                        "isClick": 0,
                        "rowSpan": 1,
                        "colSpan": 1,
                        "children": [

                        ]
                    }
                ]
            },
            {
                "title": "变化率(%)",
                "onlyOneCell": 0,
                "isCanEdit": 0,
                "isClick": 0,
                "rowSpan": 1,
                "colSpan": 1,
                "children": [
                    {
                        "key": "change_value",
                        "title": "8",
                        "onlyOneCell": 0,
                        "isCanEdit": 0,
                        "isClick": 0,
                        "rowSpan": 1,
                        "colSpan": 1,
                        "children": [

                        ]
                    }
                ]
            }
        ]
    },
    {
        "title": "国家(地区)定额",
        "onlyOneCell": 0,
        "isCanEdit": 0,
        "isClick": 0,
        "rowSpan": 2,
        "colSpan": 1,
        "children": [
            {
                "title": "",
                "onlyOneCell": 0,
                "isCanEdit": 0,
                "isClick": 0,
                "rowSpan": 1,
                "colSpan": 1,
                "children": [
                    {
                        "key": "quota_value",
                        "title": "9",
                        "onlyOneCell": 0,
                        "isCanEdit": 0,
                        "isClick": 0,
                        "rowSpan": 1,
                        "colSpan": 1,
                        "children": [

                        ]
                    }
                ]
            }
        ]
    },
    {
        "title": "影响指标变化因素的说明",
        "onlyOneCell": 0,
        "isCanEdit": 0,
        "isClick": 0,
        "rowSpan": 2,
        "colSpan": 1,
        "children": [
            {
                "title": "",
                "onlyOneCell": 0,
                "isCanEdit": 0,
                "isClick": 0,
                "rowSpan": 1,
                "colSpan": 1,
                "children": [
                    {
                        "key": "explain",
                        "title": "10",
                        "onlyOneCell": 0,
                        "isCanEdit": 0,
                        "isClick": 0,
                        "rowSpan": 1,
                        "colSpan": 1,
                        "children": [

                        ]
                    }
                ]
            }
        ]
    }
]
export default {
    tableBody, tableHeader
}