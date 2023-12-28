<script lang="ts">
    import { Keypair, xdr } from 'stellar-sdk';
    import ToastNotification from '../../lib/ToastNotification.svelte';
    import { openConnectWindow, openSignWindow } from './helpers/homeHelper';
    import { xdrReceived, publicKey } from '../home/store/store';
    import { buildTransaction } from '../home/stellar/buildTransaction';

    let hideToastNotificaction = true;

    function handleToggleToastNotification() {
        hideToastNotificaction = !hideToastNotificaction;
    }

    function handleMessage(e: MessageEvent) {
        if (e.origin !== process.env.VITE_SIMPLE_SIGNER_URL) {
            return;
        }

        const messageEvent = e.data;

        if (messageEvent.type === 'onConnect') {
            const publicKeyEvent = messageEvent.message.publicKey;
            if (Keypair.fromPublicKey(publicKeyEvent)) {
                $publicKey = publicKeyEvent;
                console.log(messageEvent.message);
            }
        }
        if (messageEvent.type === 'onSign') {
            const signedXdr = messageEvent.message.signedXDR;
            if (xdr.TransactionEnvelope.validateXDR(signedXdr, 'base64')) {
                $xdrReceived = signedXdr;
                console.log(messageEvent.message);
            }
        }
    }

    window.addEventListener('message', handleMessage);

    async function signTransaction() {
        const xdrUnsigned = await buildTransaction($publicKey);
        openSignWindow(xdrUnsigned, 'Esto es un pago');
    }
</script>

<div
    class="simple-signer-demo main-container bg-gradient-to-r
    from-indigo-600
    to-blue-400"
>
    <div class="w-9/12 m-auto py-16 min-h-screen flex items-center justify-center">
        <button
            on:click="{() => openConnectWindow()}"
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
