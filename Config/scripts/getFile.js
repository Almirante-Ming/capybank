const fs = require('fs');

const getFile = (filename, sucess, error) => {
   fs.readFile(filename, function(err, data) {
       if (err) {            
            error(err);
        } else {
           sucess(data);
        }
   })
}

module.exports = getFile