This program takes a .drg file from I-Doser and converts it to an .sbg SBaGen file.

The authors of this project have nothing to do with I-Doser, I-Doser is a registered
trademark.

This project does not supports piracy or any illegal action, the use of this product 
must be strictly to pass .drg files to .sbg for later conversion to .wav or similar 
portable format. It should work on Windows, Mac, & Linux.

## Features

*  Convert drg file into sbagen format
*  Extract every part of the drg file (description, title, image, sbagen code)
*  Create drg files


## Installation

You can install this globally so `drg2sba` ends up in your path with this:  `npm install -g drg2sba`. You can add it to a particular project with `npm install --save drg2sba`.


## usage

### command-line

You can get more info with `drg2sba --help`.

Extract the description & title as comments in the sbagen file:

`drg2sba Absinthe.drg`

Extract the image:

`drg2sba Absinthe.drg --image Absinthe.bmp`

Extract all the parts as separate files:

`drg2sba Absinthe.drg -i Absinthe.png -s Absinthe.sba -d Absinthe.txt`

Extract all parts to filenames that match for very file in a directory:

`drg2sba ~/Desktop/Dose\ Files/*.drg -i -s -d`

Which will make these files in that directory:

-  Absinthe.bmp
-  Absinthe.sba
-  Absinthe.txt


### browserify, CommonJS

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
<script src="https://rawgit.com/konsumer/drg2sbg/master/dist/drg2sba.min.js"></script>
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
