class CountContext {
    constructor(strategy) {
      this.strategy = strategy;
    }
  
    setStrategy(strategy) {
      this.strategy = strategy;
    }
  
    executeStrategy(text) {
      return this.strategy.execute(text);
    }
  }
  
  module.exports = CountContext;