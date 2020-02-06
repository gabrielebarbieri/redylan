self.onmessage = function (event) {
  var perec = require('./perec')
  if (event.data[0] === 'getProcess') {
    self.postMessage(perec.getProcess(event.data[1], event.data[2]))
  } else if (event.data[0] === 'generateSong') {
    perec.generateSong(event.data[1], event.data[2], self.postMessage)
  } else if (event.data[0] === 'generateMetricVerses') {
    perec.generateMetricVerses(event.data[1], event.data[2], 10, self.postMessage, event.data[3])
  }
}
