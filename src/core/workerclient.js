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
    console.log(message)
    markovProcessWorker.postMessage(['getProcess', message])
  })

var songWorker = new Worker()

songWorker.generate = function (handleVerse, handleEnding) {
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
  songWorker.postMessage(['generateSong', 'message'])
}

export {markovProcessWorker, songWorker}
