const {QueryExecutor} = require('./queryexecutor.js');

async function handleInitialState() {
  const executor = new QueryExecutor();
  await executor.handleQuery();
}

handleInitialState();
