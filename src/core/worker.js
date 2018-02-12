var perec = require('./perec')

self.onmessage = function (event) {
  console.log(event)
  if (event.data[0] === 'getProcess') {
    self.postMessage(perec.getProcess(event.data[1], 10))
  } else if (event.data[0] === 'generateSong') {
    perec.generateSong(['music', 'love'], 'ABAB CDCD EFEF', self.postMessage)
  }
}
