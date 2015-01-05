/**
 * Convert idoser drg file to sbagen & image 
 * totally ripped from https://github.com/manuel-arguelles/drg2sbg and converted to js
 */

var atob = require('atob');

function drg_get_uncoded_data(data_encoded){
    // base64 decode to byte codes
    var data = atob(data_encoded).toString('binary').split('').map(function(c){ return c.charCodeAt(0); });

    // console.log('encrypted:', data);

    var S = [
         22, 213, 140,  67, 234,  48, 108, 225,   6, 101, 194,  50,  44, 247,
         58, 145,  20,  80, 241,  60, 127, 154, 125,  33,  45, 166, 245,  84,
         28, 110, 220,  56, 195, 181, 238, 109,  69, 216,  31, 162,  61, 183,
         74,  71, 129, 148, 170, 111, 137, 164, 179, 178,   9,  41, 160, 219,
         77,  93,  97, 143,  14, 158, 118, 152,   0, 221, 192, 116,  86,  65,
         55, 173, 217,  32, 227, 119, 102, 115, 254, 132,  95,  23,  49,  73,
        211, 142,  66,  59,  85, 252, 138, 212, 243,  38, 134, 165, 184,  13,
        209, 124, 197, 141, 114,  43,  92, 133, 175, 205, 128,  68,  91, 104,
         64, 126,  39,  40,  46,  72, 139, 232, 182,   2, 131, 201, 188, 112,
        200,  78, 159, 113, 237,  99, 249,  90,   7,  47, 122,  36,  76, 117,
        222, 149,  96,  82, 100, 208, 151, 198, 228,  94,  87, 190,  42, 246,
         10, 169, 171, 120,  51, 236, 255, 215, 191, 223,  54, 103,  89, 135,
         57,  98, 176, 161,  24, 235,  26,   3, 250, 233, 121,  79, 207, 242,
        224,  11, 123, 193, 155, 157, 218, 186, 244,  75, 167,  63, 206,  81,
         29, 150, 229,   4,  15, 230,  37, 185,   1, 203,  35,  16, 136, 204,
        144, 253, 214, 168,  27, 189, 105, 231, 177,  18,  25,  52,  70,  88,
        196, 210, 163, 239, 156,  19,  34,  17, 202,  30,  21,  62, 147, 174,
        240, 130,   8, 180, 106, 172,  83,  12, 146, 251, 226,  53, 153, 107,
        199, 248, 187, 5
    ];

    var b,i=0,j=0,temp,s,out=[];

    for (b = 0; b < data.length; b++) {
        i = (i +1) % 256;
        j = (j + S[i]) % 256;
        temp = S[i];
        S[i] = S[j];
        S[j] = temp;
        s=S[i] + S[j];
        out[b] = String.fromCharCode(data[b] ^ S[s % 256]);
        // console.log(b, i, j, S[i], S[j], s, data[b], out[b]);
    }

    return out.join('');
}

function drgtosbg(fstring){
	// header is seperated by '\n', '\r', or '@'
	// rest is split by '@'
	var hi = fstring.search(/[\n\r@]/);
	var other = fstring.substr(hi).split('@');

	var out = {
		header: drg_get_uncoded_data(fstring.substr(0, hi)),
		title: drg_get_uncoded_data(other[0]),
		image: drg_get_uncoded_data(other[1]),
		description: drg_get_uncoded_data(other[2]),
		sbagen: drg_get_uncoded_data(other[3]),
	};

    return out;
}

if (module) module.exports = drgtosbg;
