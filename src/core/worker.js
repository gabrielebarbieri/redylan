var perec = require('./perec')

self.onmessage = function (event) {
  console.log(event)
  self.postMessage(perec.getProcess(event.data, 10))
}
