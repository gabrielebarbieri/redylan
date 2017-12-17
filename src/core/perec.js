var markov = require('./markovchain')
var dylanMatrices = require('./dylan_matrices.json')
var similarities = require('./word_similarities.json')
var rhymes = require('./rhymes.json')
var _ = require('lodash')

var ORDER = dylanMatrices.length - 1

function generateSentence (markovProcess) {
  return markov.generate(markovProcess, ORDER)
}

function represent (sentence) {
  // To display all the words containing punctuation:
  // var re = RegExp('^[a-zA-Z0-9- ]*$')
  // var l = _.filter(_.keys(dylanMatrices[0]['']), w => !re.test(w))
  // console.log(l)

  var re = /[a-zA-Z0-9]/
  var words = _.slice(sentence, 1, -1)
  words[0] = _.capitalize(words[0])
  var res = _.reduce(words, function (result, word) {
    word = word === 'i' ? 'I' : word
    var sep = ' '
    if (!re.test(word.charAt(0)) || word === "n't") sep = ''
    return result + sep + word
  })
  return res
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

function getRhymingMarkovProcess (rhyme) {
  var words = rhymes[rhyme]

  var lengths = _.range(8, 20)
  for (var i = 0; i < lengths.length; i++) {
    var length = lengths[i]
    var cts = getConstraints(words, length - 1, length)
    try {
      return markov.getMarkovProcess(dylanMatrices, cts)
    } catch (err) {
    }
  }
  return null
}

function generateSong (senses, rhymeScheme, handle) {
  var length = 10
  var rhymes = {}
  return _.map(rhymeScheme, function (r, i) {
    var verse = ''
    if (r !== ' ') {
      var rhyme = rhymes[r]
      if (rhyme === undefined) {
        var sense = senses[i % senses.length]
        var sequence = generateSentence(getSemanticMarkovProcess(sense, length))
        rhymes[r] = getRhyme(sequence)
        verse = represent(sequence)
      } else {
        verse = represent(generateSentence(getRhymingMarkovProcess(rhyme)))
      }
    }
    handle(verse)
  })
}

function getRhyme (sentence) {
  var words = _.slice(sentence, 1, -1)
  var re = RegExp('^[a-zA-Z0-9- ]*$')
  for (var i = words.length - 1; i >= 0; i--) {
    var w = words[i]
    if (re.test(w)) return w
  }
}

function locate (index, total) {
  if (total === 1) return 0.5
  return index / (total - 1)
}

function convertToGraph (markovProcess) {
  if (markovProcess === null) return

  var graph = {nodes: [{'label': '<s>', 'x': 0, 'y': 0.5}], links: []}
  var nodes = graph.nodes
  for (var i = 1; i < markovProcess.length - 1; i++) {
    var matrix = markovProcess[i]
    var targetToLink = {}
    var links = _.flatten(_.map(nodes, function (node) {
      var prefix = node.label
      var suffixes = _.keys(matrix[prefix])
      node.links = {}
      return _.map(suffixes, function (suffix) {
        var transition = _.concat(_.split(prefix, ','), suffix)
        var target = _.join(_.takeRight(transition, ORDER), ',')
        var link = {'source': node, 'label': target, 'value': matrix[prefix][suffix], 'selected': false}
        node.links[target] = link
        targetToLink[target] === undefined ? targetToLink[target] = [link] : targetToLink[target].push(link)
        return link
      })
    }))

    var targets = _.keys(targetToLink)
    nodes = _.map(targets, function (target, j) {
      var node = {'label': target, 'x': locate(i, markovProcess.length), 'y': locate(j, targets.length)}
      _.map(targetToLink[target], function (link) { link.target = node })
      return node
    })

    graph.links = _.concat(graph.links, links)
    graph.nodes = _.concat(graph.nodes, nodes)
  }
  _.map(graph.links, function (link, id) {
    link.id = id
    link.x0 = link.source.x
    link.y0 = link.source.y
    link.x1 = link.target.x
    link.y1 = link.target.y
  })
  graph.width = 960
  graph.height = 200
  return graph
}

function colorSentence (graph, sentence) {
  if (graph === undefined || graph === null) return
  console.log(sentence)
  _.map(graph.links, function (link) { link.selected = false })
  if (sentence === undefined || sentence === null) return
  var node = graph.nodes[0]
  for (var i = 2; i < sentence.length; i++) {
    var words = _.takeRight(_.take(sentence, i), ORDER)
    var link = node.links[words]
    link.selected = true
    node = link.target
  }
}

function getWords () {
  return _.map(_.keys(similarities), (word) => ({'value': word}))
}

var perec = {
  getProcess: getSemanticMarkovProcess,
  generate: generateSentence,
  represent: represent,
  convertToGraph: convertToGraph,
  colorSentence: colorSentence,
  words: getWords,
  generateSong: generateSong
}

module.exports = perec

// generateSong(['music', 'love'], 'ABAB CDCD EFEF', console.log)
