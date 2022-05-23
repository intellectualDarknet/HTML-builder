const fs = require('fs');
const { stdout, stdin } = require('process');

process.on('SIGINT', function() {
  process.exit();
});
process.on('exit', () => console.log('Все давай будь'));
stdout.write('Приветствую смертный, Введие ваш текст\n');

fs.access('./02-write-file/text.txt', function(error){
  if (error) {
    fs.writeFile('./02-write-file/text.txt', '', function() {
      stdout.write('Файл создан\n');
    });
  }
  stdin.on('data', data => {
    if(data.toString('utf-8').replace(/\s/g, '') == 'exit') {
      process.exit();
    }
    fs.readFile('./02-write-file/text.txt', (error, readData) => {
      if (error) return console.error(error.message);
      fs.writeFile('./02-write-file/text.txt', readData.toString() + data.toString() , (error) => {
        if (error) return console.error(error.message);
        stdout.write('Текст добавлен\n');
      });
    });
  });
});
