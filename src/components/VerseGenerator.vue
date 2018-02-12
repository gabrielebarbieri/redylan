<template>
  <div>
    <h2>{{sentence}}</h2>
    <el-row >
      <search v-model="sense"></search>
      <el-button type="primary" :loading="isLoading" v-on:click="fit" style="margin-left: 10px;">Fit</el-button>
      <el-button type="primary" v-bind:disabled="markovProcess===null" v-on:click="generate">Generate</el-button>
    </el-row>
    <graph :graph="markovProcessGraph"></graph>
  </div>
</template>

<script>
  import Graph from '@/components/Graph'
  import Search from '@/components/Search'
  var perec = require('@/core/perec')
  import worker from '@/core/workerclient'

  export default {
    name: 'generator',
    data () {
      return {
        sense: '',
        sentence: 'Click on the fit button to train a super model',
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
        worker.generateMarkovProcess(vm.sense).then(function (markovProcess) {
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
      'graph': Graph,
      'search': Search
    }
  }
</script>

<style>
  .input {
    display: inline-block;
    /*width: 130px;*/
  }
</style>
