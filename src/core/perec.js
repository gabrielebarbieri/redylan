var markov = require('./markovchain')
var dylanMatrices = require('./dylan_matrices.json')
var poetryMatrices = require('./poetry_matrices.json')
var similarities = require('./word_similarities.json')
var rhymes = require('./rhymes.json')
var syllables = require('./syllables.json')
var syllableSets = require('./syllable_sets.json')
var rhythms = require('./rhythms.json')
var _ = require('lodash')

// This suppose that the order is the same for either dylan and poetry corpus, is there a better way to do this?
var ORDER = dylanMatrices.length - 1

function generateSentence (markovProcess) {
  return markov.generate(markovProcess, ORDER)
}

function getMatrices (corpus) {
  if (corpus === 'dylan') {
    return dylanMatrices
  }
  if (corpus === 'poetry') {
    return poetryMatrices
  }
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

function getSemanticMarkovProcess (sense, length, corpus) {
  var words = similarities[sense]
  corpus = corpus || 'dylan'
  var matrices = getMatrices(corpus)

  var indices = _.shuffle(_.range(length))
  for (var i = 0; i < length; i++) {
    var index = indices[i]
    var cts = getConstraints(words, index, length)
    try {
      return markov.getMarkovProcess(matrices, cts)
    } catch (err) {
    }
  }
  return null
}

function getRhymingMarkovProcess (rhyme, corpus) {
  var words = rhymes[rhyme]
  corpus = corpus || 'dylan'
  var matrices = getMatrices(corpus)

  var lengths = _.range(8, 20)
  for (var i = 0; i < lengths.length; i++) {
    var length = lengths[i]
    var cts = getConstraints(words, length - 1, length)
    try {
      return markov.getMarkovProcess(matrices, cts)
    } catch (err) {
    }
  }
  return null
}

function generateSong (senses, rhymeScheme, handle, corpus) {
  var length = 10
  var rhymes = {}
  var i = 0
  corpus = corpus || 'dylan'
  var song = _.map(rhymeScheme, function (r) {
    var verse = ''
    if (r !== ' ') {
      var rhyme = rhymes[r]
      if (rhyme === undefined) {
        var sense = senses[i % senses.length]
        i = i + 1
        var sequence = generateSentence(getSemanticMarkovProcess(sense, length, corpus))
        rhymes[r] = getRhyme(sequence)
        verse = represent(sequence)
      } else {
        verse = represent(generateSentence(getRhymingMarkovProcess(rhyme, corpus)))
      }
    }
    handle(verse)
  })
  handle('</s>')
  return song
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

// move to a dedicated file ?

function getMetricMarkovProcess (rhythm, corpus) {
  corpus = corpus || 'dylan'
  var matrices = getMatrices(corpus)

  var cts = [['<s>']]
  for (var k = 0; k < rhythm.length; k++) {
    cts.push(syllableSets[rhythm[k]])
  }
  cts.push(['</s>'])
  return markov.getMarkovProcess(matrices, cts)
}

function generateMetricVerses (seedWord, nOfSyllables, nOfVerses, handle, corpus) {
  corpus = corpus || 'dylan'
  var seedLength = syllables[seedWord]
  var rhythmsToUse = _.shuffle(rhythms[seedLength][nOfSyllables])
  for (var i = 0; i < rhythmsToUse.length; i++) {
    var rhythm = rhythmsToUse[i]
    var positions = _.filter(_.map(rhythm, function (r, index) { if (r === seedLength) return index + 1 }))
    try {
      var process = getMetricMarkovProcess(rhythm, corpus)
      for (var j = 0; j < nOfVerses; j++) {
        var verse = generateSentence(process)
        var pos = _.sample(positions)
        verse[pos] = seedWord
        handle(represent(verse))
      }
      return
    } catch (err) {
    }
  }
}

var perec = {
  getProcess: getSemanticMarkovProcess,
  generate: generateSentence,
  represent: represent,
  convertToGraph: convertToGraph,
  colorSentence: colorSentence,
  words: getWords,
  generateSong: generateSong,
  generateMetricVerses: generateMetricVerses
}

module.exports = perec

// generateSong(['music', 'love'], 'ABAB', console.log)
// generateSong(['music', 'love'], 'ABAB', console.log, 'poetry')
// generateMetricVerses('suburbs', 7, 5, console.log, 'poetry')
