<script lang="ts">
    import ToastNotification from '../../lib/ToastNotification.svelte';
    import { xdrReceived, publicKey } from '../home/store/store';
    import { buildTransaction } from '../home/stellar/buildTransaction';
    import { ISupportedWallet, StellarWalletsKit, WalletNetwork, WalletType } from 'stellar-wallets-kit';

    const kit = new StellarWalletsKit({
        network: WalletNetwork.TESTNET,
        selectedWallet: WalletType.ALBEDO,
    });

    function openWallets() {
        kit.openModal({
            allowedWallets: [WalletType.ALBEDO, WalletType.FREIGHTER, WalletType.RABET, WalletType.XBULL],
            modalTitle: 'r/ar tutorial',
            notAvailableText: 'No está instalada',
            modalDialogStyles: {
                backgroundImage: 'url(https://img.freepik.com/free-photo/planet-earth-background_23-2150564685.jpg)',
            },
            onWalletSelected: async (option: ISupportedWallet) => {
                kit.setWallet(option.type);
                $publicKey = await kit.getPublicKey();
                console.log($publicKey);
            },
        });
    }

    async function signTransaction() {
        const unsignedXDR = await buildTransaction($publicKey);

        const { signedXDR } = await kit.sign({
            xdr: unsignedXDR,
            publicKey: $publicKey,
        });

        $xdrReceived = signedXDR;
        console.log($xdrReceived);
    }

    let hideToastNotificaction = true;

    function handleToggleToastNotification() {
        hideToastNotificaction = !hideToastNotificaction;
    }
</script>

<div
    class="simple-signer-demo main-container bg-gradient-to-r
    from-indigo-600
    to-blue-400"
>
    <div class="w-9/12 m-auto py-16 min-h-screen flex items-center justify-center">
        <button
            on:click="{() => openWallets()}"
            type="button"
            class="simple-signer-demo connect-btn text-gray-900 bg-white hover:bg-gray-100 border border-gray-200 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-600 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700 mr-2 mb-2"
        >
            Connect
        </button>
        <button
            on:click="{() => signTransaction()}"
            type="button"
            class="simple-signer-demo sign-btn text-gray-900 bg-white hover:bg-gray-100 border border-gray-200 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-600 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700 mr-2 mb-2"
        >
            Sign
        </button>
    </div>
    {#if $xdrReceived != ''}
        <ToastNotification
            show="{hideToastNotificaction}"
            on:close="{() => handleToggleToastNotification()}"
            xdr="{$xdrReceived}"
        />
    {/if}
</div>
