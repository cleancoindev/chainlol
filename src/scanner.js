function solScanURL(path, env) {
  if (env === 'devnet' || env === 'testnet') {
    return `https://solscan.io/${path}?cluster=${env}`;
  }
  return `https://solscan.io/${path}`;
}

function etherScanURL(path, env) {
  const testNets = ['ropsten', 'kovan', 'goerli', 'rinkeby'];
  if (env && testNets.includes(env)) {
    return `https://${env}.etherscan.io/${path}`;
  }
  return `https://etherscan.io/${path}`;
}

export {
  etherScanURL,
  solScanURL,
};
