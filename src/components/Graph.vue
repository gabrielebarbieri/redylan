<template>
  <!-- <svg width="500" height="270">
    <g style="transform: translate(0, 10px)">
      <path :d="line" />
    </g>
  </svg> -->
  <svg width="960" height="600"></svg>
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
    // this.calculatePath()
    var svg = d3.select(this.$el)
    var width = +svg.attr('width')
    var height = +svg.attr('height')

    var color = d3.scaleOrdinal(d3.schemeCategory20)

    var simulation = d3.forceSimulation()
    .force('link', d3.forceLink().id(function (d) { return d.id }))
    .force('charge', d3.forceManyBody())
    .force('center', d3.forceCenter(width / 2, height / 2))

    d3.json('static/miserables.json', function (error, graph) {
      if (error) throw error

      var link = svg.append('g')
      .attr('class', 'links')
    .selectAll('line')
    .data(graph.links)
    .enter().append('line')
      .attr('stroke-width', function (d) { return Math.sqrt(d.value) })

      var node = svg.append('g')
      .attr('class', 'nodes')
    .selectAll('circle')
    .data(graph.nodes)
    .enter().append('circle')
      .attr('r', 5)
      .attr('fill', function (d) { return color(d.group) })

      node.append('title')
      .text(function (d) { return d.id })

      simulation
      .nodes(graph.nodes)
      .on('tick', ticked)

      simulation.force('link')
      .links(graph.links)

      function ticked () {
        link
        .attr('x1', function (d) { return d.source.x })
        .attr('y1', function (d) { return d.source.y })
        .attr('x2', function (d) { return d.target.x })
        .attr('y2', function (d) { return d.target.y })

        node
        .attr('cx', function (d) { return d.x })
        .attr('cy', function (d) { return d.y })
      }
    })
  },
  watch: {
    values: function dataChanged (newData, oldData) {
      console.log(newData)

      this.calculatePath()
    }
  },
  methods: {
    getScales () {
      const x = d3.scaleTime().range([0, 431])
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

<style>
/*svg {
  margin: 25px;
}
path {
  fill: none;
  stroke: #76BF8A;
  stroke-width: 3px;
}*/

.links line {
  stroke: #999;
  stroke-opacity: 0.6;
}

.nodes circle {
  stroke: #fff;
  stroke-width: 1.5px;
}
</style>
