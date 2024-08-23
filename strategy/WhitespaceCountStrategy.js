class WhitespaceCountStrategy {
    execute(text) {
      const whitespaces = text.match(/\s/g) || [];
      return whitespaces.length;
    }
  }
  
  module.exports = WhitespaceCountStrategy;
  