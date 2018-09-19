import tools from 'tools/tools'
let tableBody = [{
  chanzhi: 14665.7467287879,
  date: '2017年1月',
  dianli: 23882.232,
  reli: 12042.549236,
  tianranqi: 4708.551,
  chang_yd: 546.55200000001,
  dwcp_zhnh: 105.049390127103,
  gdmh: 227.794201736158,
  zhnh: 25088.1390647399,
}, {
  date: '2017年2月',
  dianli: 21132.144,
  reli: 15756.27845536,
  chanzhi: 13007.0478905455,
  tianranqi: 4183.6351,
  chang_yd: 466.307999999975,
  gdmh: 228.333932975391,
  zhnh: 22359.9411992976,
  dwcp_zhnh: 105.81009290537
}, {
  date: '2017年3月',
  dianli: 21551.244,
  reli: 27133.50316544,
  chanzhi: 13330.2886288485,
  tianranqi: 4335.0307,
  chang_yd: 538.995999999985,
  gdmh: 230.189739210279,
  zhnh: 23103.1740061685,
  dwcp_zhnh: 107.201115657957
}, {
  date: '2017年4月',
  dianli: 22182.996,
  reli: 27964.49046376,
  chanzhi: 13721.2620070606,
  tianranqi: 4460.15809999999,
  chang_yd: 541.766000000012,
  gdmh: 230.047605780662,
  zhnh: 23794.1028231437,
  dwcp_zhnh: 107.26280085496
}, {
  date: '2017年5月',
  dianli: 38523.54,
  reli: 22208.52673424,
  chanzhi: 23673.1906073333,
  tianranqi: 7764.10410000001,
  chang_yd: 858.988000000012,
  gdmh: 233.067102663982,
  zhnh: 42406.1269319723,
  dwcp_zhnh: 110.078479111661
}, {
  date: '2017年6月',
  dianli: 34326.336,
  reli: 19468.7321136,
  chanzhi: 21092.0681933334,
  tianranqi: 7016.05299999999,
  chang_yd: 804.287999999971,
  gdmh: 235.791401278698,
  zhnh: 38721.0604996891,
  dwcp_zhnh: 112.802777726376
}, {
  date: '2017年7月',
  dianli: 24679.908,
  reli: 24096.00772304,
  chanzhi: 15224.329154,
  tianranqi: 4948.28300000001,
  chang_yd: 603.163999999979,
  gdmh: 230.249741662143,
  zhnh: 26471.9452692754,
  dwcp_zhnh: 107.261118109822
}, {
  date: '2017年8月',
  dianli: 16130.532,
  reli: 15350.09960584,
  chanzhi: 9948.1108241515,
  tianranqi: 3222.59780000001,
  chang_yd: 447.291440000077,
  gdmh: 229.85277742516,
  zhnh: 17300.6111029401,
  dwcp_zhnh: 107.253815949407
}, {
  date: '2017年9月',
  dianli: 13622.1,
  reli: 27034.5277768,
  chanzhi: 8484.11668757575,
  tianranqi: 2695.5603,
  chang_yd: 398.680560000016,
  gdmh: 220.641668505362,
  zhnh: 13318.8193373373,
  dwcp_zhnh: 97.773613006345
}]
let tableHeader = [
  {
    title: '日期',
    key: 'date'
  },
  {
    title: '电力',
    key: 'dianli',
    isCanEdit:1
  },
  {
    title: '热力',
    key: 'reli',
    isCanEdit:1
  },
  {
    title: '产值',
    key: 'chanzhi',
    isCanEdit:1
  },
  {
    title: '天然气',
    key: 'tianranqi',
    isCanEdit:1
  },
  {
    title: '厂',
    key: 'chang_yd',
    isCanEdit:1
  },
  {
    title: '供电煤耗',
    key: 'gdmh',
    isCanEdit:1
  },
  {
    title: '转化能耗',
    key: 'zhnh',
    isCanEdit:1
  },
  {
    title: '产品转化能耗',
    key: 'dwcp_zhnh',
    isCanEdit:1
  },
]
tableBody.map(item => {
  for (let key in item) {
    if (!['date'].includes(key)) {
      item[key] = parseFloat(item[key] - 0).toFixed(2)
    }
    if(!item.code){
      item.code=tools.guid()
    }
  }
})
export default {
  tableHeader,
  tableBody
}
