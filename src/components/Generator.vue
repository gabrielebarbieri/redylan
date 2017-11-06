<template>
  <div>
    <h1>{{sentence}}</h1>
    <div>
      <div class="ui input">
        <input type="text" v-model="sense" placeholder="Semantic sense">
      </div>
      <button class="ui button" :class="{loading: isLoading}" v-on:click="generate">Generate</button>
    </div>
    <graph :values="values"></graph>
  </div>
</template>

<script>
  import Graph from '@/components/Graph'
  var _ = require('lodash')
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
    name: 'generator',
    data () {
      return {
        sentence: 'Hello World',
        isLoading: false,
        sense: 'music',
        values: [99, 71, 78, 25, 92, 92]
      }
    },
    methods: {
      generate: function () {
        console.log(this.sense)

        var vm = this
        vm.sentence = 'Computing ... '
        vm.isLoading = true
        worker.post(vm.sense).then(function (markovProcess) {
          vm.sentence = perec.generate(markovProcess)
          vm.values = _.map(markovProcess, e => _.size(e))
          vm.isLoading = false
        })
      }
    },
    components: {
      'graph': Graph
    }
  }
</script>
