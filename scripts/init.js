import {QueryExecutor} from './queryexecutor.js';

function handleInitialState() {
  const executor = new QueryExecutor();
  executor.handleQuery();
}

handleInitialState();
