const fs = require('fs');
const {readdir} = require('fs/promises');


createUnitefile();


function createUnitefile() {
  fs.mkdir('05-merge-styles/project-dist',{recursive: true},(error) => {
    if (error) console.error(error.message);
    (async function unifyCss() {
      const writeStream = fs.createWriteStream('05-merge-styles/project-dist/bundle.css');
      try {
        let files = await readdir('05-merge-styles/styles', { withFileTypes: true });
        for (let file of files) {
          if (file.isFile() && /\.css$/.test(file.name)) {
            fs.createReadStream('05-merge-styles/styles' + '/' + file.name).pipe(
              writeStream
            );
          } else null;
        }
      } catch (error) {
        console.log('Ты попутал', error.message);
      }
    }());
  });
}
