const fs = require('fs');
const {readdir} = require('fs/promises');
const fromWhereabouts = '06-build-page/styles/';
const components = '06-build-page/components';
let template = '';

createUnitefile();
createIndex();
copy('06-build-page/assets','06-build-page/project-dist/assets');

function createUnitefile() {
  fs.mkdir('06-build-page/project-dist',{recursive: true},(error) => {
    if (error) console.error(error.message);
    (async function unifyCss() {
      const writeStream = fs.createWriteStream('06-build-page/project-dist/style.css');
      try {
        let files = await readdir(fromWhereabouts, { withFileTypes: true });
        for (let file of files) {
          if (file.isFile() && /\.css$/.test(file.name)) {
            fs.createReadStream(fromWhereabouts + '/' + file.name).pipe(
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

function copy(directory,dest) {
  fs.mkdir('06-build-page/project-dist',{recursive: true},(error) => {
    if (error) console.error(error.message);
    fs.mkdir(dest,{recursive: true},(error) => {
      if (error) console.error(error.message);
      fs.readdir(directory,{withFileTypes: true},(err,files) => {
        if (err) {
          console.log(err.message);
        } else {
          files.forEach((file) => {
            if(!file.isFile()) {
              copy(directory + '/'+ file.name,dest + '/' + file.name);
            } else {
              fs.copyFile(directory + '/'+ file.name,dest +'/'+ file.name,(error) => {
                if (error) console.error(error.message);
              });
            }
          });
        }
      });
    });
  }); 
}

function createIndex() {
  fs.mkdir('06-build-page/project-dist',{recursive: true},(error) => {
    if (error) console.error(error.message);
    let readHtml = fs.createReadStream('06-build-page/template.html');
    readHtml.on('data',(chunk)=> template += chunk);
    readHtml.on('end',function() {
      (async function unifyCss() {
        try {
          let files = await readdir(components, { withFileTypes: true });
          for (let file of files) {
            let indexStream = fs.createReadStream(components + '/' + file.name);
            let index = '';
            indexStream.on('data',(chunk) => index += chunk);
            indexStream.on('end', function() {
              let equality = '{{' + file.name.split('.')[0] + '}}';
              
              if (template.includes(equality)) {
                template = template.replace(equality,index);
                fs.writeFile('06-build-page/project-dist' + '/'+ 'index.html',template.toString(),(err) => {
                  if (err) console.error(err.message);
                });
              } else null;
            });
          }
          
        } catch (error) {
          console.log('Ты попутал', error.message);
        }
      })();
    });
  });
}