var _ = require('lodash')
var PD = require('probability-distributions')

function computeAlphas (matrix) {
  return _.mapValues(matrix, probabilities => _.sum(_.values(probabilities)))
}

function normalizeValues (values, alpha) {
  return _.mapValues(values, v => v / alpha)
}

function normalize (matrix, alphas) {
  if (alphas === undefined) {
    alphas = computeAlphas(matrix)
  }
  return _.mapValues(matrix, (probabilities, prefix) =>
    normalizeValues(probabilities, alphas[prefix])
  )
}

function update (matrix, prefix, suffix) {
  if (matrix[prefix] === undefined) {
    matrix[prefix] = {}
  }

  if (matrix[prefix][suffix] === undefined) {
    matrix[prefix][suffix] = 0
  }
  matrix[prefix][suffix] += 1
}

function getTransitionMatrix (sequence, order = 1) {
  var m = {}
  // var sequence = _.map(seq, w => _.replace(w, /\./g, '*'))
  for (var index = order; index < sequence.length; index++) {
    var prefix = sequence.slice(index - order, index)
    var suffix = sequence[index]
    update(m, prefix, suffix)
  }
  return m
}

function mergeTransitionProbabilities (probabilities1, probabilities2) {
  // Here the undefined return in the lambda sum is needed by mergeWith to work properly
  return _.mergeWith(
    probabilities1,
    probabilities2,
    (v1, v2) => (v1 ? v1 + v2 : undefined)
  )
}

function mergeTransitionMatrix (matrix1, matrix2) {
  return _.mergeWith(matrix1, matrix2, mergeTransitionProbabilities)
}

function parseSequencesForOrder (sequences, order) {
  var matrix = _.map(sequences, seq => getTransitionMatrix(seq, order)).reduce(
    mergeTransitionMatrix
  )
  return normalize(matrix)
}

function parseSequences (sequences, maxOrder) {
  return _.range(maxOrder + 1).map(order =>
    parseSequencesForOrder(sequences, order)
  )
}

function filterValues (matrix, values) {
  if (values === null || values === undefined) {
    return matrix
  }

  var filtered = {}

  for (let prefix in matrix) {
    let probabilities = matrix[prefix]
    var filteredProbabilities = {}
    for (let suffix in probabilities) {
      if (values.indexOf(suffix) > -1) {
        filteredProbabilities[suffix] = probabilities[suffix]
      }
    }
    if (!_.isEmpty(filteredProbabilities)) {
      filtered[prefix] = filteredProbabilities
    }
  }
  return filtered
}

function selectAlpha (suffix, prefix, alphas) {
  var split = _.split(prefix, ',')
  var index = _.tail(split)
  index.push(suffix)

  if (!(index in alphas)) {
    // Maybe is back-propagating to a smaller order, try to use the whole prefix as index
    index = split
    index.push(suffix)
  }

  return alphas[index]
}

function updateProbabilities (probabilities, prefix, alphas) {
  var updated = _.mapValues(
    probabilities,
    (value, suffix) => value * selectAlpha(suffix, prefix, alphas)
  )
  return _.omitBy(updated, _.isNaN)
}

function propagateAlphas (matrix, alphas) {
  if (alphas === undefined || alphas === null) {
    return matrix
  }
  var updated = _.mapValues(matrix, (probabilities, prefix) =>
    updateProbabilities(probabilities, prefix, alphas)
  )
  return _.omitBy(updated, _.isEmpty)
}

function getMarkovProcess (matrices, constraints) {
  var alphas
  var maxOrder = matrices.length - 1
  var markovProcess = []
  for (var index = constraints.length - 1; index >= 0; index--) {
    var values = constraints[index]
    var matrix = matrices[_.min([index, maxOrder])]
    var filtered = propagateAlphas(filterValues(matrix, values), alphas)
    if (_.isEmpty(filtered)) {
      throw new Error(
        'The constraints satisfaction problem has no solution. Try to relax your constraints'
      )
    }
    alphas = computeAlphas(filtered)
    markovProcess.unshift(normalize(filtered, alphas))
  }
  return markovProcess
}

function sample (probabilities) {
  return PD.sample(_.keys(probabilities), 1, true, _.values(probabilities))[0]
}

function generate (markovProcess, order) {
  var sequence = []
  for (var index = 0; index < markovProcess.length; index++) {
    var matrix = markovProcess[index]
    var prefix = _.takeRight(sequence, _.min([index, order]))
    var probabilities = matrix[prefix]
    sequence.push(sample(probabilities))
  }
  return sequence
}

var markov = {
  parseSequences: parseSequences,
  getMarkovProcess: getMarkovProcess,
  generate: generate
}

module.exports = markov
