/*
IO Streams and Piping by Moose
Run in terminal:
// node scraping.js https://www.imdb.com/chart/top '.titleColumn a' | node numberlines.js 
 */"use strict";

var readline = require('readline'); // Built-in node package
var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout 
});

var arr = [];
rl.on('line', line => { // Runs everytime new line is read from stdin
  arr.push(line);
})

rl.on('close', line => { // Runs when program ends ^C
  arr.sort();
  arr.map(s => console.log(s));
})