<template>
    <div class="tan">
        <ve-line :data="chartData1" :settings="chartSettings1"></ve-line>
        <ve-ring :data="chartData" :settings="chartSettings"></ve-ring>
    </div>
</template>

<script>
export default {
    data () {
    this.chartSettings1 = {
      metrics: ['下单用户']
    },
    this.chartSettings = {
        roseType: 'radius'
      }
    return {
      chartData1: {
        columns: ['日期', '访问用户', '下单用户'],
        rows: [
          { '日期': '2018-05-22', '访问用户': 32371, '下单用户': 19810 },
          { '日期': '2018-05-23', '访问用户': 12328, '下单用户': 4398 },
          { '日期': '2018-05-24', '访问用户': 92381, '下单用户': 52910 }
        ]
      },
      chartData: {
          columns: ['日期', '访问用户'],
          rows: [
            { '日期': '1/1', '访问用户': 1393, '下单用户': 19810 },
            { '日期': '1/2', '访问用户': 3530, '下单用户': 4398 },
            { '日期': '1/3', '访问用户': 2923, '下单用户': 4398 },
            { '日期': '1/4', '访问用户': 1723, '下单用户': 52910 },
            { '日期': '1/5', '访问用户': 3792, '下单用户': 52910 },
            { '日期': '1/6', '访问用户': 4593, '下单用户': 19810 }
          ]
      }
    }
  },
}
</script>

<style>

</style>
