import { Server, BASE_FEE, Networks, Asset, Operation, Memo, TransactionBuilder } from 'stellar-sdk';
import TransactionBuilderError from '../errors/TransactionBuilderError';

const server = new Server(process.env.VITE_HORIZON_URL);

export async function buildTransaction(publicKey: string): Promise<string> {
    try {
        const sourceAccount = publicKey;
        const accountResponse = await server.loadAccount(sourceAccount);

        return new TransactionBuilder(accountResponse, {
            fee: BASE_FEE,
            networkPassphrase: Networks.TESTNET,
        })
            .addOperation(
                Operation.payment({
                    destination: process.env.VITE_DESTINATION_PUBLICKEY,
                    amount: '200',
                    asset: Asset.native(),
                }),
            )
            .addMemo(Memo.text('Tx test'))
            .setTimeout(0)
            .build()
            .toXDR();
    } catch (error) {
        throw new TransactionBuilderError();
    }
}
