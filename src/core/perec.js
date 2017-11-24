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

function locate (index, total) {
  if (total === 1) return 0.5
  return index / (total - 1)
}

function convertToD3 (markovProcess) {
  if (markovProcess === null) return
  var graph = {nodes: [{'id': '<s>', 'x': 0, 'y': 0.5}], links: []}
  var nodes = graph.nodes
  for (var i = 1; i < markovProcess.length - 1; i++) {
    var matrix = markovProcess[i]

    var links = _.flatten(_.map(nodes, function (node) {
      var prefix = node.id
      var suffixes = _.keys(matrix[prefix])
      return _.map(suffixes, function (suffix) {
        var transition = _.concat(_.split(prefix, ','), suffix)
        var target = _.join(_.takeRight(transition, ORDER), ',')
        return {'source': prefix, 'target': target, 'value': matrix[prefix][suffix]}
      })
    }))
    graph.links = _.concat(graph.links, links)

    var nodeIds = _.uniq(_.map(links, link => link.target))
    nodes = _.map(nodeIds, function (node, j) {
      return {'id': node, 'x': locate(i, markovProcess.length), 'y': locate(j, nodeIds.length)}
    })
    graph.nodes = _.concat(graph.nodes, nodes)
  }
  var ids = _.fromPairs(_.map(graph.nodes, node => [node.id, node]))
  _.map(graph.links, function (link, id) {
    var source = ids[link.source]
    var target = ids[link.target]
    link.id = id
    link.x0 = source.x
    link.y0 = source.y
    link.x1 = target.x
    link.y1 = target.y
  })
  return graph
}

var perec = {
  getProcess: getSemanticMarkovProcess,
  generate: generateSentence,
  convertToD3: convertToD3
}

module.exports = perec
