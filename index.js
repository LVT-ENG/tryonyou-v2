const agents = require('./agents');

// Example usage: output available agents and instructions
console.log('Available agents:', Object.keys(agents));
console.log('Deploy instructions:', agents.deployScriptMaster.instructions);
