<script lang="ts">
    import Clipboard from 'svelte-clipboard';
    import { createEventDispatcher } from 'svelte';

    export let xdr = '';
    export let show = true;
    const dispatch = createEventDispatcher();
</script>

{#if show}
    <div
        id="toast-success"
        class="simple-signer-demo toast absolute inset-x-0 bottom-0 h-26 flex justify-center items-center w-full max-w-md p-4 mb-4 text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800"
        role="alert"
    >
        <div class="w-8 h-5 text-green-500 bg-green-100 rounded-lg dark:bg-green-800 dark:text-green-200">
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"
                ><path
                    fill-rule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clip-rule="evenodd"></path></svg
            >
        </div>
        <div class="truncate text-area ml-3 text-sm font-normal">
            <p>Your <b>transaction</b> has been signed:</p>
            <p class="text-ellipsis overflow-hidden"><b>{xdr}</b></p>
        </div>
        <Clipboard text="{xdr}" let:copy>
            <button
                on:click="{copy}"
                type="button"
                class="text-white bg-gray-800 hover:bg-gray-900 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center ml-2 mb-1 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-800 dark:border-gray-700"
                >{copy ? 'Copy' : ''}</button
            >
        </Clipboard>
        <button
            class="simple-signer-demo close-button p-2 bg-gray-200 hover:bg-gray-300 rounded-full ml-4"
            on:click="{() => dispatch('close')}"
        >
            <svg xmlns="http://www.w3.org/2000/svg" height="15px" viewBox="0 0 24 24" width="14px" fill="#000000"
                ><path d="M0 0h24v24H0V0z" fill="none"></path><path
                    d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"
                ></path></svg
            >
        </button>
    </div>
{/if}

<style>
    .toast {
        animation: toast 0.5s forwards;
    }

    @keyframes toast {
        from {
            opacity: 0;
            transform: translateY(100%);
        }
        to {
            opacity: 1;
            transform: translateY(-10%);
        }
    }
</style>
