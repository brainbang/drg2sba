#!/usr/bin/env node

var program = require('commander');
var pkg = require('./package.json');
var drg2sba = require('./index.js');
var fs = require('fs');
var path = require('path');
var atob = require('atob');

program
  .version(pkg.version)
  .usage('<file ...> [options]')
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
  fs.readFile(f, function(err, data){
    if (err){
      console.error(err);
      process.exit(1);
    }
    var name = path.basename(f, '.drg');
    var sba = drg2sba(data.toString('binary'));
  
    if (!program.image && !program.sbagen && !program.desc){
      console.log('## ' + sba.title + '\n##\n## ' + sba.description.split('\n').join('\n## ') + '\n\n' + sba.sbagen);
    }else{
      var image = (program.image===true) ? path.join(path.dirname(f), name + '.bmp') : program.image;
      if (image){
        console.log('writing', image);
        fs.writeFileSync(image, atob(sba.image));
      }
      
      var sbagen = (program.sbagen===true) ? path.join(path.dirname(f), name + '.sba') : program.sbagen;
      if (sbagen){
        console.log('writing', sbagen);
        fs.writeFileSync(sbagen, sba.sbagen);
      }

      var desc = (program.desc===true) ? path.join(path.dirname(f), name + '.txt') : program.desc;
      if (desc){
        console.log('writing', desc);
        fs.writeFileSync(desc, sba.description);
      }
    }
  });
});