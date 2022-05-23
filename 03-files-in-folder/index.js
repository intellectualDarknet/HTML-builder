const fs = require('fs');

const directory = '03-files-in-folder/secret-folder';

const buffer = Buffer.from(directory);

fs.readdir(buffer,{withFileTypes: true},(err,files) => {
  if (err) {
    console.log(err.message);
  } else {
    files.forEach((filePath)  => {
      if (filePath.isFile() == true) {
        fs.stat('03-files-in-folder/secret-folder' + '/' + filePath.name,(err,stats) => {
          if (err) throw err;
          console.log(filePath.name.split('.')[0] + ' - ' + filePath.name.split('.')[1] + ' - ' + `${(stats.size / 1000).toFixed(1)}Kb`  );
        });
      }
    });
  }
});
