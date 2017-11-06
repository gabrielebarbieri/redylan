<template>
  <div>
    <h1>{{sentence}}</h1>
    <div>
      <div class="ui input">
        <input type="text" v-model="sense" placeholder="Semantic sense">
      </div>
      <button class="ui button" :class="{loading: isLoading}" v-on:click="test">Generate</button>
    </div>
    <graph :values="[99, 71, 78, 25, 92, 92]"></graph>
  </div>
</template>

<script>
  import Graph from '@/components/Graph'
  var perec = require('@/core/perec')
  var Worker = require('worker-loader!@/core/worker')
  var worker = new Worker()
  worker.post = message =>
    new Promise((resolve, reject) => {
      worker.onmessage = event => {
        resolve(event.data)
      }
      worker.onerror = e => {
        console.error(`Error: Line ${e.lineno} in ${e.filename}: ${e.message}`)
        reject(e)
      }
      worker.postMessage(message)
    })

  export default {
    name: 'hello',
    data () {
      return {
        sentence: 'Hello World',
        isLoading: false,
        sense: 'music'
      }
    },
    methods: {
      test: function () {
        console.log(this.sense)

        var vm = this
        vm.sentence = 'Computing ... '
        vm.isLoading = true
        worker.post(vm.sense).then(function (markovProcess) {
          vm.sentence = perec.generate(markovProcess)
          console.log(markovProcess)
          vm.isLoading = false
        })
      }
    },
    components: {
      'graph': Graph
    }
  }
</script>


<<style>
.chart rect {
  fill: steelblue;
}

.chart text {
  fill: white;
  font: 10px sans-serif;
  text-anchor: end;
}

</style>

<!--
<style scoped>
  h1,
  h2 {
    font-weight: normal;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    display: inline-block;
    margin: 0 10px;
  }

  a {
    color: #42b983;
  }

</style>
Add "scoped" attribute to limit CSS to this component only -->
