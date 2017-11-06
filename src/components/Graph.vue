<template>
  <svg width="500" height="270">
    <g style="transform: translate(0, 10px)">
      <path :d="line" />
    </g>
  </svg>
</template>

<script>
import * as d3 from 'd3'
export default {
  name: 'vue-line-chart',
  props: ['values'],
  data () {
    return {
      data: this.values,
      line: ''
    }
  },
  mounted () {
    this.calculatePath()
  },
  watch: {
    values: function dataChanged (newData, oldData) {
      console.log(newData)

      this.calculatePath()
    }
  },
  methods: {
    getScales () {
      const x = d3.scaleTime().range([0, 430])
      const y = d3.scaleLinear().range([210, 0])
      d3.axisLeft().scale(x)
      d3.axisBottom().scale(y)
      x.domain(d3.extent(this.values, (d, i) => i))
      y.domain([0, d3.max(this.values, d => d)])
      return { x, y }
    },
    calculatePath () {
      const scale = this.getScales()
      const path = d3.line()
        .x((d, i) => scale.x(i))
        .y(d => scale.y(d))
      this.line = path(this.values)
    }
  }
}
</script>

<style scoped>
svg {
  margin: 25px;
}
path {
  fill: none;
  stroke: #76BF8A;
  stroke-width: 3px;
}
</style>
