var markov = require('./markovchain')
var dylanMatrices = require('./dylan_matrices.json')
var similarities = require('./word_similarities.json')
var _ = require('lodash')

var ORDER = dylanMatrices.length - 1

function generateSentences (constraints, n) {
  var mc = markov.getMarkovProcess(dylanMatrices, constraints)
  return _.times(n, i => _.join(markov.generate(mc, ORDER), ' '))
}

function getConstraints (words, index, length) {
  var cts = _.fill(Array(length), null)
  cts[index] = words
  cts.unshift(['<s>'])
  cts.push(['</s>'])
  return cts
}

function generateSemanticSentence (sense, length, n) {
  var words = similarities[sense]

  var indices = _.shuffle(_.range(length))
  for (var i = 0; i < length; i++) {
    var index = indices[i]
    var cts = getConstraints(words, index, length)
    try {
      return generateSentences(cts, n)
    } catch (err) {
    }
  }
  return null
}

module.exports = generateSemanticSentence
