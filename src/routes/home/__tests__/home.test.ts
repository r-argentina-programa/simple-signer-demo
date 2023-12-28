/**
 * @jest-environment node
 */
import { expect } from '@jest/globals';
import { createFundedAccounts, getBalance } from '../stellar/accountSetup';

it('Should get accounts funded', async () => {
    await createFundedAccounts();
    const balance = await getBalance(process.env.VITE_MOCKED_ACCOUNT_1_PUBLIC_KEY);

    expect(balance).toBe('10000.0000000');
});
