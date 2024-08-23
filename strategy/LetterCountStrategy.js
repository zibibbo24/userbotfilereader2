class LetterCountStrategy {
    execute(text) {
      const letters = text.replace(/[^a-zA-Z]/g, '');
      return letters.length;
    }
  }
  
  module.exports = LetterCountStrategy;
  