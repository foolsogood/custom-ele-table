let tableBody = [{
    month: '1月',
    lng: '',
    qiyou: '',
    chaiyou_che: '',
    ghg_1: '',
    tianranqi: 4708.551,
    diweizhi: 34.0753118273541,
    ghg_2: 89226.2226903353,
    ywdl: 47.344,
    ghg_3: 249.550224,
    ghg_total: 89475.7729143353
  },
  {
    month: '2月',
    lng: '',
    qiyou: '',
    chaiyou_che: '',
    ghg_1: '',
    tianranqi: 4183.6351,
    diweizhi: 34.1362548875259,
    ghg_2: 79420.9469578391,
    ywdl: 79.8599999999999,
    ghg_3: 420.94206,
    ghg_total: 79841.8890178391
  },
  {
    month: '3月',
    lng: '',
    qiyou: '',
    chaiyou_che: '',
    ghg_1: '',
    tianranqi: 4335.0307,
    diweizhi: 34.1227408954681,
    ghg_2: 82262.4190016046,
    ywdl: '0',
    ghg_3: '0',
    ghg_total: '82262.4190016046'
  },
  {
    month: '4月',
    lng: '',
    qiyou: '',
    chaiyou_che: '',
    ghg_1: '',
    tianranqi: '4460.15809999999',
    diweizhi: '34.117761390566',
    ghg_2: '84624.5108506591',
    ywdl: '36.7620000000001',
    ghg_3: '193.772502000001',
    ghg_total: '84818.2833526591'
  },
  {
    month: '5月',
    lng: '',
    qiyou: '',
    chaiyou_che: '',
    ghg_1: '',
    tianranqi: '7764.10410000001',
    diweizhi: '34.1356281938569',
    ghg_2: '147388.853151911',
    ywdl: '0',
    ghg_3: '0',
    ghg_total: '147388.853151911'
  },
  {
    month: '6月',
    lng: '',
    qiyou: '',
    chaiyou_che: '',
    ghg_1: '',
    tianranqi: '7016.05299999999',
    diweizhi: '34.045081900037',
    ghg_2: '132835.035047484',
    ywdl: '0',
    ghg_3: '0',
    ghg_total: '132835.035047484'
  },
  {
    month: '7月',
    lng: '',
    qiyou: '',
    chaiyou_che: '',
    ghg_1: '',
    tianranqi: '4948.28300000001',
    diweizhi: '34.1013843731249',
    ghg_2: '93840.8493397861',
    ywdl: '0',
    ghg_3: '0',
    ghg_total: '93840.8493397861'
  },
  {
    month: '8月',
    lng: '',
    qiyou: '',
    chaiyou_che: '',
    ghg_1: '',
    tianranqi: '3222.59780000001',
    diweizhi: '34.1530557489984',
    ghg_2: '61206.9957911491',
    ywdl: '51.1059999999999',
    ghg_3: '269.379725999999',
    ghg_total: '61476.3755171491'
  },
  {
    month: '9月',
    lng: '',
    qiyou: '',
    chaiyou_che: '',
    ghg_1: '',
    tianranqi: '2695.5603',
    diweizhi: '33.6406699787054',
    ghg_2: '50428.8516124774',
    ywdl: '13.354',
    ghg_3: '70.3889339999999',
    ghg_total: '50499.2405464774'
  },
  {
    month: '10月',
    lng: '',
    qiyou: '',
    chaiyou_che: '',
    ghg_1: '',
    tianranqi: '4494.65529999998',
    diweizhi: '33.8306721318541',
    ghg_2: '84561.4472851368',
    ywdl: '53.4159999999999',
    ghg_3: '281.555736',
    ghg_total: '84843.0030211368'
  },
  {
    month: '11月',
    lng: '',
    qiyou: '',
    chaiyou_che: '',
    ghg_1: '',
    tianranqi: '4393.3581',
    diweizhi: '34.1282536085551',
    ghg_2: '83382.7202892539',
    ywdl: '75.5260000000002',
    ghg_3: '398.097546000001',
    ghg_total: '83780.8178352539'
  },
  {
    month: '12月',
    lng: '',
    qiyou: '',
    chaiyou_che: '',
    ghg_1: '',
    tianranqi: '5775.4311',
    diweizhi: '34.6650054157862',
    ghg_2: '111337.398620802',
    ywdl: '0',
    ghg_3: '0',
    ghg_total: '111337.398620802'
  },
  {
    month: '合计',
    lng: '31384.93',
    qiyou: '44532.415',
    chaiyou_che: '2268.26',
    ghg_1: '164.243528056464',
    tianranqi: '57997.4176',
    diweizhi: '34.1210520317374',
    ghg_2: '1100516.25063844',
    ywdl: '357.368',
    ghg_3: '1883.686728',
    ghg_total: '1102564.18089449'
  }
]
let tableHeader = [
  {
    title: '日期',
    key: 'month',
    isCanEdit:0,
    rowSpan:2,
    colSpan:1,
  },
  {
    title: 'LNG 汽油 柴油燃烧排放',
    rowSpan:1,
    colSpan:4,
    children: [{
        title: 'LNG/车用(升)',
        key: 'lng',
        isCanEdit:1
      },
      {
        title: '汽油/车(升)',
        isCanEdit:1,
        key: 'qiyou',
      },
      {
        title: '柴油/车(升)',
        key: 'chaiyou_che',
        isCanEdit:1
      },
      {
        title: 'GHG排放(吨)',
        key: 'ghg_1',
        isCanEdit:1
      },
    ]
  },
  {
    title: '天然气燃烧排放',
    rowSpan:1,
    colSpan:3,
    children: [{
        title: '天然气(万方)',
        key: 'tianranqi',
        isCanEdit:1
      },
      {
        title: '低位热值(MJ/方)',
        key: 'diweizhi',
        isCanEdit:1
      },
      {
        title: 'GHG排放',
        key: 'ghg_2',
        isCanEdit:1
      },

    ]
  },
  {
    title: '外购电力排放',
    rowSpan:1,
    colSpan:2,
    children: [{
        title: '用网电量(万度)',
        key: 'ywdl',
        isCanEdit:1
      },
      {
        title: 'GHG排放',
        key: 'ghg_3',
        isCanEdit:1
      },

    ]
  },
  {
    title: '合计',
    children: [{
      title: 'GHG排放总量(吨)',
      key: 'ghg_total'
    }]
  }
]
tableBody.map(item => {
  for (let key in item) {
    if (key != 'month' && item[key] != '0') {
      item[key] = parseFloat(item[key] - 0).toFixed(2)
    }
    if(!item.code){
      item.code=guid()
    }
  }
})
function guid() {
  function S4() {
      return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
  }
  return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
}
export default {
  tableHeader,
  tableBody
}
