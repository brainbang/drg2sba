[![npm version](https://badge.fury.io/js/drg2sba.svg)](http://badge.fury.io/js/drg2sba)

This program takes a .drg file from I-Doser and converts it to an .sbg SBaGen file.

See it in action [here](http://brainbang.github.io/drg2sba).

The authors of this project have nothing to do with I-Doser, I-Doser is a registered
trademark.

It should work on Windows, Mac, & Linux.

## Features

*  Convert drg file into sbagen format
*  Extract every part of the drg file (description, title, image, sbagen code)


## Installation

You can install this globally so `drg2sba` ends up in your path with this:  `npm install -g drg2sba`. You can add it to a particular project with `npm install --save drg2sba`.


## usage

### command-line

You can get more info with `drg2sba --help`.

#### Extract the description & title as comments in the sbagen file:

`drg2sba drg/Absinthe.drg`

#### Extract the image:

`drg2sba drg/Absinthe.drg --image Absinthe.bmp`

#### Extract all the parts as separate files:

`drg2sba drg/Absinthe.drg -i Absinthe.png -s Absinthe.sba -d Absinthe.txt`

#### Extract all parts to filenames that match for every file in a directory:

`drg2sba -i -s -d drg/*.drg`

Which will make these files in that directory:

-  Absinthe.bmp
-  Absinthe.sba
-  Absinthe.txt


### nodejs, browserify

```javascript
var drg2sba = require('drg2sba');
var sba = drg2sba(drg_file_contents);
```

### requirejs

```javascript
define(['drg2sba', 'text!Absinthe.drg'], function(drg2sba, drg_file_contents){
  var sba = drg2sba(drg_file_contents);
});
```

### no-install regular browser-global

```html
<script src="https://rawgit.com/brainbang/drg2sbg/master/dist/drg2sba.min.js"></script>
<script>
var sba = drg2sba(drg_file_contents);
</script>
```


## Related links

*  [drg2sbg in C](https://github.com/manuel-arguelles/drg2sbg)
*  [Main Engine, the binaural generator](http://uazu.net/sbagen/)
*  [The company who makes the .drg files](http://www.i-doser.com/)
*  [The place to buy good .drg files](http://www.i-doser.com/store/)
*  [The guys who made this possible](http://theidoserblog.blogspot.com/)
*  [Useless blog](http://p4c0.wordpress.com/)
