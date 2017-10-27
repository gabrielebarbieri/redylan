var generate = require('./perec')

self.onmessage = function (event) {
  self.postMessage(generate(event.data, 10, 1))
}
