class RepeatedWordsCountStrategy {
    execute(text) {
      const wordArray = text.trim().toLowerCase().split(/\s+/);
      const wordCount = {};
  
      wordArray.forEach(word => {
        word = word.replace(/[^a-zA-Z]/g, '');
        if (word) {
          wordCount[word] = (wordCount[word] || 0) + 1;
        }
      });
  
      const repeatedWords = {};
      for (const word in wordCount) {
        if (wordCount[word] > 10) {
          repeatedWords[word] = wordCount[word];
        }
      }
  
      return repeatedWords;
    }
  }
  
  module.exports = RepeatedWordsCountStrategy;
  