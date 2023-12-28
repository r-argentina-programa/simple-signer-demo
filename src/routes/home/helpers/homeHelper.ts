const simpleSignerUrl = process.env.VITE_SIMPLE_SIGNER_URL;

export function openConnectWindow() {
    window.open(`${simpleSignerUrl}/connect`, 'Connect_Window', 'width=360, height=450');
}

export function openSignWindow(xdr: string, description?: string) {
    window.open(
        `${simpleSignerUrl}/sign?xdr=${xdr}&description=${description}`,
        'Sign_Window',
        'width=360, height=700',
    );
}
