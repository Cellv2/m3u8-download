export const downloader = async (url: string): Promise<Buffer> => {
    try {
        const response = await fetch(url);

        if (!response.ok) {
            return Promise.reject(
                `Received ${response.statusText} when trying to fetch ${url}`
            );
        }

        const responseAsBuffer = Buffer.from(await response.arrayBuffer());

        return Promise.resolve(responseAsBuffer);
    } catch (error: unknown) {
        if (!(error instanceof Error)) {
            throw error;
        }

        return Promise.reject(error.message);
    }
};
