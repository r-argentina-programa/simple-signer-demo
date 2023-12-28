import { Horizon, Keypair, Server } from 'stellar-sdk';

const server = new Server('http://localhost:8000', { allowHttp: true });

export async function createFundedAccount() {
    try {
        console.log('Creating Account 1...');

        const keypair1 = Keypair.random();

        await server.friendbot(keypair1.publicKey()).call();

        console.log('Funding Account 1...');

        process.env.VITE_MOCKED_ACCOUNT_1_PUBLIC_KEY = keypair1.publicKey();
        process.env.VITE_MOCKED_ACCOUNT_1_PRIVATE_KEY = keypair1.secret();

        console.log(
            `Account 1: PUBKEY: ${process.env.VITE_MOCKED_ACCOUNT_1_PUBLIC_KEY} SECRET: ${process.env.VITE_MOCKED_ACCOUNT_1_PRIVATE_KEY}`,
        );

        console.log('Account succesfully created and funded with 10000.0000000 XLM');
    } catch (error) {
        console.error('Error funding accounts with Friendbot:', error);
    }
}

export async function getBalance(publicKey: string): Promise<string | undefined> {
    let accountBalance;
    try {
        const { balances } = await server.loadAccount(publicKey);

        accountBalance = balances.find((balance: Horizon.BalanceLine) => balance.asset_type === 'native')?.balance;
    } catch (error) {
        console.error('Account balance not found:', error);
    }
    return accountBalance;
}
