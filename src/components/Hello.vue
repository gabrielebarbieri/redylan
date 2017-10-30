<template>
  <div>
    <h1>{{sentence}}</h1>
    <div>
      <button :class="buttonClass" v-on:click="test">Generate</button>
    </div>
  </div>
</template>

<script>
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
        buttonClass: 'ui button'
      }
    },
    methods: {
      test: function () {
        console.log('here')

        var vm = this
        vm.sentence = 'Computing ... '
        vm.buttonClass = 'ui button loading'
        worker.post('music').then(function (e) {
          console.log('Worker said: ', e)
          vm.sentence = e[0]
          vm.buttonClass = 'ui button'
        })
      }
    }
  }

</script>

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
