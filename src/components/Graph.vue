<template>
  <svg width="960" height="200"></svg>
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

      function x (v) {
        return v * (width - 20) + 10
      }

      function y (v) {
        return v * (height - 20) + 10
      }

      function getPath (link) {
        var curvature = 0.5
        var x0 = x(link.x0)
        var x1 = x(link.x1)
        var xi = d3.interpolateNumber(x0, x1)
        var x2 = xi(curvature)
        var x3 = xi(1 - curvature)
        var y0 = y(link.y0)
        var y1 = y(link.y1)

        return 'M' + x0 + ',' + y0 +
                'C' + x2 + ',' + y0 +
                ' ' + x3 + ',' + y1 +
                ' ' + x1 + ',' + y1
      } // get_path

      console.log(graph.links[0])
      // var link = svg.append('g')
      //               .attr('class', 'links')
      //               .selectAll('line')
      //               .data(graph.links)
      //               .enter()
      //               .append('line')
      //               .attr('stroke-width', function (d) { return Math.sqrt(d.value) })
      //               .attr('x1', function (d) { return x(d.x1) })
      //               .attr('y1', function (d) { return y(d.y1) })
      //               .attr('x2', function (d) { return x(d.x2) })
      //               .attr('y2', function (d) { return y(d.y2) })

      var link = svg.append('g')
                    .selectAll('.link')
                    .data(graph.links)
                    .enter()
                    .append('path')
                    .attr('class', 'link')
                    .attr('d', function (d) {
                      return getPath(d)
                    })

      console.log(link)
      var node = svg.append('g')
                    .attr('class', 'nodes')
                    .selectAll('circle')
                    .data(graph.nodes)
                    .enter().append('circle')
                    .attr('r', 5)
                    .attr('cx', function (d) { return x(d.x) })
                    .attr('cy', function (d) { return y(d.y) })

      node.append('title').text(function (d) { return d.id })

      // simulation.nodes(graph.nodes).on('tick', ticked)
      // simulation.force('link').links(graph.links)

      // function ticked () {
      //   link
      //     .attr('x1', function (d) { return d.source.x })
      //     .attr('y1', function (d) { return d.source.y })
      //     .attr('x2', function (d) { return d.target.x })
      //     .attr('y2', function (d) { return d.target.y })

      //   node
      //     .attr('cx', function (d) { return d.x })
      //     .attr('cy', function (d) { return d.y })
      // }
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
  fill: #4fc08d;
}

.link {
  fill: none;
  stroke: #555;
  stroke-opacity: 0.4;
  stroke-width: 1.5px;
}

</style>
