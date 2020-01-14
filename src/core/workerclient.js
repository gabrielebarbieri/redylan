var Worker = require('worker-loader!@/core/worker')

var markovProcessWorker = new Worker()

markovProcessWorker.generate = message =>
  new Promise((resolve, reject) => {
    markovProcessWorker.onmessage = event => {
      resolve(event.data)
    }
    markovProcessWorker.onerror = e => {
      console.error(`Error: Line ${e.lineno} in ${e.filename}: ${e.message}`)
      reject(e)
    }
    markovProcessWorker.postMessage(['getProcess', message, 10])
  })

var songWorker = new Worker()

songWorker.generate = function (senses, rhymes, handleVerse, handleEnding) {
  songWorker.onmessage = event => {
    if (event.data !== '</s>') {
      handleVerse(event.data)
    } else if (handleEnding !== undefined) {
      handleEnding()
    }
  }
  songWorker.onerror = e => {
    console.error(`Error: Line ${e.lineno} in ${e.filename}: ${e.message}`)
  }
  songWorker.postMessage(['generateSong', senses, rhymes])
}

var metricWorker = new Worker()

metricWorker.generate = function (seedWord, nOfSyllables, handleVerse, handleEnding) {
  metricWorker.onmessage = event => {
    if (event.data !== '</s>') {
      handleVerse(event.data)
    } else if (handleEnding !== undefined) {
      handleEnding()
    }
  }
  metricWorker.onerror = e => {
    console.error(`Error: Line ${e.lineno} in ${e.filename}: ${e.message}`)
  }
  metricWorker.postMessage(['generateMetricVerses', seedWord, nOfSyllables])
}

export {markovProcessWorker, songWorker, metricWorker}
