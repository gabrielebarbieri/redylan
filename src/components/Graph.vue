<template>
  <svg width="960" height="600"></svg>
</template>

<script>
import * as d3 from 'd3'
import _ from 'lodash'

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

    processToGraph () {
      if (this.markovProcess === null) return
      var graph = {nodes: [], links: []}
      var currentNodes = ['<s>']
      console.log('----------------------')
      for (var i = 1; i < this.markovProcess.length; i++) {
        console.log(i)
        var matrix = this.markovProcess[i]

        // TODO these are not nodes but links
        var nodes = _.uniq(_.flatten(_.map(currentNodes, function (node) {
          var prefix = '' + _.takeRight(_.split(node, ','), _.min([i, order]))
          var suffixes = _.keys(matrix[prefix])
          return _.map(suffixes, suffix => '' + [prefix, suffix])
        })))
        currentNodes = nodes
        console.log(currentNodes)
        // if (i >= 3) break
      }
      return graph
    },

    calculateGraph () {
      if (this.markovProcess === null) return

      this.processToGraph()
      var svg = d3.select(this.$el)
      svg.selectAll('*').remove()
      var width = +svg.attr('width')
      var height = +svg.attr('height')

      var color = d3.scaleOrdinal(d3.schemeCategory20)

      var simulation = d3.forceSimulation()
                         .force('link', d3.forceLink().id(function (d) { return d.id }))
                         .force('charge', d3.forceManyBody())
                         .force('center', d3.forceCenter(width / 2, height / 2))

      d3.json('static/miserables.json', function (error, graph) {
        if (error) throw error

        // var link = svg.append('g')
        //               .attr('class', 'links')
        //               .selectAll('line')
        //               .data(graph.links)
        //               .enter().append('line')
        //               .attr('stroke-width', function (d) { return Math.sqrt(d.value) })

        var node = svg.append('g')
                      .attr('class', 'nodes')
                      .selectAll('circle')
                      .data(graph.nodes)
                      .enter().append('circle')
                      .attr('r', 5)
                      .attr('fill', function (d) { return color(d.group) })

        node.append('title').text(function (d) { return d.id })

        simulation.nodes(graph.nodes).on('tick', ticked)
        // simulation.force('link').links(graph.links)

        function ticked () {
          // link
          //   .attr('x1', function (d) { return d.source.x })
          //   .attr('y1', function (d) { return d.source.y })
          //   .attr('x2', function (d) { return d.target.x })
          //   .attr('y2', function (d) { return d.target.y })

          node
            .attr('cx', function (d) { return d.x })
            .attr('cy', function (d) { return d.y })
        }
      })
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
