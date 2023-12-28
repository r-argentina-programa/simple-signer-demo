import { Networks, Server } from 'stellar-sdk';

enum StellarNetwork {
  TESTNET = 'testnet',
  PUBNET = 'pubnet',
  STANDALONE = 'standalone',
}

type StellarConfigNetwork = {
  url: string;
  networkPassphrase: Networks;
};

const pubnet = {
  url: 'https://horizon.stellar.org',
  networkPassphrase: Networks.PUBLIC,
};

const testnet = {
  url: 'https://horizon-testnet.stellar.org',
  networkPassphrase: Networks.TESTNET,
};

const standalone = {
  url: 'http://localhost:8000',
  networkPassphrase: 'Standalone Network ; February 2017',
};

export const stellarConfigNetworks = {
  [StellarNetwork.PUBNET]: pubnet,
  [StellarNetwork.TESTNET]: testnet,
  [StellarNetwork.STANDALONE]: standalone,
};

export class StellarConfig {
  public network: StellarConfigNetwork;
  public server: Server;

  constructor() {
    const STELLAR_NETWORK = process.env.VITE_HORIZON_URL;

    this.network = stellarConfigNetworks[STELLAR_NETWORK];
    this.server = new Server(this.network.url, {
      allowHttp: STELLAR_NETWORK === StellarNetwork.STANDALONE,
    });
  }
}