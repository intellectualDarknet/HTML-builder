const fs = require('fs');

let info = '';

let readableStream = fs.createReadStream('./01-read-file/text.txt','utf-8');
readableStream.on('data', part => info += part);
readableStream.on('end', () => {
  console.log('End', info);
});