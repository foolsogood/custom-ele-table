let tableBody = [{
    "explain": "",
    "code": "01000001",
    "thisYearValue": "",
    "rate": {
        "code": "01000001",
        "key": "rate",
        "type": "",
        "fnParms": [{
            "key": "thisYearValue",
            "code": "01000001"
        },
        {
            "key": "lastYearValue",
            "code": "01000001"
        }
        ],
        "parmArrs": null,
        "fn": "function(a,b){return(a/b)}",
        "cal": null,
        "isCanEdit": 0,
        "value": "1"
    },
    "lastYearValue": "",
    "index": "工业总产值（可比价）",
    "uint": "万元"
}, {
    "explain": "",
    "code": "01000002",
    "thisYearValue": "",
    "rate": {
        "code": "01000002",
        "key": "rate",
        "type": "",
        "fnParms": [{
            "key": "thisYearValue",

            "code": "01000002"

        }, {
            "key": "lastYearValue",

            "code": "01000002"

        }
        ],
        "parmArrs": null,
        "fn": "function(a,b){return(a/b)}",
        "cal": null,
        "isCanEdit": 0,
        "value": "1"
    },
    "lastYearValue": "",
    "index": "工业增加值",
    "uint": "万元"
},
{
    "explain": "",
    "code": "01000006",
    "thisYearValue": "",
    "rate": {
        "code": "01000006",
        "key": "rate",
        "type": "",
        "fnParms": [
            {
                "key": "thisYearValue",

                "code": "01000006"

            }, {
                "key": "lastYearValue",

                "code": "01000006"

            }
        ],
        "parmArrs": null,
        "fn": "function(a,b){return(a/b)}",
        "cal": null,
        "isCanEdit": 0,
        "value": "1"
    },
    "lastYearValue": "",
    "index": "能源管理师人数",
    "uint": "人"
},
{
    "explain": "",
    "code": "01000007",
    "thisYearValue": "",
    "rate": {
        "code": "01000007",
        "key": "rate",
        "type": "",
        "fnParms": [{
            "key": "thisYearValue"

            ,
            "code": "01000002"

        }, {
            "key": "thisYearValue",

            "code": "01000007"

        }
        ],
        "parmArrs": null,
        "fn": "function(a,b){return(a/b)}",
        "cal": null,
        "isCanEdit": 0,
        "value": "1"
    },
    "lastYearValue": "",
    "index": "综合能源消费量(当量值)",
    "uint": "万吨标准煤"
}, {
    "explain": "",
    "code": "01000008",
    "thisYearValue": "",
    "rate": {
        "code": "01000008",
        "key": "rate",
        "type": "",
        "fnParms": [{
            "key": "thisYearValue",

            "code": "01000002"

        }, {
            "key": "thisYearValue",
            "code": "01000007"

        }
        ],
        "parmArrs": null,
        "fn": "function(a,b){return(a/b)}",
        "cal": null,
        "isCanEdit": 0,
        "value": "11"
    },
    "lastYearValue": "",
    "index": "生产成本",
    "uint": "万元"
}, {
    "explain": "",
    "code": "01000009",
    "thisYearValue": "",
    "rate": {
        "code": "01000009",
        "key": "rate",
        "type": "",
        "fnParms": [{
            "key": "thisYearValue",
            "code": "01000002"
        }, {
            "key": "thisYearValue",
            "code": "01000007"
        }
        ],
        "parmArrs": null,
        "fn": "function(a,b){return(a/b)}",
        "cal": null,
        "isCanEdit": 0,
        "value": "1"
    },
    "lastYearValue": "",
    "index": "能源消费成本",
    "uint": "万元"
}, {
    "explain": "",
    "code": "01000010",
    "thisYearValue": {
        "code": "01000010",
        "key": "thisYearValue",
        "type": "",
        "fnParms": [{
    			"key":"thisYearValue",
    			"code":"01000009"
    			}, {
    			"key":"thisYearValue",
    			"code":"01000008"
    			}
            ],
        "parmArrs": null,
        "fn": "function(a,b){return(a/b)}",
        "cal": null,
        "isCanEdit": 0,
        "value": "1"
    },
    "rate": {
        "code": "01000010",
        "key": "rate",
        "type": "",
        "fnParms": [{
    			"key":"thisYearValue",
    			"code":"01000002"
    			}, {
    			"key":"thisYearValue",
    			"code":"01000007 "
    			}
            ],
        "parmArrs": null,
        "fn": "function(a,b){return(a/b)}",
        "cal": null,
        "isCanEdit": 0,
        "value": "1"
    },
    "lastYearValue": "",
    "index": "能源消费占生产成本比例",
    "uint": "%"
}, {
    "explain": "",
    "code": "01000011",
    "thisYearValue": {
        "code": "01000011",
        "key": "thisYearValue",
        "type": "",
        "fnParms": [{
    			"key":"thisYearValue",
    			"code":"01000001"
    			}, {
    			"key":"thisYearValue",
    			"code":"01000007"
    			}
            ],
        "parmArrs": null,
        "fn": "function(a,b){return(a/b)}",
        "cal": null,
        "isCanEdit": 0,
        "value": "1"
    },
    "rate": {
        "code": "01000011",
        "key": "rate",
        "type": "",
        "fnParms": [{
            "key": "thisYearValue",

            "code": "01000002"

        }, {
            "key": "thisYearValue",

            "code": "01000007"

        }
        ],
        "parmArrs": null,
        "fn": "function(a,b){return(a/b)}",
        "cal": null,
        "isCanEdit": 0,
        "value": "1"
    },
    "lastYearValue": "",
    "index": "单位产值综合能耗",
    "uint": "吨标准煤/万元"
}, {
    "explain": "",
    "code": "01000012",
    "thisYearValue": {
        "code": "01000012",
        "key": "thisYearValue",
        "type": "",
        "fnParms": [{
    			"key":"thisYearValue",
    			"code":"01000002"
    			}, {
    			"key":"thisYearValue",
    			"code":"01000007"
    			}
            ],
        "parmArrs": null,
        "fn": "function(a,b){return(a/b)}",
        "cal": null,
        "isCanEdit": 0,
        "value": "11"
    },
    "rate": {
        "code": "01000012",
        "key": "rate",
        "type": "",
        "fnParms": [{
    			"key":"thisYearValue",
    			"code":"01000002"
    			}, {
    			"key":"thisYearValue",
    			"code":"01000007"
    			}
            ],
        "parmArrs": null,
        "fn": "function(a,b){return(a/b)}",
        "cal": null,
        "isCanEdit": 0,
        "value": "11"
    },
    "lastYearValue": "",
    "index": "单位工业增加值能耗",
    "uint": "吨标准煤/万元"
}, {
    "explain": "",
    "code": "01000004",
    "thisYearValue": "",
    "rate": {
        "code": "01000004",
        "key": "rate",
        "type": "",
        "fnParms": [{
    			"key":"thisYearValue",
    			"code":"01000004"
    			}, {
    			"key":"lastYearValue",
    			"code":"01000004"
    			}
            ],
        "parmArrs": null,
        "fn": "function(a,b){return(a/b)}",
        "cal": null,
        "isCanEdit": 0,
        "value": "1"
    },
    "lastYearValue": "",
    "index": "上缴利税",
    "uint": "万元"
}, {
    "explain": "",
    "code": "01000005",
    "thisYearValue": "",
    "rate": {
        "code": "01000005",
        "key": "rate",
        "type": "",
        "fnParms": [{
    			"key":"thisYearValue",
    			"code":"01000005"
    			}, {
    			"key":"lastYearValue",
    			"code":"01000005"
    			}
            ],
        "parmArrs": null,
        "fn": "function(a,b){return(a/b)}",
        "cal": null,
        "isCanEdit": 0,
        "value": "1"
    },
    "lastYearValue": "",
    "index": "从业人员",
    "uint": "人"
}, {
    "explain": "",
    "code": "01000003",
    "thisYearValue": "",
    "rate": {
        "code": "01000003",
        "key": "rate",
        "type": "",
        "fnParms": [{
    			"key":"thisYearValue",
    			"code":"01000003"
    			}, {
    			"key":"lastYearValue",
    			"code":"01000003"
    			}
            ],
        "parmArrs": null,
        "fn": "function(a,b){return(a/b)}",
        "cal": null,
        "isCanEdit": 0,
        "value": "1"
    },
    "lastYearValue": "",
    "index": "销售收入",
    "uint": "万元"
}
]
let tableHeader = [{
    "key": "index",
    "title": "指标名称",
    "onlyOneCell": 0,
    "isCanEdit": 0,
    "isClick": 0,
    "rowSpan": 1,
    "colSpan": 1,
    "children": []
}, {
    "key": "uint",
    "title": "计量单位",
    "onlyOneCell": 0,
    "isCanEdit": 0,
    "isClick": 0,
    "rowSpan": 1,
    "colSpan": 1,
    "children": []
}, {
    "key": "thisYearValue",
    "title": "本期值",
    "onlyOneCell": 0,
    "isCanEdit": 1,
    "isClick": 0,
    "rowSpan": 1,
    "colSpan": 1,
    "children": []
}, {
    "key": "lastYearValue",
    "title": "上年同期值",
    "onlyOneCell": 0,
    "isCanEdit": 1,
    "isClick": 0,
    "rowSpan": 1,
    "colSpan": 1,
    "children": []
}, {
    "key": "rate",
    "title": "同比变化率",
    "onlyOneCell": 0,
    "isCanEdit": 1,
    "isClick": 0,
    "rowSpan": 1,
    "colSpan": 1,
    "children": []
}, {
    "key": "explain",
    "title": "产值及能耗消费变化情况说明",
    "onlyOneCell": 1,
    "isCanEdit": 1,
    "isClick": 0,
    "rowSpan": 1,
    "colSpan": 1,
    "children": []
}]
export default {
    tableBody, tableHeader
}
