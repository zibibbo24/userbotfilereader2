class WordCountStrategy {
    execute(text) {
      const words = text.trim().split(/\s+/);
      return words.length;
    }
  }
  
  module.exports = WordCountStrategy;
  