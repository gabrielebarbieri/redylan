<template>
  <svg width="960" height="200">
    <g v-for="link in links">
      <path class="link" :d="getPath(link)" :id="'link' + link.id"></path>
      <text dy="3" class="label">
        <textPath startOffset="50%" :xlink:href="'#link' + link.id">{{getLabal(link)}}</textPath>
      </text>
    </g>
  </svg>
</template>

<script>
import * as d3 from 'd3-interpolate'
import _ from 'lodash'

export default {
  name: 'vue-generation-graph',
  props: ['graph'],
  computed: {
    links: function () {
      if (this.graph === undefined || this.graph === null) return []
      return this.graph.links
    }
  },
  methods: {
    x (v) {
      return v * (this.graph.width - 20) + 10
    },
    y (v) {
      return v * (this.graph.height - 20) + 10
    },
    getLabal (link) {
      return _.last(_.split(link.target, ','))
    },
    getPath (link) {
      var curvature = 0.5
      var x0 = this.x(link.x0)
      var x1 = this.x(link.x1)
      var xi = d3.interpolateNumber(x0, x1)
      var x2 = xi(curvature)
      var x3 = xi(1 - curvature)
      var y0 = this.y(link.y0)
      var y1 = this.y(link.y1)

      return 'M' + x0 + ',' + y0 +
              'C' + x2 + ',' + y0 +
              ' ' + x3 + ',' + y1 +
              ' ' + x1 + ',' + y1
    } // get_path
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
  text-anchor: middle;
}

</style>
