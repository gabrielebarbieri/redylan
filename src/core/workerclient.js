var Worker = require('worker-loader!@/core/worker')

var worker = new Worker()

worker.generateMarkovProcess = message =>
  new Promise((resolve, reject) => {
    worker.onmessage = event => {
      resolve(event.data)
    }
    worker.onerror = e => {
      console.error(`Error: Line ${e.lineno} in ${e.filename}: ${e.message}`)
      reject(e)
    }
    console.log(message)
    worker.postMessage(['getProcess', message])
  })

worker.generateSong = function (callback) {
  worker.onmessage = event => {
    callback(event.data)
  }
  worker.onerror = e => {
    console.error(`Error: Line ${e.lineno} in ${e.filename}: ${e.message}`)
  }
  worker.postMessage(['generateSong', 'message'])
}

export default worker
