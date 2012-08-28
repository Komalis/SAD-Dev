// ==UserScript==
// @name        SAD
// @description Search and Destroy
// @include     http://craftinor.forumjv.com/0-79351-0-1-0-1-0-0.htm
// @include     http://www.jeuxvideo.com/forums/*
// @version     1.0.0
// ==/UserScript==

//var url = 'https://raw.github.com/Komalis/SAD-Dev/master/SAD/';
var url = 'http://localhost/';
var script = document.createElement('script');
script.src = url + 'SAD.js';
document.head.appendChild(script);

delete script;