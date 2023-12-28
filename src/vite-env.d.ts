/// <reference types="svelte" />
/// <reference types="vite/client" />

export declare global {
    namespace NodeJS {
        interface ProcessEnv {
            VITE_SIMPLE_SIGNER_URL: string;
            VITE_HORIZON_URL: string;
            VITE_DESTINATION_PUBLICKEY: string;
            VITE_MOCKED_ACCOUNT_1_PUBLIC_KEY: string;
            VITE_MOCKED_ACCOUNT_1_PRIVATE_KEY: string;
        }
    }
}
