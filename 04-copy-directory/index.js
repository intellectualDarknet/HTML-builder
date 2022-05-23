const fs = require('fs');
let array = [];
fs.mkdir('04-copy-directory/files-copy',{recursive: true},(error) => {
  if (error) console.error(error.message);
});

fs.readdir('04-copy-directory/files',{withFileTypes: true},(err,files) => {
  if (err) {
    console.log(err.message);
  } else {
    files.forEach((files) => {
      array.push(files.name);
      let fullPath = '';
      fullPath = '04-copy-directory/files' + '/' + files.name;
      
      fs.copyFile(fullPath, '04-copy-directory/files-copy/' + `${files.name}`,(error) => {
        if (error) console.error(error.message);
        console.log('Created     '+   '/files-copy/' + `${files.name}`,);
      });
    });
    fs.readdir('04-copy-directory/files-copy',{withFileTypes: true},(err,files) => {
      if (err) {console.error(err.message);
      } else {
    
        files.forEach((file) => {
          if (!array.includes(file.name)) {
            fs.unlink('04-copy-directory/files-copy/' + `${file.name}`, function(err){
              if (err) {
                console.log(err);
              } else {
                console.log('Файл удалён   ' + `${file.name}`);
              }
            });
          }
        });
      }
    });
  }

});
