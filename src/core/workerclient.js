var Worker = require('worker-loader!@/core/worker')

var worker = new Worker()

worker.post = message =>
  new Promise((resolve, reject) => {
    worker.onmessage = event => {
      console.log(event)
      resolve(event.data)
    }
    worker.onerror = e => {
      console.error(`Error: Line ${e.lineno} in ${e.filename}: ${e.message}`)
      reject(e)
    }
    worker.postMessage(message)
  })

export default worker
