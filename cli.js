#!/usr/bin/env node

var program = require('commander');
var pkg = require('./package.json');
var drg2sba = require('./index.js');
var fs = require('fs');
var path = require('path');
var atob = require('atob');

program
  .version(pkg.version)
  .usage('[options] <file ...>')
  .option('-i, --image [filename]', 'extract just the image')
  .option('-s, --sbagen [filename]', 'extract just the sbagen program')
  .option('-d, --desc [filename]', 'extract just the description text')
  .parse(process.argv);

if (!program.args.length){
  console.log('You must specify at least 1 DRG file.');
  program.outputHelp();
  process.exit(1);
}

program.args.forEach(function(f){
  fs.readFile(f, function(err, data){
    var fname = path.basename(f, '.drg');

    if (err){
      console.error(err);
      process.exit(1);
    }

    var sba = drg2sba(data.toString('binary'));
  
    if (!program.image && !program.sbagen && !program.desc){
      console.log('## ' + sba.title + '\n##\n## ' + sba.description.split('\n').join('\n## ') + '\n\n' + sba.sbagen);
    }else{
      if (program.image===true){
        program.image = path.join(path.dirname(f), fname + '.bmp');
      }
      if (program.sbagen===true){
        program.sbagen = path.join(path.dirname(f), fname + '.sba');
      }
      if (program.desc===true){
        program.desc = path.join(path.dirname(f), fname + '.txt');
      }
      
      if (program.image){
        console.log('writing', program.image);
        fs.writeFileSync(program.image, atob(sba.image));
      }
      if (program.sbagen){
        console.log('writing', program.sbagen);
        fs.writeFileSync(program.sbagen, sba.sbagen);
      }
      if (program.desc){
        console.log('writing', program.desc);
        fs.writeFileSync(program.desc, sba.description);
      }
    }
  });
});