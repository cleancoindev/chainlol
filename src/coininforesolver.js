function resolveCoinURL(name) {
  if (!name) {
    return 'https://www.coingecko.com';
  }

  if (name.startsWith('$')) {
    name = name.substring(1);
  }
  const link = COIN_GECKO_SYMBOL_MAP[name.toLowerCase()];
  if (link) {
    name = link;
  }
  return `https://www.coingecko.com/en/coins/${name}`;
}

// Top 100 CoinGecko coins. Hardcoded to provide fast lookups.
const COIN_GECKO_SYMBOL_MAP = {
  'btc': 'bitcoin',
  'eth': 'ethereum',
  'bnb': 'binance-coin',
  'usdt': 'tether',
  'sol': 'solana',
  'ada': 'cardano',
  'usdc': 'usd-coin',
  'dot': 'polkadot',
  'doge': 'dogecoin',
  'luna': 'terra-luna',
  'terra': 'terra-luna',
  'avax': 'avalanche',
  'shib': 'shiba-inu',
  'cro': 'crypto-com-coin',
  'wbtc': 'wrapped-bitcoin',
  'matic': 'polygon',
  'ltc': 'litecoin',
  'busd': 'binance-usd',
  'algo': 'algorand',
  'link': 'chainlink',
  'bch': 'bitcoin-cash',
  'uni': 'uniswap',
  'axs': 'axie-infinity',
  'xlm': 'stellar',
  'atom': 'cosmos',
  'vet': 'vechain',
  'ust': 'terra-usd',
  'icp': 'internet-computer',
  'ceth': 'compound-ether',
  'egld': 'elrond',
  'fil': 'filecoin',
  'trx': 'tron',
  'ftt': 'ftx-token',
  'steth': 'lido-staked-ether',
  'theta': 'theta-network',
  'hbar': 'hedera',
  'etc': 'ethereum-classic',
  'sand': 'the-sandbox',
  'mana': 'decentraland',
  'ftm': 'fantom',
  'cdai': 'compound-dai',
  'grt': 'the-graph',
  'xtz': 'tezos',
  'xmr': 'monero',
  'miota': 'iota',
  'xrd': 'radix',
  'hnt': 'helium',
  'ohm': 'olympus',
  'klay': 'klaytn',
  'mim': 'magic-internet-money',
  'leo': 'leo-token',
  'cake': 'pancakeswap',
  'enj': 'enjin-coin',
  'rune': 'thorchain',
  'one': 'harmony',
  'xec': 'ecash',
  'ar': 'arweave',
  'bsv': 'bitcoin-sv',
  'stx': 'stacks',
  'zec': 'zcash',
  'mkr': 'maker',
  'kda': 'kadena',
  'qnt': 'quant',
  'hbtc': 'huobi-btc',
  'chz': 'chiliz',
  'bat': 'basic-attention-token',
  'btt': 'bittorrent',
  'hot': 'holo',
  'kcs': 'kucoin-shares',
  'bcha': 'bitcoin-cash-abc',
  'tfuel': 'theta-fuel',
  'crv': 'curve-dao-token',
  'cel': 'celsius-network-token',
  'comp': 'compound',
  'ln': 'link',
  'time': 'wonderland',
  'msol': 'marinade-staked-sol',
  'exrd': 'e-radix',
  'omi': 'ecomi',
  'ht': 'huobi-token',
  'xem': 'nem',
  'iotx': 'iotex',
  'klima': 'klima-dao',
};

export {
  resolveCoinURL,
};
