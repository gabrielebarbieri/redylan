<template>
  <!-- <svg width="500" height="270">
    <g style="transform: translate(0, 10px)">
      <path :d="line" />
    </g>
  </svg> -->
  <svg width="500" height="270"></svg>
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

    var nodesData = [
    {'name': 'Travis', 'sex': 'M'},
    {'name': 'Rake', 'sex': 'M'},
    {'name': 'Diana', 'sex': 'F'},
    {'name': 'Rachel', 'sex': 'F'},
    {'name': 'Shawn', 'sex': 'M'},
    {'name': 'Emerald', 'sex': 'F'}
    ]

// set up the simulation
// nodes only for now
    var simulation = d3.forceSimulation().nodes(nodesData)

// add forces
// we're going to add a charge to each node
// also going to add a centering force
    simulation
    .force('charge_force', d3.forceManyBody())
    .force('center_force', d3.forceCenter(width / 2, height / 2))

// draw circles for the nodes
    var node = svg.append('g')
        .attr('class', 'nodes')
        .selectAll('circle')
        .data(nodesData)
        .enter()
        .append('circle')
        .attr('r', 5)
        .attr('fill', 'red')

    function tickActions () {
    // update circle positions to reflect node updates on each tick of the simulation
      node
        .attr('cx', function (d) { return d.x })
        .attr('cy', function (d) { return d.y })
    }

    simulation.on('tick', tickActions)
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
