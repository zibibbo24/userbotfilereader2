const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');
const WordCountStrategy = require('./strategy/WordCountStrategy');
const LetterCountStrategy = require('./strategy/LetterCountStrategy');
const WhitespaceCountStrategy = require('./strategy/WhitespaceCountStrategy');
const RepeatedWordsCountStrategy = require('./strategy/RepeatedWordsCountStrategy');
const CountContext = require('./context/CountContext');


function readFileFromUrl(url, callback) {
  const client = url.startsWith('https') ? https : http;
  client.get(url, (res) => {
    let data = '';

    res.on('data', (chunk) => {
      data += chunk;
    });

    res.on('end', () => {
      callback(null, data);
    });
  }).on('error', (err) => {
    callback(err);
  });
}


function readFileFromPath(filePath, callback) {
  fs.readFile(path.resolve(filePath), 'utf8', (err, data) => {
    if (err) {
      callback(err);
    } else {
      callback(null, data);
    }
  });
}


const input = process.argv[2];

if (!input) {
  console.error('Errore: specifica il percorso del file o l\'URL come argomento.');
  process.exit(1);
}

const isUrl = input.startsWith('http://') || input.startsWith('https://');

const readFile = isUrl ? readFileFromUrl : readFileFromPath;

readFile(input, (err, data) => {
  if (err) {
    console.error('Errore durante la lettura del file:', err);
    return;
  }

  
  const strategies = {
    wordCount: new WordCountStrategy(),
    letterCount: new LetterCountStrategy(),
    whitespaceCount: new WhitespaceCountStrategy(),
    repeatedWordsCount: new RepeatedWordsCountStrategy()
  };

  const context = new CountContext(strategies.wordCount);
  const wordCount = context.executeStrategy(data);
  
  context.setStrategy(strategies.letterCount);
  const letterCount = context.executeStrategy(data);
  
  context.setStrategy(strategies.whitespaceCount);
  const whitespaceCount = context.executeStrategy(data);
  
  context.setStrategy(strategies.repeatedWordsCount);
  const repeatedWords = context.executeStrategy(data);
  
  console.log(`Il numero di parole nel file è: ${wordCount}`);
  console.log(`Il numero di lettere nel file è: ${letterCount}`);
  console.log(`Il numero di spazi bianchi nel file è: ${whitespaceCount}`);
  console.log('Le parole che si ripetono più di 10 volte sono:');
  console.log(repeatedWords);
});
