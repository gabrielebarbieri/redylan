<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h1>{{sentence}}</h1>
    <!-- <h2>Essential Links</h2>
    <ul>
      <li><a href="https://vuejs.org" target="_blank">Core Docs</a></li>
      <li><a href="https://forum.vuejs.org" target="_blank">Forum</a></li>
      <li><a href="https://chat.vuejs.org" target="_blank">Community Chat</a></li>
      <li><a href="https://twitter.com/vuejs" target="_blank">Twitter</a></li>
      <br>
      <li><a href="http://vuejs-templates.github.io/webpack/" target="_blank">Docs for This Template</a></li>
    </ul>
    <h2>Ecosystem</h2>
    <ul>
      <li><a href="http://router.vuejs.org/" target="_blank">vue-router</a></li>
      <li><a href="http://vuex.vuejs.org/" target="_blank">vuex</a></li>
      <li><a href="http://vue-loader.vuejs.org/" target="_blank">vue-loader</a></li>
      <li><a href="https://github.com/vuejs/awesome-vue" target="_blank">awesome-vue</a></li>
    </ul> -->
  </div>
</template>

<script>
import markov from '@/core/markovchain'
import dylan from '@/core/dylan.json'

var c = [['C'], null, null, ['D']]
var corpus = dylan['sentences'] // ['ECDECC'.split(''), 'CCEEDC'.split('')]
var n = 2
var ms = markov.parseSequences(corpus, n)
console.log(ms)

var mc = markov.getMarkovProcess(ms, c)

export default {
  name: 'hello',
  data () {
    return {
      msg: markov.generate(mc, 2),
      sentence: dylan['sentences']
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
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
