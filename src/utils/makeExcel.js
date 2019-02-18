import Vue from 'vue'

let formatJson = (filterVal, jsonData)=>{
  return jsonData.map(v => filterVal.map(j => v[j]))
}

const putExcel = (Theader,Val,tData) => {
  require.ensure([], () => {
    const { export_json_to_excel } = require('src/vender/export2Excel');
    const tHeader = Theader;
    const filterVal = Val;
    const list = tData;
    const data = formatJson(filterVal, list);
    export_json_to_excel(tHeader, data, 'excel');
  })
}
Vue.prototype.$export2Excel = putExcel