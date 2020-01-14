var perec = require('./perec')

self.onmessage = function (event) {
  if (event.data[0] === 'getProcess') {
    self.postMessage(perec.getProcess(event.data[1], event.data[2]))
  } else if (event.data[0] === 'generateSong') {
    perec.generateSong(event.data[1], event.data[2], self.postMessage)
  } else if (event.data[0] === 'generateMetricVerses') {
    perec.generateMetricVerses(event.data[1], event.data[2], 1, self.postMessage)
  }
}
