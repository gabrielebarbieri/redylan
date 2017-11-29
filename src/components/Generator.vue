<template>
  <div>
    <h1>{{sentence}}</h1>
    <div>
      <div class="ui input">
        <input type="text" v-model="sense" placeholder="Semantic sense">
      </div>
      <button class="ui button" :class="{loading: isLoading}" v-on:click="fit">Fit</button>
      <button class="ui button" :class="{disabled: markovProcess === null}" v-on:click="generate">Generate</button>
    </div>
    <graph :graph="markovProcessGraph"></graph>
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
    name: 'generator',
    data () {
      return {
        sense: 'music',
        sentence: 'Click on the fit button to train a model',
        isLoading: false,
        markovProcess: null,
        sequence: null
      }
    },
    computed: {
      markovProcessGraph: function () {
        if (this.markovProcess !== null) {
          var g = perec.convertToGraph(this.markovProcess)
          perec.colorSentence(g, this.sequence)
          console.log(g)
          return g
        }
      }
    },
    methods: {
      fit: function () {
        var vm = this
        vm.markovProcess = null
        vm.sequence = null
        vm.sentence = 'Computing ... '
        vm.isLoading = true
        worker.post(vm.sense).then(function (markovProcess) {
          // vm.sequence = perec.generate(markovProcess)
          // vm.sentence = perec.represent(vm.sequence)
          vm.markovProcess = markovProcess
          vm.sentence = 'Click on generate to get a sentence'
          vm.isLoading = false
        })
      },
      generate: function () {
        var vm = this
        if (vm.markovProcess === null) return
        vm.sequence = perec.generate(vm.markovProcess)
        vm.sentence = perec.represent(vm.sequence)
      }
    },
    components: {
      'graph': Graph
    }
  }
</script>
