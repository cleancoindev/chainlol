
class QueryExecutor {

  constructor() {}

  handleQuery() {
    const query = getQueryParams_();

    const commandName = query[0]
    switch (commandName) {
      case "homepage":
      case "commands":
      case "help":
        break;

      case "p":
      case "price":
      case "coin": {
        let name = query[1]
        if (!name) {
          redirectTo_("https://www.coingecko.com")
          break
        }

        if (name.startsWith('$')) {
          name = name.substring(1);
        }
        const link = COIN_GECKO_SYMBOL_MAP[name.toLowerCase()];
        if (link) {
          name = link;
        }
        redirectTo_(`https://www.coingecko.com/en/coins/${name}`)
        break
      }

      case "swap":
      case "uniswap": {
        let input = '';
        if (query.length >= 2) {
          const qin = query[1];
          if (qin.startsWith('0x')) {
            input = qin;
          } else {
            input = UNI_SWAP_TOKEN_TO_CONTRACT[qin.toLowerCase()] ?? '';
          }
        }

        let output = '';
        if (query.length >= 3) {
          const out = query[2];
          if (out.startsWith('0x')) {
            output = out;
          } else {
            output = UNI_SWAP_TOKEN_TO_CONTRACT[out.toLowerCase()] ?? '';
          }
        }

        redirectTo_(`https://app.uniswap.org/#/swap?inputCurrency=${input}&outputCurrency=${output}`);
        break;
      }

      case "nft": {
        const q = query.slice(1).join(' ')
        if (!q) {
          redirectTo_('https://opensea.io/')
          break
        }
        redirectTo_(`https://opensea.io/assets?search[query]=${encodeURIComponent(q)}`)
        break
      }

      case "tx": {
        const hash = query[1]
        const env = query[2]
        if (hash.startsWith("0x")) {
          redirectTo_(etherscanURL_(`tx/${hash}`, env))
        } else {
          redirectTo_(solScanURL_(`tx/${hash}`, env))
        }
        break
      }

      case "a":
      case "address":
      case "contract":
      case "w":
      case "wallet": {
        const hash = query[1]
        const env = query[2]
        if (hash.startsWith("0x") || hash.includes(".eth")) {
          redirectTo_(etherscanURL_(`address/${hash}`, env))
        } else {
          redirectTo_(solScanURL_(`account/${hash}`, env))
        }
        break
      }

      case "dune": {
        let q = query.slice(1).join(' ')
        if (q === 'new') {
          redirectTo_('https://dune.xyz/queries')
          break;
        }
        if (q.startsWith('query ')) {
          q = query.slice(2).join(' ')
          redirectTo_(`https://dune.xyz/browse/queries?q=${encodeURIComponent(q)}`)
          break;
        }
        redirectTo_(`https://dune.xyz/browse/dashboards?q=${encodeURIComponent(q)}`)
        break;
      }

      case "ipfs": {
        const cid = query[1]
        if (!cid) {
          redirectTo_('https://app.pinata.cloud/')
          break
        }
        redirectTo_(`https://gateway.ipfs.io/ipfs/${cid}`)
        break
      }

      case "ipns": {
        const url = query[1]
        if (!url) {
          redirectTo_('https://app.pinata.cloud/')
          break
        }
        redirectTo_(`https://gateway.ipfs.io/ipns/${url}`)
        break
      }

      case "arweave":
      case "ar": {
        const cid = query[1]
        if (!cid) {
          redirectTo_('https://viewblock.io/arweave')
          break
        }
        redirectTo_(`https://arweave.net/${cid}`)
        break
      }

      case "gm":
      case "gmi":
      case "wagmi": {
        redirectTo_('./gm.html')
        break
      }

      case "ngmi": {
        const ngmis = [
          'https://meta.com/',
          'https://www.sec.gov/',
          'https://www.alphabet.com/',
        ]
        redirectTo_(ngmis[Math.floor(Math.random()*ngmis.length)])
        break
      }

      case "elon": {
        const elon = [
          '1392030108274159619',
          '1375033483148451842',
          '1387290679794089986',
          '1395027147161489412',
          '1454876031232380928',
          '1451015695106560000',
          '1426558939336937481'
        ]
        const id = elon[Math.floor(Math.random()*elon.length)];
        redirectTo_(`https://twitter.com/elonmusk/status/${id}`)
        break
      }

      default: {
        if (query.length === 1 && query[0].endsWith('.eth')) {
          redirectTo_(`https://etherscan.io/address/${commandName}`)
        } else {
          redirectTo_(`http://www.google.com/search?q=${encodeURIComponent(query.join(" "))}`)
        }
      }
    }
  }
}

function solScanURL_(path, env) {
  if (env === 'devnet' || env === 'testnet') {
    return `https://solscan.io/${path}?cluster=${env}`
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

function redirectTo_(url) {
  window.location = url;
}

function getQueryParams_() {
  // First, check if the command is in the query params
  const searchParams = new URLSearchParams(window.location.search);
  const searchQuery = searchParams.get("q");
  if (searchQuery) {
    return searchQuery.split(" ");
  }
  // Next, check if it's in the hash params
  const hashParams = new URLSearchParams((window.location.hash ?? '').split('?')[1]);
  const hashQuery = hashParams.get("q");
  if (hashQuery) {
    return hashQuery.split(" ");
  }
  // Otherwise, there is no command set
  return ["homepage"];
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

// From https://info.uniswap.org/pairs#/
const UNI_SWAP_TOKEN_TO_CONTRACT = {
  'eth': '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
  'usdc': '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
  'wbtc': '0x2260fac5e5542a773aa44fbcfedf7c193bc2c599',
  'dai': '0x6b175474e89094c44da98b954eedeac495271d0f',
  'usdt': '0xdac17f958d2ee523a2206206994597c13d831ec7',
  'frax': '0x853d955acef822db058eb8505911ed77f175b99e',
  'uni': '0x1f9840a85d5af5bf1d1762f925bdaddc4201f984',
  'seth2': '0xfe2e637202056d30016725477c5da089ab0a043a',
  'pax': '0x8e870d67f660d95d5be530380d0ec0bd388289e1',
  'fei': '0x956f47f50a910163d8bf957cf5846d573e7f87ca',
  '1inch': '0x111111111117dc0aa78b770fa6a738034120c302',
  'shib': '0x95ad61b0a150d79219dcf64e1e6cc01f0b64c4ce',
  'rai': '0x03ab458634910aad20ef5f1c8ee96f1d6ac54919',
  'rpl': '0xb4efd85c19999d84251304bda99e90b92300bd93',
  'rbn': '0x6123b0049f904d730db3c36a31167d9d4121fa6b',
  'link': '0x514910771af9ca656af840dff83e8264ecf986ca',
  'comp': '0xc00e94cb662c3520282e6f5717214004a7f26888',
  'ens': '0xc18360217d8f7ab5e7c516566761ea12ce7f9d72',
  'ftt': '0x50d1c9771902476076ecfc8b2a83ad6b9355a4c9',
  'ageur': '0x1a7e4e63778b4f12a199c062f3efdd288afcbce8',
  'inst': '0x6f40d4a6237c257fff2db00fa0510deeecd303eb',
  'ust': '0xa47c8bf37f92abed4a126bda807a7b7498661acd',
  'hex': '0x2b591e99afe9f32eaa6214f7b7629768c40eeb39',
  'ftm': '0x4e15361fd6b4bb609fa63c81a2be19d873717870',
  'xmt': '0x3e5d9d8a63cc8a88748f229999cf59487e90721e',
  'eurt': '0xc581b735a1688071a1746c968e0798d642ede491',
  'ads': '0xcfcecfe2bd2fed07a9145222e8a7ad9cf1ccd22a',
  'sand': '0x3845badade8e6dff049820680d1f14bd3903a5d0',
  'floor': '0xb35ed5c39f371f2cd4bc2edab1f8da314168186a',
  'amp': '0xff20817765cb7f73d4bde2e66e067e58d11095c2',
  'avinoc': '0xf1ca9cb74685755965c7458528a36934df52a3ef',
  'ncr': '0xdb5c3c46e28b53a39c255aa39a411dd64e5fed9c',
  'mkr': '0x9f8f72aa9304c8b593d555f12ef6589cc3a579a2',
  'wdoge': '0x35a532d376ffd9a705d0bb319532837337a398e7',
  'ygg': '0x25f8087ead173b73d6e8b84329989a8eea16cf73',
  'dpi': '0x1494ca1f11d487c2bbe4543e90080aeba4ba3c2b',
  'lcx': '0x037a54aab062628c9bbae1fdb1583c195585fe41',
  'axs': '0xbb0e17ef65f82ab018d8edd776e8dd940327b28b',
  'gala': '0x15d4c048f83bd7e37d49ea4c83a07267ec4203da',
  'rng': '0x3b94440c8c4f69d5c9f47bab9c5a93064df460f5',
  'matic': '0x7d1afa7b718fb893db30a3abc0cfc608aacfebb0',
  'hopr': '0xf5581dfefd8fb0e4aec526be659cfab1f8c781da',
  'renbtc': '0xeb4c2781e4eba804ce9a9803c67d0893436bb27d',
  'perp': '0xbc396689893d065f41bc2c6ecbee5e0085233447',
  'xaut': '0x68749665ff8d2d112fa859aa293f07a622782f38',
  'aave': '0x7fc66500c84a76ad7e9c93437bfc5ac33e2ddae9',
  'badger': '0x3472a5a71965499acd81997a54bba8d852c6e53d',
  'dydx': '0x92d6c1e31e14520e676a687f0a93788b716beff5',
  'people': '0x7a58c0be72be218b41c608b7fe7c5bb630736c71',
  'mana': '0x0f5d2fb29fb7d3cfee444a200298f468908cc942',
  'ohm': '0x383518188c0c6d7730d91b2c03a03c837814a899',
}

export {
  QueryExecutor,
}
