var perec = require('./perec')

self.onmessage = function (event) {
  self.postMessage(perec.getProcess(event.data, 10))
}
