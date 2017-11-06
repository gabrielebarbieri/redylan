var markov = require('./markovchain')
var dylanMatrices = require('./dylan_matrices.json')
var similarities = require('./word_similarities.json')
var _ = require('lodash')

var ORDER = dylanMatrices.length - 1

function generateSentence (markovProcess) {
  return _.join(_.slice(markov.generate(markovProcess, ORDER), 1, -1), ' ')
}

function getConstraints (words, index, length) {
  var cts = _.fill(Array(length), null)
  cts[index] = words
  cts.unshift(['<s>'])
  cts.push(['</s>'])
  return cts
}

function getSemanticMarkovProcess (sense, length) {
  var words = similarities[sense]

  var indices = _.shuffle(_.range(length))
  for (var i = 0; i < length; i++) {
    var index = indices[i]
    var cts = getConstraints(words, index, length)
    try {
      return markov.getMarkovProcess(dylanMatrices, cts)
    } catch (err) {
    }
  }
  return null
}

// function generateSemanticSentence (sense, length) {
//   var mc = getSemanticMarkovProcess(sense, length)
//   return generateSentence(mc)
// }

var perec = {
  getProcess: getSemanticMarkovProcess,
  generate: generateSentence
}

// module.exports = generateSemanticSentence
module.exports = perec
