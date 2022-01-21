const {SolanaDomainConverter} = require('./solanadomainconverter.js');

class AddressResolver {
  constructor(hash, env) {
    this.hash = hash;
    this.env = env;
  }

  async getDestinationURL() {
    if (!this.attemptedToResolve) {
      await this.resolve_();
    }
    return this.url;
  }

  async resolve_() {
    if (this.attemptedToResolve) {
      return;
    }
    this.attemptedToResolve = true;
    const coinType = getCoinTypeForHash_(this.hash);
    switch (coinType) {
      case COIN_TYPE.ETHEREUM:
        this.resolveEthereumAddr_();
        return;
      case COIN_TYPE.SOLANA:
      default:
        await this.resolveSolanaAddr_();
        return;
    }
  }

  resolveEthereumAddr_() {
    this.url = etherscanURL_(`address/${this.hash}`, this.env);
  }

  async resolveSolanaAddr_() {
    let address = this.hash;
    if (this.hash.includes('.sol')) {
      address = await (new SolanaDomainConverter(this.hash, this.env))
        .toWalletAddress();
    }
    this.url = solScanURL_(`account/${address}`, this.env);
  }
}

function getCoinTypeForHash_(hash) {
  if (hash.startsWith('0x') || hash.includes('.eth')) {
    return COIN_TYPE.ETHEREUM;
  }
  return COIN_TYPE.SOLANA;
}

function solScanURL_(path, env) {
  if (env === 'devnet' || env === 'testnet') {
    return `https://solscan.io/${path}?cluster=${env}`;
  }
  return `https://solscan.io/${path}`;
}

function etherscanURL_(path, env) {
  const testNets = ['ropsten', 'kovan', 'goerli', 'rinkeby'];
  if (env && testNets.includes(env)) {
    return `https://${env}.etherscan.io/${path}`;
  }
  return `https://etherscan.io/${path}`;
}

const COIN_TYPE = {
  'ETHEREUM' : 1,
  'SOLANA': 2,
};

export {
  AddressResolver,
};
