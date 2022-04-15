const fs = require('fs');

module.exports = {
  RandomLine: (filename, callback, pattern = null, casesensitive = true) => {
    fs.readFile(filename, 'utf-8', (err, data) => {

      if (err) throw err;
      var lines = data.split('\n')

      if(!pattern) {
        var linia = lines[Math.floor(Math.random() * lines.length)]
      } 
      else {
        let newtab = []

        if(!casesensitive) {
          for(let i = 0; i <= lines.length - 1; i++) {
            if((lines[i].toLowerCase()).includes(pattern.toLowerCase())){
              newtab.push(lines[i])
            }
          }
        } else if (casesensitive) {
          for(let i = 0; i <= lines.length - 1; i++) {
            if(lines[i].includes(pattern)){
              newtab.push(lines[i])
            }
          }
        }
        var linia = newtab[Math.floor(Math.random() * newtab.length)]
      };
      callback(linia)
    })
  },
}