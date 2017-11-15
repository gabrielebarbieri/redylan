<template>
  <svg width="960" height="600"></svg>
</template>

<script>
import * as d3 from 'd3'
import markov from '@/core/markovchain'

var order = 2

export default {
  name: 'vue-generation-graph',
  props: ['markovProcess'],
  mounted () {
    this.calculateGraph()
  },
  watch: {
    markovProcess: function dataChanged (newData, oldData) {
      this.calculateGraph()
    }
  },
  methods: {

    calculateGraph () {
      if (this.markovProcess === null) return

      var graph = markov.convertToD3(this.markovProcess, order)
      console.log(graph)
      var svg = d3.select(this.$el)
      svg.selectAll('*').remove()
      var width = +svg.attr('width')
      var height = +svg.attr('height')

      var color = d3.scaleOrdinal(d3.schemeCategory20)

      var simulation = d3.forceSimulation()
                         .force('link', d3.forceLink().id(function (d) { return d.id }))
                         .force('charge', d3.forceManyBody())
                         .force('center', d3.forceCenter(width / 2, height / 2))

      console.log(graph.links[0])
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

      node.append('title').text(function (d) { return d.id })

      simulation.nodes(graph.nodes).on('tick', ticked)
      simulation.force('link').links(graph.links)

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
    }
  }
}
</script>

<style>
.links line {
  stroke: #999;
  stroke-opacity: 0.6;
}

.nodes circle {
  stroke: #fff;
  stroke-width: 1.5px;
}
</style>
