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

program.args.map(function(f){
  var data = fs.readFileSync(f);
  var sba = drg2sba(data.toString('binary'));
  
  if (!program.image && !program.sbagen && !program.desc){
    console.log('## ' + sba.title + '\n##\n## ' + sba.description.split('\n').join('\n## ') + '\n\n' + sba.sbagen);
  }else{
    var name = path.basename(f, '.drg');

    if (program.image===true){
      program.image = path.join(path.dirname(f), name + '.bmp');
    }
    if (program.sbagen===true){
      program.sbagen = path.join(path.dirname(f), name + '.sba');
    }
    if (program.desc===true){
      program.desc = path.join(path.dirname(f), name + '.txt');
    }
    
    if (program.image){
      fs.writeFileSync(program.image, atob(sba.image));
    }
    if (program.sbagen){
      fs.writeFileSync(program.sbagen, sba.sbagen);
    }
    if (program.desc){
      fs.writeFileSync(program.desc, sba.description);
    }
  }
});