/*
 * base64.js - Base64 encoding and decoding functions
 *
 * See: http://developer.mozilla.org/en/docs/DOM:window.btoa
 *      http://developer.mozilla.org/en/docs/DOM:window.atob
 *
 * Copyright (c) 2007, David Lindquist <david.lindquist@gmail.com>
 * Released under the MIT license
 */

if (typeof atob == 'undefined') {
    function atob(str) {
        var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
        var invalid = {
            strlen: (str.length % 4 != 0),
            chars:  new RegExp('[^' + chars + ']').test(str),
            equals: (/=/.test(str) && (/=[^=]/.test(str) || /={3}/.test(str)))
        };
        if (invalid.strlen || invalid.chars || invalid.equals)
            throw new Error('Invalid base64 data');
        var decoded = [];
        var c = 0;
        while (c < str.length) {
            var i0 = chars.indexOf(str.charAt(c++));
            var i1 = chars.indexOf(str.charAt(c++));
            var i2 = chars.indexOf(str.charAt(c++));
            var i3 = chars.indexOf(str.charAt(c++));
            var buf = (i0 << 18) + (i1 << 12) + ((i2 & 63) << 6) + (i3 & 63);
            var b0 = (buf & (255 << 16)) >> 16;
            var b1 = (i2 == 64) ? -1 : (buf & (255 << 8)) >> 8;
            var b2 = (i3 == 64) ? -1 : (buf & 255);
            decoded[decoded.length] = String.fromCharCode(b0);
            if (b1 >= 0) decoded[decoded.length] = String.fromCharCode(b1);
            if (b2 >= 0) decoded[decoded.length] = String.fromCharCode(b2);
        }
        return decoded.join('');
    }
}
