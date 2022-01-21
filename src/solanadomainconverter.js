const {
  getHashedName,
  getNameAccountKey,
  NameRegistryState,
} = require('@solana/spl-name-service');

const {
  Connection,
  clusterApiUrl,
  PublicKey,
} = require('@solana/web3.js');

class SolanaDomainConverter {
  constructor(domain, env) {
    this.domain = domain;
    if (!env) {
      this.env = 'mainnet-beta';
    } else {
      this.env = env;
    }
  }

  async toWalletAddress() {
    const { owner } = await NameRegistryState.retrieve(
      new Connection(clusterApiUrl(this.env)),
      await getNameAccountKey(
        await getHashedName(this.domain.replace('.sol', '')),
        null,
        SOL_TLD_AUTHORITY,
      )
    );
    return owner.toString();
  }
}

const SOL_TLD_AUTHORITY = new PublicKey(
  '58PwtjSDuFHuUkYjH9BYnnQKHfwo9reZhC2zMJv9JPkx',
);

export {
  SolanaDomainConverter,
};
