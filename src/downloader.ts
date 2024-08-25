export const downloader = async (url: string): Promise<Buffer> => {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(
                `Received ${response.status} ${response.statusText} when trying to fetch ${url}`
            );
        }

        const responseAsBuffer = Buffer.from(await response.arrayBuffer());

        return responseAsBuffer;
    } catch (error: unknown) {
        if (!(error instanceof Error)) {
            throw error;
        }

        throw new Error(error.message);
    }
};

// export const downloadFile = async (url: string): Promise<string> => {
export const downloadFile = async (url: string): Promise<any> => {

}
