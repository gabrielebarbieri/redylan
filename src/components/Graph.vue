<template>
  <svg width="960" height="200">
  </svg>
</template>

<script>
import * as d3 from 'd3'
import _ from 'lodash'

export default {
  name: 'vue-generation-graph',
  props: ['graph'],
  mounted () {
    this.displayGraph()
  },
  watch: {
    graph: function dataChanged (newData, oldData) {
      this.displayGraph()
    }
  },
  methods: {

    displayGraph () {
      if (this.graph === undefined || this.graph === null) return
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

      svg.append('g')
         .selectAll('.link')
         .data(this.graph.links)
         .enter()
         .append('path')
         .attr('class', 'link')
         .attr('id', function (d) { return 'link' + d.id })
         .attr('d', function (d) { return getPath(d) })

      svg.append('g')
         .attr('class', 'label')
         .selectAll('.label')
         .data(this.graph.links)
         .enter()
         .append('text')
         .attr('dy', 3)
         .style('text-anchor', 'middle')
         .append('textPath')
         .attr('startOffset', '50%')
         .attr('xlink:href', function (d) { return '#link' + d.id })
         .text(function (d) { return _.last(_.split(d.target, ',')) })
    }
  }
}
</script>

<style>

.nodes circle {
  stroke: #fff;
  stroke-width: 1.5px;
  fill: #4fc08d;
}

.link {
  fill: none;
  stroke: #4fc08d;
  stroke-opacity: 0.1;
  stroke-width: 2.5px;
}

.label {
  stroke: #4fc08d;
  opacity: 0.3;
  font-size: 15px ;
}

</style>
